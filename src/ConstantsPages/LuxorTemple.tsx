import { useState } from 'react';
import { MapPin, Clock, Utensils, Car, Plane, Train, ChevronDown, ChevronUp } from 'lucide-react';

function LuxorTemplePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What are the opening hours of Luxor Temple?",
      answer: "Luxor Temple is open daily from 6:00 AM to 10:00 PM in summer (April-September) and from 6:00 AM to 9:00 PM in winter (October-March). The best times to visit are early morning or late afternoon to avoid the heat and crowds. Evening visits are particularly magical when the temple is beautifully illuminated."
    },
    {
      question: "Is there an entrance fee?",
      answer: "Yes, the entrance fee is 160 EGP for adults (about $10) and 80 EGP for students with valid ID. Children under 6 enter free. Tickets can be purchased at the site entrance or online through the Egyptian Ministry of Antiquities website. Combined tickets with other Luxor sites are also available."
    },
    {
      question: "Do I need a guide?",
      answer: "While not mandatory, a knowledgeable guide greatly enhances the experience. Official guides are available at the entrance (expect to pay around 200-300 EGP for a 1-2 hour tour). Audio guides are also available for rent (approximately 100 EGP). The temple's hieroglyphics and architecture tell fascinating stories that are best explained by an expert."
    },
    {
      question: "How long does a visit take?",
      answer: "Most visitors spend 1-2 hours exploring Luxor Temple. If you're particularly interested in ancient Egyptian history or photography, you might want to allow 2-3 hours. Evening visits tend to be shorter (about 1 hour) as some interior areas may have limited access after dark."
    },
    {
      question: "Is photography allowed?",
      answer: "Yes, photography is permitted throughout the temple for personal use with standard cameras and smartphones (no additional fee). Tripods require special permission (available at the ticket office for professional photographers). Flash photography is prohibited as it can damage the ancient reliefs."
    },
    {
      question: "What should I wear?",
      answer: "Dress modestly out of respect for local customs - shoulders and knees should be covered. Wear comfortable walking shoes as you'll be walking on uneven stone surfaces. A hat and sunscreen are essential during daytime visits. Evenings can be cool, so bring a light jacket."
    },
    {
      question: "Is the temple accessible for wheelchair users?",
      answer: "Partial accessibility is available. The main courtyard and some pathways are wheelchair-friendly, but many areas have steps and uneven surfaces. A wheelchair-accessible route is marked at the entrance. It's recommended to have assistance as some areas may be challenging to navigate independently."
    },
    {
      question: "Are there facilities at the site?",
      answer: "Yes, there are clean restrooms near the entrance, a small gift shop selling souvenirs and books, and drinking water available for purchase. There are no food facilities inside the temple, but numerous cafes and restaurants are located just outside the gates."
    }
  ];

  const galleryImages = [
    {
      src: "https://media.istockphoto.com/id/1322882224/photo/luxor-temple-main-view-beautiful-sunset-light-egypt.jpg?s=612x612&w=0&k=20&c=GBVOrh75QAckrFMk9tMcczbnwzUNnovsZBvuWP2qJmQ=",
      alt: "Luxor Temple entrance at sunset"
    },
    {
      src: "https://media.tacdn.com/media/attractions-splice-spp-360x240/0f/50/4a/5c.jpg",
      alt: "Colonnade of Amenhotep III"
    },
    {
      src: "https://www.islandlight.ca/photos/1000/karnak-ancient-monument-photo-277.jpg",
      alt: "Luxor Temple at night illumination"
    },
    {
      src: "https://img.freepik.com/premium-photo/avenue-ramheaded-sphinxes-karnak-temple-luxor-egypt_508659-4927.jpg",
      alt: "Hieroglyphics at Luxor Temple"
    },
    {
      src: "https://as1.ftcdn.net/v2/jpg/04/84/41/56/1000_F_484415680_rLmtyugPSz0KxiprTeJTBhoBGNlOPi3F.jpg",
      alt: "Statues of Ramses II"
    },
    {
      src: "https://s.abcnews.com/images/International/avenue-sphinxes-gty-rc-211123_1637696569650_hpMain_16x9_992.jpg",
      alt: "Avenue of Sphinxes view"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://geotours.b-cdn.net/photos/excursions/Karnak-and-Luxor-temple-sound-and-light-show%2001_1cdab_lg.jpg')`
          }}
        ></div>
        <div className="relative text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Luxor Temple
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            The Sacred Sanctuary of Ancient Thebes
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Luxor Temple</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              One of Egypt's most magnificent temple complexes, built over 3,400 years ago
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://www.egypttoursportal.com/images/2017/11/luxor-the-ancient-city-egypt-tours-portal.jpg" 
                alt="Luxor Temple overview" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">The Jewel of Ancient Thebes</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Luxor Temple was constructed approximately 1400 BCE by Amenhotep III and completed by Tutankhamun, Horemheb, and Ramses II. Unlike other temples, it wasn't dedicated to a god but served as the setting for the annual Opet Festival where the gods Amun, Mut, and Khonsu traveled from Karnak Temple to Luxor Temple.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-amber-600">3,400+</div>
                  <div className="text-sm text-gray-600">Years Old</div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-amber-600">260m</div>
                  <div className="text-sm text-gray-600">Length</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The temple was buried under the modern city of Luxor for centuries, with only the tops of columns visible. This preserved many of its structures remarkably well. The temple complex includes a mosque built on top of the ruins, which remains in use today - a fascinating blend of ancient and Islamic Egypt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience Luxor Temple</h2>
            <p className="text-xl text-gray-600">Discover the wonders of this ancient sanctuary</p>
          </div>
          
         <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
              src="https://www.youtube.com/embed/CqO4PE4uZhc?start"


              title="Pyramids of Giza Documentary"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

 {/* Tickets Section */}
<section id="tickets" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Tickets & Schedule</h2>
      <p className="text-xl text-gray-600">Plan your visit to Luxor Temple</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-12">
      <div className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">General Admission</h3>
        <div className="text-3xl font-bold text-amber-600 mb-4">EGP 200</div>
        <ul className="text-gray-600 space-y-2 mb-6">
          <li>• Access to the entire temple</li>
          <li>• Open daily from 6:00 AM to 10:00 PM</li>
          <li>• Valid for one-time entry</li>
        </ul>
        <a 
          href="https://egymonuments.gov.eg/visitor/AttractionDetails/5e5e45d6b6f5f21e78d8a028"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
        >
          Book via Egymonuments
        </a>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-lg border-2 border-amber-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Luxor Pass</h3>
        <div className="text-3xl font-bold text-amber-600 mb-4">USD 100</div>
        <ul className="text-gray-600 space-y-2 mb-6">
          <li>• Covers Luxor Temple, Karnak, Valley of the Kings & more</li>
          <li>• Valid for 5 consecutive days</li>
          <li>• Priority access at major sites</li>
        </ul>
        <a 
          href="https://egymonuments.gov.eg"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
        >
          Learn More
        </a>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Student Ticket</h3>
        <div className="text-3xl font-bold text-amber-600 mb-4">EGP 100</div>
        <ul className="text-gray-600 space-y-2 mb-6">
          <li>• Discounted price with valid student ID</li>
          <li>• Same access as General Admission</li>
          <li>• Only for Egyptian & international students</li>
        </ul>
        <a 
          href="https://egymonuments.gov.eg"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
        >
          View Details
        </a>
      </div>
    </div>

    <div className="bg-blue-50 p-8 rounded-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Clock className="w-6 h-6 mr-2 text-blue-600" />
        Opening Hours
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Summer (April - September)</h4>
          <p className="text-gray-600">6:00 AM - 10:00 PM</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Winter (October - March)</h4>
          <p className="text-gray-600">6:00 AM - 9:00 PM</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        * Last admission is 30 minutes before closing. Evening light display starts at sunset.
      </p>
    </div>
  </div>
</section>
{/* Activities Section */}
<section id="activities" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Activities & Experiences</h2>
      <p className="text-xl text-gray-600">Enhance your visit to Luxor Temple</p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREl8LJcoqYNoygSlFdScz6-izmdD-W68Rsiw&s" 
          alt="Sound and Light Show" 
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Sound & Light Show</h3>
          <p className="text-gray-600 mb-4">
            Discover Luxor’s history through a magical night show filled with sound, lights, and storytelling.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-amber-600">Approx. EGP 250</span>
            <a 
              href="https://www.soundandlightegypt.com/luxor-temple-sound-and-light-show/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <img 
          src="https://c.stocksy.com/a/4KfN00/z9/5640392.jpg" 
          alt="Photography Tour" 
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Photography Tour</h3>
          <p className="text-gray-600 mb-4">
            Join a professional photographer to capture the best angles and light at the temple.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-amber-600">From EGP 700</span>
            <a 
              href="https://www.viator.com/tours/Luxor/Photography-Tour-Luxor-Temple/d826-273977P8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <img 
          
           src="https://ramsestours.com/wp-content/uploads/2023/09/image-21.png" 
          alt="Private Tour" 
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Private Guided Tour</h3>
          <p className="text-gray-600 mb-4">
            Get an exclusive tour with an expert guide who will walk you through the temple’s legends and architecture.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-amber-600">From EGP 600</span>
            <a 
              href="https://www.viator.com/tours/Luxor/Luxor-Temple-Guided-Tour/d826-31282P14"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Dining Section */}
<section id="dining" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Nearby Restaurants to Karnak Temple</h2>
      <p className="text-xl text-gray-600">Relax and dine after exploring ancient wonders</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Sofra Restaurant & Cafe */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="flex items-center mb-4">
          <Utensils className="w-6 h-6 text-amber-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">Sofra Restaurant & Cafe</h3>
        </div>
        <img 
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/16/7b/22/we-were-seated-in-this.jpg?w=1100&h=600&s=1"
          alt="Sofra Restaurant & Cafe"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">
          Authentic Egyptian cuisine in a casual setting. A local favorite for traditional dishes and warm service.
        </p>
        <p className="text-sm text-gray-500 mb-2">4.3 ★ (2221 reviews) · $$</p>
        <p className="text-sm text-gray-500 mb-4">Hilton St, Karnak, Luxor</p>
        <a 
          href="https://www.google.com/maps/place/Sofra+Restaurant+%26+Cafe/data=!4m2!3m1!1s0x0:0xab55aa77b2c4e009?sa=X&ved=1t:2428&ictx=111"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          View on Google Maps
        </a>
      </div>

      {/* Fish House */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="flex items-center mb-4">
          <Utensils className="w-6 h-6 text-amber-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">Fish House</h3>
        </div>
        <img 
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/ec/5b/9f/fish-house-restaurant.jpg?w=500&h=-1&s=1"
          alt="Fish House Luxor"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">
          Specializing in fresh seafood and Nile fish dishes. Elegant indoor seating with river views.
        </p>
        <p className="text-sm text-gray-500 mb-2">4.9 ★ (228 reviews)</p>
        <p className="text-sm text-gray-500 mb-4">Corniche El Nile, Luxor</p>
        <a 
          href="http://fishhouseluxor.com/?utm_source=chatgpt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Visit Website
        </a>
      </div>

      {/* Casa Di Napoli */}
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="flex items-center mb-4">
          <Utensils className="w-6 h-6 text-amber-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">Casa Di Napoli</h3>
        </div>
        <img 
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/5b/4f/7a/taste-the-oriental-atmosphere.jpg?w=1200&h=900&s=1"
          alt="Casa Di Napoli Luxor"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">
          Italian restaurant known for pizza, pasta, and cozy atmosphere. Great for travelers craving Western flavors.
        </p>
        <p className="text-sm text-gray-500 mb-2">4.9 ★ (790+ reviews)</p>
        <p className="text-sm text-gray-500 mb-4">Near Karnak Temple, Luxor</p>
        <a 
          href="https://goo.gl/maps/YKp3J5UX9UmWoKyX6"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  </div>
</section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-xl text-gray-600">Explore the wonders of Luxor Temple through images</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Visit Section */}
      <section id="visit" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Get There</h2>
            <p className="text-xl text-gray-600">Best ways to reach Luxor Temple</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">By Air</h3>
              <p className="text-gray-600 mb-4">
                Fly into Luxor International Airport (LXR), then take a taxi (15-20 minutes) to the temple in central Luxor.
              </p>
              <p className="text-sm text-gray-500">Distance: 8 km from airport</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Train className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">By Train</h3>
              <p className="text-gray-600 mb-4">
                Overnight sleeper trains from Cairo arrive at Luxor Station. The temple is a 10-minute walk from the station.
              </p>
              <p className="text-sm text-gray-500">Train duration: 9-10 hours</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">By Taxi or Bus</h3>
              <p className="text-gray-600 mb-4">
                The temple is centrally located in Luxor city, easily accessible by taxi (5-10 EGP) or local bus from anywhere in town.
              </p>
              <p className="text-sm text-gray-500">Walking distance from most hotels</p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-red-600" />
              Location Details
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                <p className="text-gray-600 mb-4">Luxor City, Nile Corniche, Luxor Governorate, Egypt</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">GPS Coordinates</h4>
                <p className="text-gray-600 mb-4">25.6999° N, 32.6392° E</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Best Time to Visit</h4>
                <p className="text-gray-600">Early morning (6-8 AM) or late afternoon (4-6 PM) to avoid heat. Evening visits offer beautiful illumination.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What to Bring</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Comfortable walking shoes</li>
                  <li>• Sun protection (hat, sunscreen)</li>
                  <li>• Water bottle (can be refilled at site)</li>
                  <li>• Camera (no extra fee for photography)</li>
                  <li>• Small change for restroom attendants</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know before your visit</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-amber-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-amber-600" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LuxorTemplePage;