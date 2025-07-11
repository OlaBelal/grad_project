import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type {
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
  CreateOrderData
} from "@paypal/paypal-js";

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { title, price, tourLocation, bookingDate } = location.state || {};

  // PayPal client ID - replace with your actual ID
  const paypalClientId = "AYJ...YOUR_CLIENT_ID...DxQ";

  useEffect(() => {
    console.log("Payment Page Location State:", location.state);
    if (!title || !price || !tourLocation) {
      navigate("/payment-failed", {
        state: { 
          error: "Missing booking information",
          redirectUrl: "/"
        }
      });
    }
  }, [title, price, tourLocation, navigate, location.state]);

  const createOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: `Tour Booking: ${title}`,
          amount: {
            value: price.toString(),
            currency_code: "USD",
            breakdown: {
              item_total: {
                value: price.toString(),
                currency_code: "USD"
              }
            }
          },
          items: [
            {
              name: title,
              description: `Tour to ${tourLocation}`,
              quantity: "1",
              unit_amount: {
                value: price.toString(),
                currency_code: "USD"
              }
            }
          ]
        }
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING"
      }
    });
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    try {
      setLoading(true);
      setError(null);
      
      const details = await actions.order?.capture();
      console.log("Payment Details:", details);

      // Simulate backend verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPaid(true);
      setTimeout(() => navigate("/payment-success", {
        state: { 
          title, 
          price, 
          tourLocation,
          bookingDate,
          orderId: data.orderID,
          paymentMethod: "PayPal"
        }
      }), 1500);
    } catch (error) {
      console.error("Payment Error:", error);
      setError("Payment processing failed");
      setTimeout(() => navigate("/payment-failed", {
        state: { 
          error: "Payment processing failed",
          redirectUrl: "/payment",
          retryData: { title, price, tourLocation, bookingDate }
        }
      }), 2000);
    } finally {
      setLoading(false);
    }
  };

  const onError = (err: Record<string, unknown>) => {
    console.error("PayPal Error:", err);
    setError("Payment service error");
    navigate("/payment-failed", {
      state: { 
        error: "Payment service error",
        redirectUrl: "/payment",
        retryData: { title, price, tourLocation, bookingDate }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Complete Payment</h1>
            <p className="mt-2 text-gray-600">Booking: {title}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tour:</span>
                <span className="font-medium">{title}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-medium">{tourLocation}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium">
                  {bookingDate ? new Date(bookingDate).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="border-t my-3"></div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${price}</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Processing payment...</p>
            </div>
          ) : paid ? (
            <div className="text-center py-8 text-green-600">
              <p>Payment successful! Redirecting...</p>
            </div>
          ) : (
            <div>
              <PayPalScriptProvider 
                options={{ 
                  clientId: paypalClientId,
                  currency: "USD"
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
              </PayPalScriptProvider>
              <button
                onClick={() => navigate(-1)}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;