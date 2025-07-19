import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

interface UserData {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

const Account = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    phone: ''
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [resetStatus, setResetStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const currentUser = authService.getCurrentUser();
        
        if (!currentUser) {
          navigate('/login');
          return;
        }

        const userFromStorage = localStorage.getItem('currentUser');
        if (userFromStorage) {
          const user = JSON.parse(userFromStorage);
          setUserData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            avatar: user.avatar || ''
          });
          setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || ''
          });
          if (user.avatar) {
            setAvatarPreview(user.avatar);
          }
        }
      } catch (err: any) {
        setError(err.message || t('account.errors.loadFailed'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.match('image.*')) {
        setError(t('account.errors.invalidImageType'));
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        setError(t('account.errors.imageTooLarge'));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          avatar: avatarPreview || currentUser.avatar
        };
        
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setUserData(updatedUser);
        setEditMode(false);
      }
    } catch (err: any) {
      setError(err.message || t('account.errors.updateFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (err: any) {
      setError(err.message || t('account.errors.logoutFailed'));
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!currentPassword) {
        throw new Error(t('account.errors.currentPasswordRequired'));
      }

      await authService.forgotPassword(userData?.email || '');
      setResetStatus(t('Reset Password'));
      
      setTimeout(() => {
        setShowResetPassword(false);
        setResetStatus(null);
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || t('account.errors.resetFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DF6951]"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{t('account.errors.noUserData')}</p>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen p-4 md:p-8 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
      style={{
        backgroundImage: "url('https://www.allianzcare.com/en/personal-international-health-insurance/products-and-services/specialised-international-plans/plans-for-egypt/_jcr_content/root/parsys/stage_copy_copy_copy/stageimage.img.82.3360.jpeg/1728609283982/hero-landing-egypt-individual-2024.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden backdrop-blur-sm">
        <div className="bg-[#DF6951] p-6 text-white">
          <h1 className="text-2xl font-bold">{t('profile')}</h1>
        </div>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded mx-4 mt-4">
            {error}
          </div>
        )}

        {resetStatus && (
          <div className="p-4 bg-green-100 text-green-700 rounded mx-4 mt-4">
            {resetStatus}
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="flex flex-col items-center mb-8">
            <div 
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4 cursor-pointer relative group"
              onClick={editMode ? triggerFileInput : undefined}
            >
              {avatarPreview || userData.avatar ? (
                <img 
                  src={avatarPreview || userData.avatar} 
                  alt={t('account.avatarAlt')}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl text-gray-500">
                  {userData.name.charAt(0).toUpperCase()}
                </span>
              )}
              
              {editMode && (
                <>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                </>
              )}
            </div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-gray-600">{userData.email}</p>
            
            {editMode && (
              <button
                type="button"
                onClick={triggerFileInput}
                className="mt-2 text-sm text-[#DF6951] hover:underline"
              >
                {t('Change Photo')}
              </button>
            )}
          </div>

          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    {t('Name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    {t('Email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    {t('Phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setAvatarPreview(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {t('Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#DF6951] text-white rounded-lg hover:bg-[#C6533E] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? t('account.saving') : t('Save')}
                </button>
              </div>
            </form>
          ) : showResetPassword ? (
            <div className="mt-8 p-6 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{t('Reset Password')}</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  {t('Current Password')}
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                  placeholder={t(' Input your  Current Password')}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowResetPassword(false);
                    setCurrentPassword('');
                    setResetStatus(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {t('Cancel')}
                </button>
                <button
                  onClick={handleResetPassword}
                  className="px-4 py-2 bg-[#DF6951] text-white rounded-lg hover:bg-[#C6533E] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? t('account.sending') : t('Send Reset Link')}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-gray-500 text-sm">{t('Name')}</h3>
                  <p className="text-lg">{userData.name}</p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm">{t('Email')}</h3>
                  <p className="text-lg">{userData.email}</p>
                </div>

                <div>
                  <h3 className="text-gray-500 text-sm">{t('phone')}</h3>
                  <p className="text-lg">{userData.phone || t('Phone Not Set')}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowResetPassword(true)}
                  className="px-4 py-2 text-[#DF6951] hover:text-[#C6533E] underline"
                >
                  {t('ResetPassword')}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {t('Logout')}
                </button>
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-[#DF6951] text-white rounded-lg hover:bg-[#C6533E] transition-colors"
                >
                  {t('Edit')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;