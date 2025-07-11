import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/authService";

const NewBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const travelIdFromState = location.state?.travelId;
  const searchParams = new URLSearchParams(location.search);
  const travelIdFromQuery = parseInt(searchParams.get("travelId") || "0");
  const resolvedTravelId = travelIdFromState || travelIdFromQuery || 0;

  const [formData, setFormData] = useState({
    travelId: resolvedTravelId,
    name: "",
    phone: "",
    nationalId: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfChildrenUnderFive: 0,
  });

  const [pricePerAdult, setPricePerAdult] = useState(0);
  const [pricePerChild, setPricePerChild] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!resolvedTravelId || resolvedTravelId === 0) {
      setError("Missing travel ID. Please try again.");
      return;
    }
    const fetchTravelData = async () => {
      try {
        const response = await axios.get(
          `https://journeymate.runasp.net/api/Travels/${resolvedTravelId}`
        );
        const travel = response.data;
        const basePrice = travel.price || 0;
        setPricePerAdult(basePrice);
        setPricePerChild(Math.floor(basePrice * 0.5));
        setFormData((prev) => ({ ...prev, travelId: travel.id }));
      } catch (err) {
        console.error("Failed to fetch travel data:", err);
        setError("");
      }
    };
    fetchTravelData();
  }, [resolvedTravelId]);

  useEffect(() => {
    const total =
      formData.numberOfAdults * pricePerAdult +
      formData.numberOfChildren * pricePerChild +
      formData.numberOfChildrenUnderFive * Math.floor(pricePerChild * 0.5);
    setTotalAmount(total);
  }, [
    formData.numberOfAdults,
    formData.numberOfChildren,
    formData.numberOfChildrenUnderFive,
    pricePerAdult,
    pricePerChild,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("number") ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const token = authService.getToken();
    if (!token) {
      setError("You must be logged in to book.");
      return;
    }

    const bookingPayload = {
      travelId: formData.travelId,
      totalquantity: formData.numberOfAdults + formData.numberOfChildren,
      childrenUnderFiveNum: formData.numberOfChildrenUnderFive,
      nationalId: formData.nationalId,
      phoneNumber: formData.phone,
    };

    try {
      setLoading(true);
      const bookingResponse = await axios.post(
        "https://journeymate.runasp.net/api/Booking",
        bookingPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (bookingResponse.status === 200 || bookingResponse.status === 201) {
        navigate("/payment", {
          state: {
            bookingId: bookingResponse.data.id,
            amount: totalAmount,
            currency: "EGP",
            paymentMethod: "card",
          },
        });
      } else {
        throw new Error("Booking failed.");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setError("Booking failed: " + (err.message || "Unexpected error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Book Your Trip</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="nationalId"
          >
            National ID
          </label>
          <input
            type="text"
            name="nationalId"
            id="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="numberOfAdults"
          >
            Number of Adults
          </label>
          <input
            type="number"
            name="numberOfAdults"
            id="numberOfAdults"
            value={formData.numberOfAdults}
            onChange={handleChange}
            min={1}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="numberOfChildren"
          >
            Number of Children
          </label>
          <input
            type="number"
            name="numberOfChildren"
            id="numberOfChildren"
            value={formData.numberOfChildren}
            onChange={handleChange}
            min={0}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="numberOfChildrenUnderFive"
          >
            Children Under 5
          </label>
          <input
            type="number"
            name="numberOfChildrenUnderFive"
            id="numberOfChildrenUnderFive"
            value={formData.numberOfChildrenUnderFive}
            onChange={handleChange}
            min={0}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default NewBookingPage;
