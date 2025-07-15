import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import getInTouchImage from '../assets/images/getintouch1.png';
import termsImage from '../assets/images/273 1.png';
import { submitTourismCompanyRequest, TourismCompanyRequest } from '../services/travelService';

const GetInTouch = () => {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<TourismCompanyRequest, 'Status' | 'CreatedAt'> & { acceptTerms: boolean }>({
    CompanyName: '',
    Owner: '',
    Email: '',
    CommercialRegistrationNumber: '',
    PhoneNumber: '',
    WebsiteUrl: '',
    CompanyAddress: '',
    Description: '',
    ContactPersonName: '',
    ContactPersonNumber: '',
    TypeofTrips: '',
    LicenseImageUrl: '',
    LogoUrl: '',
    CoverImageUrl: '',
    acceptTerms: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.acceptTerms) {
      alert(t('getInTouch.termsError'));
      setIsSubmitting(false);
      return;
    }

    try {
      await submitTourismCompanyRequest(formData);
      alert(t('Form submitted successfully'));
      
      // Reset form
      setFormData({
        CompanyName: '',
        Owner: '',
        Email: '',
        CommercialRegistrationNumber: '',
        PhoneNumber: '',
        WebsiteUrl: '',
        CompanyAddress: '',
        Description: '',
        ContactPersonName: '',
        ContactPersonNumber: '',
        TypeofTrips: '',
        LicenseImageUrl: '',
        LogoUrl: '',
        CoverImageUrl: '',
        acceptTerms: false,
      });
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      alert(
        error instanceof Error 
          ? error.message || t('getInTouch.submissionError')
          : t('getInTouch.submissionError')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`font-sans ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Cover Image */}
      <div className="relative w-full mb-5">
        <img
          src={getInTouchImage}
          alt={t('getInTouch.contactImageAlt')}
          className="w-full h-auto"
        />
        {/* Text Over the Image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-yesteryear text-4xl md:text-7xl shadow-lg">
          {t('getInTouch.title')}
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-6xl mx-auto p-5 shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          {/* Company Name and Owner */}
          <div className="flex flex-col md:flex-row gap-5 mb-5 mt-5">
            <div className="flex-1">
              <label>{t('getInTouch.companyName')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="CompanyName"
                value={formData.CompanyName}
                onChange={handleChange}
                required
                placeholder={t('getInTouch.companyNamePlaceholder')}
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>{t('getInTouch.owner')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="Owner"
                value={formData.Owner}
                onChange={handleChange}
                required
                placeholder={t('getInTouch.ownerPlaceholder')}
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
          </div>

          {/* Email and Commercial Registration Number */}
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex-1">
              <label>{t('getInTouch.companyEmail')} <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
                placeholder={t('getInTouch.companyEmailPlaceholder')}
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>{t('getInTouch.registrationNumber')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="CommercialRegistrationNumber"
                value={formData.CommercialRegistrationNumber}
                onChange={handleChange}
                required
                placeholder={t('getInTouch.registrationNumberPlaceholder')}
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
          </div>

          {/* Phone Number and Website URL */}
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex-1">
              <label>{t('getInTouch.phoneNumber')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                required
                placeholder={t('getInTouch.phoneNumberPlaceholder')}
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>{t('getInTouch.websiteURL')}</label>
              <input
                type="text"
                name="WebsiteUrl"
                value={formData.WebsiteUrl}
                onChange={handleChange}
                placeholder={t('getInTouch.websiteURLPlaceholder')}
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
          </div>

          {/* Logo and Cover Image URLs */}
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex-1">
              <label>{t('getInTouch.logoURL')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="LogoUrl"
                value={formData.LogoUrl}
                onChange={handleChange}
                required
                placeholder={t('getInTouch.logoURLPlaceholder')}
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>{t('getInTouch.coverImageURL')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="CoverImageUrl"
                value={formData.CoverImageUrl}
                onChange={handleChange}
                required
                placeholder={t('getInTouch.coverImageURLPlaceholder')}
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
          </div>

          {/* Company Address */}
          <div className="mb-5">
            <label>{t('getInTouch.companyAddress')} <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="CompanyAddress"
              value={formData.CompanyAddress}
              onChange={handleChange}
              required
              placeholder={t('getInTouch.companyAddressPlaceholder')}
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label>{t('getInTouch.description')} <span className="text-red-500">*</span></label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
              placeholder={t('getInTouch.descriptionPlaceholder')}
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951] min-h-[100px]"
            />
          </div>

          {/* Contact Person Details */}
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex-1">
              <label>{t('getInTouch.contactPersonName')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="ContactPersonName"
                value={formData.ContactPersonName}
                onChange={handleChange}
                required
                placeholder={t('getInTouch.contactPersonNamePlaceholder')}
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>{t('getInTouch.contactPersonNumber')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="ContactPersonNumber"
                value={formData.ContactPersonNumber}
                onChange={handleChange}
                required
                placeholder={t('getInTouch.contactPersonNumberPlaceholder')}
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
          </div>

          {/* Type of Trips */}
          <div className="mb-5">
            <label>{t('getInTouch.typeOfTrips')} <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="TypeofTrips"
              value={formData.TypeofTrips}
              onChange={handleChange}
              required
              placeholder={t('getInTouch.typeOfTripsPlaceholder')}
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
            />
          </div>

          {/* License Image URL */}
          <div className="mb-5">
            <label>{t('License Image Link')} <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="LicenseImageUrl"
              value={formData.LicenseImageUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/license.jpg"
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex flex-col md:flex-row gap-5 mb-5 mt-10">
            <div className="flex-1 bg-gray-100 p-5 rounded-md">
              <p className="font-bold mb-3">{t('getInTouch.termsTitle')}</p>
              <ul className="list-disc pl-5">
                <li>{t('getInTouch.termsPoint1')}</li>
                <li>{t('getInTouch.termsPoint2')}</li>
                <li>{t('getInTouch.termsPoint3')}</li>
              </ul>
              <div className="mt-3 text-[#2642a8]">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  {t('getInTouch.acceptTerms')}
                </label>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <img
                src={termsImage}
                alt={t('getInTouch.termsImageAlt')}
                className="w-full md:w-2/3 h-auto rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 bg-[#DF6951] text-white rounded-md hover:bg-[#C6533D] transition-colors w-full md:w-1/5 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? t('getInTouch.submitting') : t('getInTouch.registerButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetInTouch;