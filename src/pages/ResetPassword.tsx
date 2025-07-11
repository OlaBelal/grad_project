import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/authService";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  // Check link validity on page load
  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    console.log("Email from URL:", email);
    console.log("Token from URL:", token);

    if (!email || !token) {
      setMessage({
        text: "Invalid reset link. Please request a new one",
        type: "error"
      });
    }
  }, [searchParams]);

  // Password reset handler
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = searchParams.get("email");
    const token = searchParams.get("token");

    // Validate required information
    if (!email || !token) {
      setMessage({
        text: "Reset information is incomplete (email and token required)",
        type: "error"
      });
      return;
    }

    // Check password match
    if (newPassword !== confirmPassword) {
      setMessage({
        text: "Passwords do not match",
        type: "error"
      });
      return;
    }

    // Validate password strength
    if (!authService.validatePassword(newPassword)) {
      setMessage({
        text: "Password must be at least 8 characters with letters, numbers, and special characters",
        type: "error"
      });
      return;
    }

    try {
      // Send reset request to server
      const response = await axios.post(
        "https://journeymate.runasp.net/api/Auth/resetpassword",
        {
          email: email,
          token: token,
          newPassword: newPassword
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // On success
      if (response.status === 200) {
        setMessage({
          text: "Password reset successfully! You can now login",
          type: "success"
        });
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error: any) {
      // Error handling
      setMessage({
        text: error.response?.data?.message || "Error resetting password",
        type: "error"
      });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Half: Image */}
      <div className="hidden md:flex flex-1 justify-center items-center bg-white">
        <img
          src="https://clipart-library.com/2024/vacation-background-cliparts/vacation-background-cliparts-9.jpg"
          alt="Travel"
          className="max-w-full max-h-full object-cover"
        />
      </div>

      {/* Right Half: Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-4">
        <div className="w-full max-w-md">
          <h1 className="text-center mb-2 font-yesteryear text-5xl text-[#DF6951]">
            Reset Password
          </h1>
          <p className="text-center mb-5 text-gray-600 text-lg font-volkhov">
            Create a new secure password
          </p>

          {message.text && (
            <div className={`mb-4 p-3 rounded text-sm ${
              message.type === "error" 
                ? "bg-red-100 text-red-700" 
                : "bg-green-100 text-green-700"
            }`}>
              {message.text}
            </div>
          )}

          <form className="w-full" onSubmit={handleReset}>
            {/* New Password Field */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters with letters, numbers, and special characters
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#DF6951] text-white rounded-lg shadow-md hover:bg-[#C6533E] transition-colors text-lg font-medium"
            >
              Reset Password
            </button>

            {/* Back to Login Link */}
            <p className="text-center mt-6 text-gray-600 text-sm">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[#DF6951] hover:text-[#C6533E] font-bold"
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}