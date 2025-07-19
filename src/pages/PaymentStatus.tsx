import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingId =
    location.state?.bookingId ||
    new URLSearchParams(window.location.search).get("bookingId");

  const [status, setStatus] = useState<"checking" | "success" | "failed">(
    "checking"
  );

  useEffect(() => {
    if (!bookingId) {
      navigate("/payment-failed", {
        state: { error: "Booking ID missing", redirectUrl: "/" },
      });
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          `https://journeymate.runasp.net/api/Booking/${bookingId}`
        );
        const data = await response.json();

        if (data.status === "paid") {
          clearInterval(intervalId);
          setStatus("success");
          setTimeout(() => {
            navigate("/payment-success", { state: { bookingId } });
          }, 1500);
        }
      } catch (err) {
        console.error("Polling error:", err);
        setStatus("failed");
        clearInterval(intervalId);
        navigate("/payment-failed", {
          state: { error: "Something went wrong", redirectUrl: "/" },
        });
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(intervalId);
  }, [bookingId, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      {status === "checking" && (
        <>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-xl font-semibold">Verifying your payment...</p>
        </>
      )}
      {status === "success" && (
        <p className="text-green-600 text-xl font-semibold">
          Payment confirmed! Redirecting...
        </p>
      )}
      {status === "failed" && (
        <p className="text-red-600 text-xl font-semibold">
          Payment failed. Please try again.
        </p>
      )}
    </div>
  );
};

export default PaymentStatus;