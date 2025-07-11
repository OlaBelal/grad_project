import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.title) {
      navigate("/");
    }
  }, [navigate, state]);

  if (!state) return <div>Loading...</div>;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <motion.div variants={itemVariants} className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
          >
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="mt-3 text-lg font-medium"
          >
            Payment Successful!
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="mt-1 text-sm text-gray-500"
          >
            Thank you for booking {state.title}
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-50 p-4 rounded-md mb-6"
        >
          <h3 className="font-medium mb-2">Booking Details</h3>
          <div className="space-y-1 text-sm">
            <p>Tour: {state.title}</p>
            <p>Amount: ${state.price}</p>
            <p>Order ID: {state.orderId}</p>
          </div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Return to Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PaymentSuccess;