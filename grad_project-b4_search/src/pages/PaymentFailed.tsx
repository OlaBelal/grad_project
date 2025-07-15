import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state?.error || "Payment could not be completed.";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // redirect to home or retry page
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-gray-700 mb-4">{error}</p>
        <p className="text-sm text-gray-500">Redirecting you shortly...</p>
      </div>
    </div>
  );
};

export default PaymentFailed;