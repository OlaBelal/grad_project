import { useEffect, useState } from "react";
import axios from "axios";
import { authService } from "../services/authService";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

type BookingItem = {
  travelId: number;
  title: string;
  travelProfileUrl: string;
  price: number;
  quantity: number;
};

type Booking = {
  id: number;
  buyerEmail: string;
  bookingDate: string;
  status: string; // "success" or other
  bookingItem: BookingItem;
  totalCost: number;
  paymentIntentId: string;
};

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = authService.getToken();
      if (!token) {
        setError("You must be logged in to view bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://journeymate.runasp.net/api/Booking",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(response.data || []);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading your bookings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">No bookings yet</h2>
        <p className="text-gray-600 mt-2">Start your journey today!</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image */}
            <img
              src={
                booking.bookingItem.travelProfileUrl.startsWith("http")
                  ? booking.bookingItem.travelProfileUrl
                  : `https://journeymate.runasp.net/${booking.bookingItem.travelProfileUrl}`
              }
              alt={booking.bookingItem.title}
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://journeymate.runasp.net/default-tour.jpg")
              }
              className="w-full md:w-48 h-48 object-cover"
            />

            {/* Info */}
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {booking.bookingItem.title}
              </h3>
              <p className="text-gray-600 mt-1">
                Quantity: {booking.bookingItem.quantity}
              </p>
              <p className="text-gray-600">
                Price: EGP {booking.bookingItem.price.toLocaleString()}
              </p>
              <p className="text-gray-600">
                Total: <strong>EGP {booking.totalCost.toLocaleString()}</strong>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Booked on:{" "}
                {format(new Date(booking.bookingDate), "dd MMM yyyy - hh:mm a")}
              </p>

              <div className="mt-3">
                {booking.status === "success" ? (
                  <span className="inline-block px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                    Paid
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
                    Pending Payment
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookingsPage;
