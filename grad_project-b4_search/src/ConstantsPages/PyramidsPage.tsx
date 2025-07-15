import  { useState } from 'react';
import { MapPin, Clock, Utensils, Car, Plane, Train, ChevronDown, ChevronUp } from 'lucide-react';

function PyramidsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Can you go inside the pyramids?",
      answer: "Yes, you can enter the Great Pyramid of Khufu with a special ticket. Access is limited to 300 visitors per day and requires advance booking. The entrance leads to the King's Chamber through the Grand Gallery. Note that the passage is narrow and steep, so it's not recommended for those with claustrophobia or mobility issues."
    },
    {
      question: "Is photography allowed?",
      answer: "Photography is allowed in most areas of the Giza complex for personal use. However, photography inside the pyramids requires a special photography ticket (additional fee applies). Professional photography and videography require special permits. Tripods and flash photography may be restricted in certain areas."
    },
    {
      question: "Are there tour guides available?",
      answer: "Yes, licensed tour guides are available at the site. You can hire official guides at the entrance or book guided tours in advance. Guides are available in multiple languages including English, Arabic, French, German, and Spanish. Audio guides are also included with general admission tickets."
    },
    {
      question: "Are there restrooms and cafes inside the complex?",
      answer: "Yes, the Giza complex has several facilities including clean restrooms, souvenir shops, and cafeterias. There are also restaurants with pyramid views nearby. However, facilities inside the pyramids themselves are very limited, so it's recommended to use facilities before entering the pyramids."
    },
    {
      question: "What's the best time to visit?",
      answer: "The best time to visit is early morning (8-10 AM) or late afternoon (3-5 PM) to avoid crowds and the intense midday heat. Winter months (October-March) offer more comfortable temperatures. Avoid Fridays and Egyptian holidays when it's most crowded."
    },
    {
      question: "How long should I plan for my visit?",
      answer: "Plan at least 3-4 hours for a comprehensive visit. This includes time to explore all three pyramids, the Great Sphinx, and take photos. If you're entering inside the pyramids or taking additional activities like camel rides, allow 5-6 hours."
    },
    {
      question: "What should I wear and bring?",
      answer: "Wear comfortable walking shoes, sun hat, and light, modest clothing. Bring sunscreen, water, and cash for entrance fees and tips. A camera is essential, but remember that photography inside pyramids requires an additional ticket."
    },
    {
      question: "Is it safe for tourists?",
      answer: "Yes, the Giza complex is very safe for tourists with security personnel and tourist police present throughout the site. However, be aware of persistent vendors and unofficial guides. Only use licensed tour guides and official ticket counters."
    }
  ];

 const galleryImages = [
  {
    src: "https://cdn-imgix.headout.com/media/images/60bb09866d7758798aef308077fa8b92-Pyramis%20of%20giza.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&fit=crop&ar=16%3A9&crop=faces",
    alt: "Great Pyramid of Giza"
  },
  {
    src: "https://www.earthtrekkers.com/wp-content/uploads/2024/11/Egypt-Header-Image-1129x631.jpg.optimal.jpg",
    alt: "Pyramid close-up"
  },
  {
    src: "https://theholisticbackpacker.com/wp-content/uploads/2022/09/IMG_3704.jpg",
    alt: "Camel ride at pyramids"
  },
  {
    src: "https://ramsestours.com/wp-content/uploads/2023/06/image-245-940x529.png",
    alt: "Pyramids at sunset"
  },
  {
    src: "https://traveljoyegypt.com/wp-content/uploads/2024/04/Sphinx.png",
    alt: "Sphinx and pyramid"
  },
  {
    src: "https://travel2egypt.org/wp-content/uploads/2025/06/pyramids-desert.jpg",
    alt: "Desert view"
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
            backgroundImage: `url('https://konouzeg.com/pub/media/magefan_blog/Sphinx-giza-pyramids.jpg')`
          }}
        ></div>
        <div className="relative text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Great Pyramids of Giza
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Experience the last remaining wonder of the ancient world
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About the Pyramids</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built over 4,500 years ago, the Pyramids of Giza stand as monuments to ancient Egyptian civilization
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                alt="Great Pyramid of Giza" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">The Great Pyramid of Khufu</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The largest of the three pyramids, originally standing at 146.5 meters (481 feet) tall. Built as a tomb for Pharaoh Khufu, it was the world's tallest human-made structure for over 3,800 years.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-amber-600">2.3M</div>
                  <div className="text-sm text-gray-600">Stone Blocks</div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-amber-600">20 Years</div>
                  <div className="text-sm text-gray-600">Construction Time</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The precision of its construction continues to amaze archaeologists and engineers today. The pyramid's base is level to within just 2.1 cm, and its orientation to true north is accurate to within 0.05 degrees.
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience the Pyramids</h2>
            <p className="text-xl text-gray-600">Watch the wonders of ancient Egypt come to life</p>
          </div>
          
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
              src="https://www.youtube.com/embed/u1S9p3IfCV0?start=13"

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
      <p className="text-xl text-gray-600">Plan your visit to the pyramids</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-12">
      <div className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">General Admission</h3>
        <div className="text-3xl font-bold text-amber-600 mb-4">EGP 30</div>
        <ul className="text-gray-600 space-y-2 mb-6">
          <li>• Access to Giza Plateau</li>
          <li>• View all three pyramids</li>
          <li>• Access to the Great Sphinx area</li>
          <li>• Audio guide optional (extra cost)</li>
        </ul>
        <a 
          href="https://egymonuments.gov.eg/visitor/AttractionDetails/5e5e45d6b6f5f21e78d8a028"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
        >
          Book Now
        </a>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-lg border-2 border-amber-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Inside the Pyramid</h3>
        <div className="text-3xl font-bold text-amber-600 mb-4">EGP 360</div>
        <ul className="text-gray-600 space-y-2 mb-6">
          <li>• Includes General Admission benefits</li>
          <li>• Access inside the Great Pyramid</li>
          <li>• Visit the King's Chamber</li>
          <li>• Limited daily tickets (max 300 visitors)</li>
        </ul>
        <a 
          href="https://egymonuments.gov.eg/visitor/AttractionDetails/5e5e45d6b6f5f21e78d8a028"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
        >
          Book Now
        </a>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">VIP Experience</h3>
        <div className="text-3xl font-bold text-amber-600 mb-4">EGP 1200</div>
        <ul className="text-gray-600 space-y-2 mb-6">
          <li>• Private guide throughout the visit</li>
          <li>• Access to all pyramids and special areas</li>
          <li>• Camel or horse ride included</li>
          <li>• Photography permits</li>
        </ul>
        <a 
          href="https://egymonuments.gov.eg/visitor/AttractionDetails/5e5e45d6b6f5f21e78d8a028"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
        >
          Book Now
        </a>
      </div>
    </div>

    <div className="bg-blue-50 p-8 rounded-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        {/* Assuming Clock is an imported icon component */}
        <Clock className="w-6 h-6 mr-2 text-blue-600" />
        Opening Hours
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Summer (April - September)</h4>
          <p className="text-gray-600">8:00 AM - 5:00 PM</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Winter (October - March)</h4>
          <p className="text-gray-600">8:00 AM - 4:00 PM</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        * Last entry is 1 hour before closing time. Access inside pyramids requires advance booking.
      </p>
    </div>
  </div>
</section>

{/* Activities Section */}
<section id="activities" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Activities & Experiences</h2>
      <p className="text-xl text-gray-600">Discover the wonders of ancient Egypt</p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <img 
          src="https://www.cairotoptours.com/storage/21611/conversions/egypt-excursions-(2)-webp.webp" 
          alt="Camel ride at pyramids" 
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Camel Rides</h3>
          <p className="text-gray-600 mb-4">
            Experience the desert like ancient travelers with traditional camel rides around the pyramids.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-amber-600">Approx. EGP 500/hour</span>
            <a 
              href="https://www.getyourguide.com/cairo-l87/pyramids-of-giza-camel-ride-t397906/"
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
          src="https://media.tacdn.com/media/attractions-splice-spp-674x446/09/99/cc/a7.jpg" 
          alt="Sound and Light Show" 
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Sound & Light Show</h3>
          <p className="text-gray-600 mb-4">
            Witness the pyramids illuminated with stunning lights and narrated history in an unforgettable evening show.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-amber-600">Approx. EGP 150/person</span>
            <a 
              href="https://www.soundandlightegypt.com/giza-pyramids-sound-and-light-show/"
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
          src="https://i.ytimg.com/vi/V3hqi9n4cxo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBkfKGo73EyTPi004lFc89M7S4MQw" 
          alt="Photography tour" 
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Photography Tours</h3>
          <p className="text-gray-600 mb-4">
            Capture the perfect shots with professional photography guidance during your visit.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-amber-600">Approx. EGP 700/session</span>
            <a 
              href="https://www.viator.com/tours/Cairo/Giza-Pyramids-Photography-Tour/d782-325851P1"
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
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Dining Options</h2>
      <p className="text-xl text-gray-600">Enjoy authentic Egyptian cuisine near the pyramids</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-gray-50 rounded-lg p-8">
        <div className="flex items-center mb-4">
          <Utensils className="w-6 h-6 text-amber-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">9 Pyramids Lounge</h3>
        </div>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3B1yvHDm2s0vaEh-Qes1LD5pOqGWJMhu4rw&s" 
          alt="Egyptian restaurant" 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">
          Enjoy traditional Egyptian dishes with a stunning view of the pyramids. Features outdoor seating, traditional decor, and authentic flavors.
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Koshari</span>
            <span className="font-semibold">$8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Grilled Kofta</span>
            <span className="font-semibold">$12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Ful Medames</span>
            <span className="font-semibold">$6</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">Open: 10:00 AM - 10:00 PM</p>
        <a 
          href="https://www.google.com/maps/place/9+Pyramids+Lounge/@29.9677783,31.129346,17z/data=!4m9!3m8!1s0x14584f74545fb4b7:0x5397b82f76e498ad!5m2!4m1!1i2!8m2!3d29.9677783!4d31.1319209!16s%2Fg%2F11mv3bzwvh?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          View Details
        </a>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <div className="flex items-center mb-4">
          <Utensils className="w-6 h-6 text-amber-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">Panorama Pyramids</h3>
        </div>
        <img 
          src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/568368731.jpg?k=f0a1237a41751281f8f5fabd6809095392ffb80d156d7f30776a7d1d3eedc262&o=&hp=1" 
          alt="Middle Eastern café" 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">
          A cozy café offering fresh juices, Arabic coffee, and light snacks. Perfect for a quick refreshment between pyramid visits.
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Fresh Mango Juice</span>
            <span className="font-semibold">$4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Turkish Coffee</span>
            <span className="font-semibold">$3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Baklava</span>
            <span className="font-semibold">$5</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">Open: 8:00 AM - 8:00 PM</p>
        <a 
          href="https://www.google.com/maps/place/Panorama+view+pyramids/@29.9677778,31.1216212,15z/data=!4m14!1m2!2m1!1sPanorama+Pyramids!3m10!1s0x14584589e0226e7d:0x7c02bab36d63ca5c!5m3!1s2025-07-03!4m1!1i2!8m2!3d29.9744568!4d31.1410781!15sChFQYW5vcmFtYSBQeXJhbWlkc1oTIhFwYW5vcmFtYSBweXJhbWlkc5IBBWhvdGVsmgEjQ2haRFNVaE5NRzluUzBWSlEwRm5UVVJuY21GRGRVOUJFQUWqAToQATIfEAEiGwkfAcYDEzmZkBPjZo129jbZxSBjMN_QKhaPjTIVEAIiEXBhbm9yYW1hIHB5cmFtaWRz4AEA-gEFCJMDEEI!16s%2Fg%2F11gdrjg3qy?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          View Details
        </a>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <div className="flex items-center mb-4">
          <Utensils className="w-6 h-6 text-amber-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">Khoufo Restaurant</h3>
        </div>
        <img 
          src="https://www.theworlds50best.com/stories/filestore/png/W50BR25-OTW-Khufu's-header.png" 
          alt="Khoufo Restaurant" 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">
          Located near the Giza pyramids, Khoufo Restaurant offers authentic Egyptian cuisine with a warm atmosphere and traditional dishes.
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Molokhia</span>
            <span className="font-semibold">$10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Grilled Chicken</span>
            <span className="font-semibold">$15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Stuffed Pigeon</span>
            <span className="font-semibold">$18</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">Open: 11:00 AM - 11:00 PM</p>
        <a 
          href="https://www.google.com/maps/place/Khufu's+Restaurant/@29.9783322,31.1193997,17z/data=!3m1!4b1!4m10!3m9!1s0x14584ff8c7822e11:0x3808da3c343895d2!5m3!1s2025-07-03!4m1!1i2!8m2!3d29.9783323!4d31.1242706!16s%2Fg%2F11t82kn5x0?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          View Details
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
            <p className="text-xl text-gray-600">Explore the wonders through images</p>
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
            <p className="text-xl text-gray-600">Best ways to reach the Pyramids of Giza</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">By Air</h3>
              <p className="text-gray-600 mb-4">
                Fly into Cairo International Airport (CAI), then take a taxi or bus to Giza (45-60 minutes).
              </p>
              <p className="text-sm text-gray-500">Distance: 45 km from airport</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Train className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">By Metro</h3>
              <p className="text-gray-600 mb-4">
                Take Line 2 (red line) to Giza Station, then bus 357 or taxi to the pyramids.
              </p>
              <p className="text-sm text-gray-500">Total time: 1-1.5 hours</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">By Car/Taxi</h3>
              <p className="text-gray-600 mb-4">
                Most convenient option. Direct route from Cairo takes 30-45 minutes depending on traffic.
              </p>
              <p className="text-sm text-gray-500">Cost: $10-15 from Cairo</p>
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
                <p className="text-gray-600 mb-4">Al Haram, Nazlet El-Semman, Al Giza Desert, Giza Governorate, Egypt</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">GPS Coordinates</h4>
                <p className="text-gray-600 mb-4">29.9773° N, 31.1325° E</p>
                
                <h4 className="font-semibold text-gray-900 mb-2">Best Time to Visit</h4>
                <p className="text-gray-600">Early morning (8-10 AM) or late afternoon (3-5 PM) to avoid crowds and heat.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What to Bring</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Sun hat and sunglasses</li>
                  <li>• Comfortable walking shoes</li>
                  <li>• Water bottle</li>
                  <li>• Camera</li>
                  <li>• Cash for entrance fees</li>
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

export default PyramidsPage;