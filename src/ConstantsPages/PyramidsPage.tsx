import React from 'react';
import { FaCamera, FaUtensils, FaRunning, FaInfoCircle, FaMapMarkerAlt, FaStar, FaClock, FaTicketAlt, FaMonument, FaHistory, FaBus, FaCrown, FaLandmark, FaGem } from 'react-icons/fa';

const PyramidsPage = () => {
  // Ticket information
  const ticketInfo = {
    prices: {
      adult: 'EGP 200 (≈ $12.50)',
      student: 'EGP 100 (≈ $6.25) with valid ID',
      child: 'Free for children under 6',
      pyramidInterior: 'EGP 400 (≈ $25) additional'
    },
    hours: {
      summer: '8:00 AM - 5:00 PM (April - September)',
      winter: '8:00 AM - 4:00 PM (October - March)',
      soundAndLight: 'Showtimes vary (Typically 6:30 PM, 7:30 PM, 8:30 PM)'
    },
    bookingLink: 'https://www.tiqets.com/en/giza-pyramids-tickets-l145658/'
  };

  // Activities data
  const activities = [
    {
      id: 1,
      name: "Camel Riding",
      description: "Experience the pyramids like ancient traders on a camel ride around the complex",
      price: "EGP 300-500 (≈ $18-$30) for 30-60 minutes",
      bestTime: "Early morning or late afternoon",
      image: "https://images.unsplash.com/photo-1582576132270-68d4d7f4e571?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      name: "Sound & Light Show",
      description: "Spectacular nighttime show narrating the history of the pyramids with dramatic lighting",
      price: "EGP 250 (≈ $15) per person",
      bestTime: "Evenings after sunset",
      image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      name: "Pyramid Interior Exploration",
      description: "Climb inside the Great Pyramid to see the ancient chambers (limited tickets)",
      price: "Included with general ticket + EGP 400 (≈ $25) additional",
      bestTime: "Morning when less crowded",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  // Restaurants data
  const restaurants = [
    {
      id: 1,
      name: "9 Pyramids Lounge",
      cuisine: "Egyptian & International",
      rating: 4.5,
      distance: "Inside the pyramids complex",
      bookingLink: "https://www.9pyramidslounge.com",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      name: "Khufu's Restaurant",
      cuisine: "Traditional Egyptian",
      rating: 4.3,
      distance: "5 min walk from Sphinx entrance",
      bookingLink: "https://www.khufusrestaurant.com",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      name: "The Mena House",
      cuisine: "Luxury Dining",
      rating: 4.8,
      distance: "Adjacent to pyramids complex",
      bookingLink: "https://www.menahousehotel.com",
      image: "https://images.unsplash.com/photo-1589010588553-46e8e7c21788?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  // Pyramids information
  const pyramidsInfo = [
    {
      id: 1,
      name: "Great Pyramid of Khufu",
      height: "146.6 meters (originally)",
      age: "Built around 2560 BCE",
      facts: "Largest pyramid, contains three burial chambers"
    },
    {
      id: 2,
      name: "Pyramid of Khafre",
      height: "136.4 meters",
      age: "Built around 2570 BCE",
      facts: "Still has some original limestone casing at the top"
    },
    {
      id: 3,
      name: "Pyramid of Menkaure",
      height: "65 meters",
      age: "Built around 2510 BCE",
      facts: "Smallest of the three main pyramids"
    }
  ];

  return (
    <div className="bg-ivory-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="The Great Pyramids of Giza"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 font-playfair tracking-wide">
              THE GREAT PYRAMIDS
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-cormorant italic mb-8">
              "The last remaining wonder of the ancient world"
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        {/* Ticket Information */}
        <section className="mb-24 bg-white p-12 shadow-xl">
          <h2 className="text-4xl font-playfair font-bold text-navy-800 mb-8 text-center">
            <span className="text-gold-500">Ticket</span> Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <FaTicketAlt className="text-gold-500 mr-3" />
                Ticket Prices
              </h3>
              <ul className="space-y-4">
                <li className="flex justify-between border-b pb-2">
                  <span>Adult Ticket:</span>
                  <span className="font-medium">{ticketInfo.prices.adult}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Student Ticket:</span>
                  <span className="font-medium">{ticketInfo.prices.student}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Children:</span>
                  <span className="font-medium">{ticketInfo.prices.child}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Pyramid Interior Access:</span>
                  <span className="font-medium">{ticketInfo.prices.pyramidInterior}</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <a 
                  href={ticketInfo.bookingLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 px-6 rounded inline-flex items-center"
                >
                  <FaTicketAlt className="mr-2" />
                  Book Tickets Online
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <FaClock className="text-gold-500 mr-3" />
                Opening Hours
              </h3>
              <ul className="space-y-4">
                <li className="border-b pb-2">
                  <p className="font-semibold">Summer Season (April - September):</p>
                  <p>{ticketInfo.hours.summer}</p>
                </li>
                <li className="border-b pb-2">
                  <p className="font-semibold">Winter Season (October - March):</p>
                  <p>{ticketInfo.hours.winter}</p>
                </li>
                <li>
                  <p className="font-semibold">Sound & Light Show:</p>
                  <p>{ticketInfo.hours.soundAndLight}</p>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-navy-50 rounded">
                <h4 className="font-semibold mb-2 flex items-center">
                  <FaInfoCircle className="text-gold-500 mr-2" />
                  Important Notes:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Last entry is 1 hour before closing</li>
                  <li>Friday prayer times may affect hours (12:00-13:30)</li>
                  <li>Ramadan hours may differ</li>
                  <li>Photography permit required for professional cameras</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-playfair font-bold text-navy-800 mb-12 text-center">
            <span className="text-gold-500">Activities</span> & Experiences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map(activity => (
              <div key={activity.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{activity.name}</h3>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{activity.price}</span>
                    <span className="text-sm bg-navy-100 px-2 py-1 rounded">
                      Best: {activity.bestTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pyramids Information */}
        <section className="mb-24 bg-navy-800 text-white p-12 rounded-lg">
          <h2 className="text-4xl font-playfair font-bold text-gold-500 mb-12 text-center">
            About the <span className="text-white">Pyramids</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pyramidsInfo.map(pyramid => (
              <div key={pyramid.id} className="bg-navy-700 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3 text-gold-500">{pyramid.name}</h3>
                <div className="space-y-3">
                  <p><span className="font-semibold">Height:</span> {pyramid.height}</p>
                  <p><span className="font-semibold">Age:</span> {pyramid.age}</p>
                  <p><span className="font-semibold">Interesting Fact:</span> {pyramid.facts}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-navy-700 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-gold-500">Historical Significance</h3>
            <p className="mb-4">
              The Pyramids of Giza were built as monumental tombs for pharaohs during Egypt's Old Kingdom period. 
              They represent the pinnacle of pyramid building technology and were the tallest man-made structures 
              for over 3,800 years.
            </p>
            <p>
              The complex also includes the Great Sphinx, several cemeteries, a workers' village, and an industrial 
              complex. The pyramids were part of a larger complex that included temples, causeways, and valley temples.
            </p>
          </div>
        </section>

        {/* Restaurants Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-playfair font-bold text-navy-800 mb-12 text-center">
            Nearby <span className="text-gold-500">Restaurants</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restaurants.map(restaurant => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    <span className="flex items-center bg-gold-100 text-gold-800 px-2 py-1 rounded text-sm">
                      <FaStar className="mr-1" />
                      {restaurant.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                  <p className="text-sm mb-4 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gold-500" />
                    {restaurant.distance}
                  </p>
                  <a 
                    href={restaurant.bookingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-navy-800 hover:bg-navy-700 text-white py-2 px-4 rounded text-sm"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="bg-white p-12 rounded-lg shadow-xl">
          <h2 className="text-4xl font-playfair font-bold text-navy-800 mb-8 text-center">
            Visitor <span className="text-gold-500">Tips</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <FaRunning className="text-gold-500 mr-3" />
                Best Times to Visit
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Arrive at opening time (8:00 AM) to avoid crowds and heat</li>
                <li>October to April has the most pleasant weather</li>
                <li>Weekdays are less crowded than weekends</li>
                <li>Sunset offers beautiful lighting for photography</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <FaCamera className="text-gold-500 mr-3" />
                Photography Tips
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Morning light is best for photos of the pyramids from the east</li>
                <li>The panoramic viewpoint west of the pyramids offers the classic view</li>
                <li>Professional photography requires a permit (EGP 300)</li>
                <li>Tripods may require special permission</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-navy-50 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4 text-center">General Advice</h3>
            <ul className="list-disc pl-5 space-y-2 columns-1 md:columns-2">
              <li>Wear comfortable walking shoes and a hat</li>
              <li>Bring plenty of water and sunscreen</li>
              <li>Bargain firmly but politely with vendors</li>
              <li>Official guides have licenses displayed</li>
              <li>ATMs are scarce - bring sufficient cash</li>
              <li>Bathrooms are available near the ticket office</li>
              <li>Respect local customs and dress modestly</li>
              <li>Don't climb on the pyramids (it's prohibited)</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PyramidsPage;