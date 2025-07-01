import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import travelImage2 from "../assets/images/loginbag.jpg";
import { authService } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError(null);

    try {
      const result = await authService.login(formData.email, formData.password);
      if (result.token) {
        localStorage.setItem("token", result.token); // ✅ Save token for later use
        navigate("/dashboard"); // Redirect to your main page
      } else {
        throw new Error("Token not received");
      }
    } catch (error: any) {
      setApiError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (response: any) => {
    try {
      if (!response.credential) throw new Error("No credential received");
      await authService.googleLogin(response.credential);
      navigate("/dashboard");
    } catch (error: any) {
      setApiError(error.message || "Google login failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex flex-1 justify-center items-center bg-white">
        <img
          src={travelImage2}
          alt="Travel"
          className="max-w-full max-h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center bg-white p-4">
        <div className="w-full max-w-md">
          <h1 className="text-center mb-2 text-4xl font-bold text-[#DF6951]">
            Log In
          </h1>

          {apiError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-[#DF6951] text-white rounded hover:bg-[#C6533E]"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="my-4 text-center text-gray-500">or</div>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setApiError("Google login failed")}
          />

          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[#DF6951] font-semibold hover:underline"
            >
              Sign up!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
