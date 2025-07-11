import React, { useState, ChangeEvent, FormEvent } from 'react';

// Import images from the assets/images directory
import getInTouchImage from '../assets/images/getintouch1.png';
import termsImage from '../assets/images/273 1.png';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    owner: '',
    name: '',
    commonRegistrationNumber: '',
    phoneNumber: '',
    whatsapp: '',
    email: '',
    companyAddress: '',
    companyDiscription:'',
    contactPersonName: '',
    contactEmail: '',
    contactPersonNumber: '',
    typeOfType: '',
    keyDestinations: '', 
    specialActivities: '',
    additionalDocument: '',
    websiteURL: '', 
    LogoURl:'',
    coverImageURL:'',
    acceptTerms: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle checkboxes separately
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement; // Narrow down the type
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic here
  };

  return (
    <div className="font-sans">
      {/* Cover Image */}
      <div className="relative w-full mb-5">
        <img
          src={getInTouchImage}
          alt="Contact Us"
          className="w-full h-auto"
        />
        {/* Text Over the Image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-yesteryear text-4xl md:text-7xl shadow-lg">
          Get In Touch
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-6xl mx-auto p-5 shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          {/* Two inputs per row */}
          <div className="flex flex-col md:flex-row gap-5 mb-5 mt-5">
            <div className="flex-1">
              <label>Company Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g., ABC Corporation"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>Owner <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
          </div>

          {/* More form fields */}
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex-1">
              <label>Company Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., info@abccorp.com"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>Commercial Registration Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="commonRegistrationNumber"
                value={formData.commonRegistrationNumber}
                onChange={handleChange}
                placeholder="e.g., 123456789"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
          </div>

          {/* Phone Number and Website URL */}
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex-1">
              <label>Phone Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g., +1234567890"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>Website URL</label>
              <input
                type="text"
                name="websiteURL"
                value={formData.websiteURL}
                onChange={handleChange}
                placeholder="e.g., www.abccorp.com"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            
          </div>
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex-1">
              <label>Logo URl <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="LogoURl"
                value={formData.LogoURl}
                onChange={handleChange}
                placeholder="e.g., +1234567890"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>Cover Image URL<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="coverImageURL"
                value={formData.coverImageURL}
                onChange={handleChange}
                placeholder="e.g., www.abccorp.com"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            
          </div>

          {/* Company Address */}
          <div className="mb-5">
            <label>Company Address</label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              placeholder="e.g., 123 Main St, City, Country"
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
            />
            <div className="flex-1 mb-5 mt-5">
              <label>Discription  <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="Discription"
                value={formData.companyDiscription}
                onChange={handleChange}
                placeholder="e.g., Explor the worled"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
          </div>

          {/* Contact Person Details */}
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex-1">
              <label>Contact Person Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                placeholder="e.g., Jane Smith"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>Contact Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="e.g., jane.smith@abccorp.com"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
          </div>

          {/* Contact Person Number */}
          <div className="mb-5">
            <label>Contact Person Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="contactPersonNumber"
              value={formData.contactPersonNumber}
              onChange={handleChange}
              placeholder="e.g., +1234567890"
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
            />
          </div>

          {/* Type of Trips and Key Destinations */}
          <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex-1">
              <label>Type of Trips <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="typeOfType"
                value={formData.typeOfType}
                onChange={handleChange}
                placeholder="e.g., Business, Leisure"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
            <div className="flex-1">
              <label>Key Destinations</label>
              <input
                type="text"
                name="keyDestinations"
                value={formData.keyDestinations}
                onChange={handleChange}
                placeholder="e.g., New York, Paris"
                className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
              />
            </div>
          </div>

          {/* Special Activities */}
          <div className="mb-5">
            <label>Special Activities</label>
            <input
              type="text"
              name="specialActivities"
              value={formData.specialActivities}
              onChange={handleChange}
              placeholder="e.g., Team Building, Adventure Sports"
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
            />
          </div>

          {/* Additional Document */}
          <div className="mb-5">
            <label>Additional Document Layout</label>
            <input
              type="file"
              name="additionalDocument"
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-[#DF6951]"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex flex-col md:flex-row gap-5 mb-5 mt-10">
            <div className="flex-1 bg-gray-100 p-5 rounded-md">
              <p className="font-bold mb-3">By Submitting the Form, You Agree To:</p>
              <ul className="list-disc pl-5">
                <li>Provide Company Official Registration and Valid Travel Operation License.</li>
                <li>Ensure Website or Social Platform is Active for Collaborative Display Purposes.</li>
                <li>Confirm Agreement to Share and Feature Content on Our Tourism Platform.</li>
              </ul>
              <div className="mt-3 text-[#2642a8]">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Accepts the File Available Now From Post Your Account for Policy violations.
                </label>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <img
                src={termsImage}
                alt="Terms and Conditions"
                className="w-full md:w-2/3 h-auto rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-[#DF6951] text-white rounded-md hover:bg-[#C6533D] transition-colors w-full md:w-1/5"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetInTouch;
