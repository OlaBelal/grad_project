import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Shake animation for error state
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5
      }
    },
    initial: { x: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <motion.div
          variants={shakeVariants}
          animate="shake"
          className="text-center mb-6"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: 1, duration: 0.5 }}
            className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
          >
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.div>
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg font-medium"
          >
            Payment Failed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-1 text-sm text-gray-500"
          >
            {state?.error || "We couldn't process your payment"}
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {state?.retryData && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/payment", { state: state.retryData })}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Try Again
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(state?.redirectUrl || "/")}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            {state?.redirectUrl === "/payment" ? "Back" : "Back to Home"}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentFailed;