import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from 'react-i18next';
import travelImage2 from "../assets/images/loginbag.jpg";
import { authService } from "../services/authService";

interface Errors {
  email?: string;
  password?: string;
}

interface GoogleCredentialResponse {
  credential?: string;
  clientId?: string;
  select_by?: string;
}

const LogIn = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpRedirect = () => {
    navigate("/signup", { state: { fromBeforeSignUp: location.pathname } });
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: t('login.errors.emailRequiredForReset') });
      return;
    }

    try {
      setIsLoading(true);
      await authService.forgotPassword(formData.email);
      alert(t('login.resetPasswordSent', { email: formData.email }));
    } catch (error: any) {
      setApiError(error.message || t('login.errors.resetFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name as keyof Errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email.trim()) {
      newErrors.email = t('login.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('login.errors.invalidEmail');
    }

    if (!formData.password) {
      newErrors.password = t('login.errors.passwordRequired');
    } else if (!authService.validatePassword(formData.password)) {
      newErrors.password = t('login.errors.passwordRequirements');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (validateForm()) {
      try {
        setIsLoading(true);
        const user = await authService.login(formData.email, formData.password);

        // Store complete user data in localStorage
        const completeUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          token: user.token
        };
        localStorage.setItem('currentUser', JSON.stringify(completeUser));

        const from = location.state?.from?.pathname || "/account";
        navigate(from, { replace: true });
      } catch (error: any) {
        setApiError(
          error.message || t('login.errors.loginFailed')
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = async (credentialResponse: GoogleCredentialResponse) => {
    try {
      setIsLoading(true);

      if (!credentialResponse.credential) {
        throw new Error(t('login.errors.noGoogleCredential'));
      }

      const user = await authService.googleLogin(credentialResponse.credential);

      // Store complete user data in localStorage
      const completeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: '',
        token: user.token,
        avatar: user.avatar
      };
      localStorage.setItem('currentUser', JSON.stringify(completeUser));

      const redirectPath = location.state?.from?.pathname || "/account";
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      setApiError(error.message || t('login.errors.googleLoginFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Left Half: Image */}
      <div className="hidden md:flex flex-1 justify-center items-center bg-white">
        <img
          src={travelImage2}
          alt={t('login.travelImageAlt')}
          className="max-w-full max-h-full object-cover"
        />
      </div>

      {/* Right Half: Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-4">
        <div className="w-full max-w-md">
          <h1 className="text-center mb-2 font-yesteryear text-5xl text-[#DF6951]">
            {t('login.title')}
          </h1>
          <p className="text-center mb-5 text-gray-600 text-lg font-volkhov">
            {t('login.subtitle')}
          </p>

          {apiError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {apiError}
            </div>
          )}

          <form className="w-full" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-700">
                {t('login.emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#DF6951]"
                }`}
                disabled={isLoading}
                placeholder={t('login.emailPlaceholder')}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-gray-700">
                {t('login.passwordLabel')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#DF6951]"
                }`}
                disabled={isLoading}
                placeholder={t('login.passwordPlaceholder')}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <button
                type="button"
                onClick={handleForgotPassword}
                className={`mt-2 text-[#DF6951] hover:text-[#C6533E] text-sm font-medium ${
                  i18n.language === 'ar' ? 'text-left' : 'text-right'
                }`}
                disabled={isLoading}
              >
                {t('login.forgotPassword')}
              </button>
            </div>

            {/* Log In Button */}
            <button
              type="submit"
              className={`w-full py-3 bg-[#DF6951] text-white rounded-lg shadow-md hover:bg-[#C6533E] transition-colors text-lg font-medium mb-4 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? t('login.loggingIn') : t('login.loginButton')}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">{t('login.orDivider')}</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Login Button */}
            <div className="mb-6">
              <div
                className={`${
                  isLoading ? "opacity-70 pointer-events-none" : ""
                }`}
              >
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    setApiError(t('login.errors.googleLoginFailed'));
                  }}
                  width="100%"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  theme="filled_blue"
                  logo_alignment="left"
                />
              </div>
            </div>

            {/* Sign Up Redirect */}
            <p className="text-center text-gray-600 text-sm">
              {t('login.noAccount')}{" "}
              <button
                type="button"
                onClick={handleSignUpRedirect}
                className="text-[#DF6951] hover:text-[#C6533E] font-bold"
                disabled={isLoading}
              >
                {t('login.signUpLink')}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;