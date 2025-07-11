import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tour } from '../types';
import tiaraImage from '../assets/images/tiara.png';

interface BookingFormProps {
  tour: Tour;
}

const BookingForm: React.FC<BookingFormProps> = ({ tour }) => {
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleAdultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(e.target.value, 10));
    setNumberOfAdults(value);
  };

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(e.target.value, 10));
    setNumberOfChildren(value);
  };

  const calculateTotalPrice = () => {
    const adultPrice = numberOfAdults * (tour.price || 0);
    const childPrice = numberOfChildren * ((tour.price || 0) / 2);
    return adultPrice + childPrice;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/payment', {
      state: {
        title: tour.title,
        price: calculateTotalPrice(),
        tourLocation: tour.destinationCity,
        numberOfAdults,
        numberOfChildren,
        customerInfo: {
          name,
          email,
          phone
        }
      }
    });
  };

  return (
    <div className="w-80 sticky top-8 self-start">
      <div className="bg-gray-100 p-6 rounded-lg h-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Book This Tour</h2>

        {/* Booking Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
            required
          />
          <input
            type="email"
            placeholder="Confirm Email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
            required
          />

          {/* Number of Adults and Children */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-gray-700">Adults</label>
                <input
                  type="number"
                  value={numberOfAdults}
                  onChange={handleAdultsChange}
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-gray-700">Children</label>
                <input
                  type="number"
                  value={numberOfChildren}
                  onChange={handleChildrenChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                />
              </div>
            </div>
          </div>

          {/* Total Price */}
          <div className="text-lg font-semibold text-gray-900">
            Total Price: £{calculateTotalPrice()}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-[#DF6951] text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>

      {/* Image under the booking container */}
      <div className="w-full px-0 mt-4">
        <img
          src={tiaraImage}
          alt="Tiara"
          className="w-full h-68 object-cover"
        />
      </div>
    </div>
  );
};

export default BookingForm;
