import  { useState, ChangeEvent, FormEvent } from 'react';

//  images from the assets/images directory
import coverImage from '../assets/images/1.png';
import contactUsIllustration1 from '../assets/images/contact-us-img-1.png';
import contactUsIllustration3 from '../assets/images/contact-us-img-3.png';
import backgroundImage from '../assets/images/h1-background-img-1 1.png';
import travelConceptsImage from '../assets/images/Travel_Concepts_2 1.png';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    telephone: '',
    request: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="font-sans">
      {/* Cover Image */}
      <div className="relative w-full mb-5">
        <img
          src={coverImage} // Use the imported image
          alt="Contact Us"
          className="w-full h-auto"
        />
        {/* Text Over the Image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-yesteryear text-7xl shadow-lg">
          Contact Us
        </div>
      </div>

      {/* Top Container */}
      <div className="max-w-6xl mx-auto p-5 shadow-lg">
        {/* Heading and Image in the Same Line */}
        <div className="flex items-center justify-between mb-14 mt-14 ml-12">
          <h2 className="text-[#DF6951] font-yesteryear text-4xl m-0 ml-14">
            Send message
          </h2>
          {/* Image on the Far Right */}
          <img
            src={contactUsIllustration1} // Use the imported image
            alt="Contact Us Illustration"
            className="w-48 h-auto mr-20"
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Inputs */}
          <div className="flex gap-5 mb-12 justify-center mx-12">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 p-2 border-b border-gray-300 outline-none bg-transparent font-volkhov"
            />
            <input
              type="text"
              name="surname"
              placeholder="Your Surname"
              value={formData.surname}
              onChange={handleChange}
              className="flex-1 p-2 border-b border-gray-300 outline-none bg-transparent font-volkhov"
            />
          </div>

          <div className="flex gap-5 mb-12 mx-12">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 p-2 border-b border-gray-300 outline-none bg-transparent font-volkhov"
            />
            <input
              type="tel"
              name="telephone"
              placeholder="Your Telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="flex-1 p-2 border-b border-gray-300 outline-none bg-transparent font-volkhov"
            />
          </div>

          <div className="mb-12 mx-12">
            <select
              name="request"
              value={formData.request}
              onChange={handleChange}
              className="w-full p-2 border-b border-gray-300 outline-none bg-transparent font-volkhov"
            >
              <option value="">Request</option>
              <option value="info">Information</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message Textarea */}
          <div className="flex justify-center mb-5">
            <textarea
              name="message"
              placeholder="Your Message..."
              value={formData.message}
              onChange={handleChange}
              className="w-full max-w-lg p-3 border border-gray-300 rounded-md outline-none bg-transparent resize-none font-volkhov text-sm leading-relaxed h-48"
            />
          </div>

          {/* Submit Button and Image */}
          <div className="flex justify-center items-center mt-20 relative">
            <button
              type="submit"
              className="px-8 py-3 bg-[#DF6951] text-white border-none rounded-md text-xl font-bold font-volkhov cursor-pointer transition-colors hover:bg-[#C6533D] mb-10"
            >
              Submit
            </button>
            {/* Image on the Far Right */}
            <img
              src={contactUsIllustration3} // Use the imported image
              alt="Contact Us Illustration"
              className="w-36 h-auto absolute right-0"
            />
          </div>
        </form>
      </div>

      {/* Counter Bottom */}
      <div className="w-full bg-[#f9f7f6] text-black mt-24 py-14 relative">
        {/* Background Image Overlay */}
        <img
          src={backgroundImage} // Use the imported image
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        />

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-5 relative z-20">
          <h3 className="text-[#DF6951] font-volkhov text-xl mb-8 pl-1">
            TRAVEL EGYPT CUSTOMER SERVICE
          </h3>

          {/* Text Content */}
          <div className="pr-12">
            <p className="my-5">Phone: [Phone Number]</p>
            <p className="my-5">Email: support@travilegypt.com</p>
            <div className="flex items-center my-5">
              <p className="mr-3">For Companies</p>
              <button
                type="submit"
                className="px-4 py-2 bg-[#DF6951] text-white border-none rounded-md text-xs font-bold font-volkhov cursor-pointer transition-colors hover:bg-[#C6533D]"
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>

        {/* Image in the Left Bottom Corner */}
        <img
          src={travelConceptsImage} // Use the imported image
          alt="Travel Concepts"
          className="absolute bottom-0 left-0 w-48 h-auto z-30"
        />
      </div>
    </div>
  );
};

export default ContactUsForm;