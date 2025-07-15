import  { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/authService";

const PaymentPage = () => {
  const location = useLocation();
  const paymentState = location.state;
  const { bookingId, amount, currency, paymentMethod } = paymentState || {};

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initiatePayment = async () => {
      if (
        bookingId == null ||
        amount == null ||
        currency == null ||
        paymentMethod == null
      ) {
        console.error("Missing payment state:", paymentState);
        setError("Missing payment information.");
        return;
      }

      const token = authService.getToken();
      if (!token) {
        setError("Authentication required.");
        return;
      }

      try {
        setLoading(true);
        const payload = {
          bookingId: Number(bookingId),
          paymentMethod,
          amount: Number(amount),
          currency,
        };

        console.log("Sending payment payload:", payload);

        const response = await axios.post(
          "https://journeymate.runasp.net/api/Payment/initiate",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        } else {
          throw new Error("No payment URL returned.");
        }
      } catch (err: any) {
        console.error("Payment error:", err.response?.data || err);
        setError(
          "Payment failed: " +
            (err.response?.data?.message || err.message || "Unexpected error")
        );
      } finally {
        setLoading(false);
      }
    };

    initiatePayment();
  }, [bookingId, amount, currency, paymentMethod, paymentState]);

  return (
    <div className="p-6 text-center">
      {loading ? (
        <p>Redirecting to payment...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : null}
    </div>
  );
};

export default PaymentPage;