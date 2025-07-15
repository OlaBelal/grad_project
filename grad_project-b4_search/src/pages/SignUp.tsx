import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';
import travelImage from "../assets/images/image 1.png";
import { authService } from "../services/authService";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface GoogleCredentialResponse {
  credential?: string;
  clientId?: string;
  select_by?: string;
}

const SignUp = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginRedirect = () => {
    navigate("/login");
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
        [name]: undefined
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    // Name validation - allows letters, spaces, apostrophes, hyphens, and Arabic characters
    if (!formData.name.trim()) {
      newErrors.name = t('signUp.errors.nameRequired');
    } else if (!/^[\p{L}\s'-]+$/u.test(formData.name.trim())) {
      newErrors.name = t('signUp.errors.invalidName');
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('signUp.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('signUp.errors.invalidEmail');
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = t('signUp.errors.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('signUp.errors.passwordTooShort');
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('signUp.errors.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('signUp.errors.passwordsNotMatch');
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
        const response = await authService.register({
          userName: formData.name.replace(/\s+/g, ''), 
          email: formData.email.trim(),
          password: formData.password
        });
        
        // Store user data with fallback values
        const user = {
          id: response.id || '',
          name: response.name || formData.name.replace(/\s+/g, ''),
          email: response.email || formData.email.trim(),
          phone: '',
          token: response.token || ''
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Redirect after successful registration
        const redirectPath = location.state?.from?.pathname || "/account";
        navigate(redirectPath, { replace: true });
      } catch (error: any) {
        setApiError(error.message || t('signUp.errors.registrationFailed'));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignUp = async (credentialResponse: GoogleCredentialResponse) => {
    try {
      setIsLoading(true);
      
      if (!credentialResponse.credential) {
        throw new Error(t('signUp.errors.noGoogleCredential'));
      }
      
      console.log('Google credential received:', credentialResponse.credential);
      
      const user = await authService.googleLogin(credentialResponse.credential);
      console.log('User data from Google login:', user);
      
      // Store Google user data with fallback values
      const completeUser = {
        id: user.id || '',
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        token: user.token || '',
        avatar: user.avatar || ''
      };
      
      localStorage.setItem('currentUser', JSON.stringify(completeUser));
      localStorage.setItem('token', completeUser.token);
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect after successful Google signup
      const redirectPath = location.state?.from?.pathname || "/account";
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      console.error('Google signup error:', error);
      setApiError(error.message || t('signUp.errors.googleSignUpFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Left Half: Image */}
      <div className="hidden md:flex flex-1 justify-center items-center bg-white">
        <img
          src={travelImage}
          alt={t('signUp.travelImageAlt')}
          className="max-w-full max-h-full object-cover"
        />
      </div>

      {/* Right Half: Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-4">
        <div className="w-full max-w-md">
          <h1 className="text-center mb-2 font-yesteryear text-5xl text-[#DF6951]">
            {t('signUp.title')}
          </h1>
          <p className="text-center mb-5 text-gray-600 text-lg font-volkhov">
            {t('signUp.subtitle')}
          </p>
          
          {apiError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {apiError}
            </div>
          )}
          
          <form className="w-full" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-gray-700">
                {t('signUp.nameLabel')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#DF6951]'
                }`}
                disabled={isLoading}
                placeholder={t('signUp.namePlaceholder')}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-700">
                {t('signUp.emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#DF6951]'
                }`}
                disabled={isLoading}
                placeholder={t('signUp.emailPlaceholder')}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-gray-700">
                {t('signUp.passwordLabel')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#DF6951]'
                }`}
                disabled={isLoading}
                placeholder={t('signUp.passwordPlaceholder')}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block mb-2 text-gray-700">
                {t('signUp.confirmPasswordLabel')}
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#DF6951]'
                }`}
                disabled={isLoading}
                placeholder={t('signUp.confirmPasswordPlaceholder')}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className={`w-full py-3 bg-[#DF6951] text-white rounded-lg shadow-md hover:bg-[#C6533E] transition-colors text-lg font-medium mb-4 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? t('signUp.creatingAccount') : t('signUp.signUpButton')}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">{t('signUp.orDivider')}</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Sign Up Button */}
            <div className="mb-6">
              <GoogleOAuthProvider clientId="822773664134-n09666thqoc67ee4rhkfjetb51ep0vg5.apps.googleusercontent.com">
                <div className={`${isLoading ? 'opacity-70 pointer-events-none' : ''}`}>
                  <GoogleLogin
                    onSuccess={handleGoogleSignUp}
                    onError={() => {
                      console.error('Google login failed');
                      setApiError(t('signUp.errors.googleSignUpFailed'));
                    }}
                    width="100%"
                    size="large"
                    text="signup_with"
                    shape="rectangular"
                    theme="filled_blue"
                    logo_alignment="left"
                  />
                </div>
              </GoogleOAuthProvider>
            </div>

            {/* Login Redirect */}
            <p className="text-center text-gray-600 text-sm">
              {t('signUp.alreadyHaveAccount')}{" "}
              <button
                type="button"
                onClick={handleLoginRedirect}
                className="text-[#DF6951] hover:text-[#C6533E] font-bold"
                disabled={isLoading}
              >
                {t('signUp.loginLink')}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;