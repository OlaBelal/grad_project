import { useState } from 'react';
import { MapPin, Clock, Utensils, Car, Plane, Train, ChevronDown, ChevronUp } from 'lucide-react';

function NuweibaPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the best time to visit Nuweiba?",
      answer: "The ideal time to visit Nuweiba is from October to April when temperatures range between 20-28°C. Summer months (May-September) can reach 35-45°C but offer excellent diving conditions with warmer water temperatures. Winter is perfect for desert excursions and hiking in the surrounding mountains."
    },
    {
      question: "How do I get to Nuweiba from Cairo?",
      answer: "From Cairo, you can take a bus (6-7 hours) with companies like East Delta Bus or SuperJet. Alternatively, you can fly to Sharm El Sheikh (1 hour flight) then drive to Nuweiba (3 hours). The scenic coastal drive from Sharm passes through Dahab and offers stunning Red Sea views."
    },
    {
      question: "What are the must-visit dive sites near Nuweiba?",
      answer: "Top dive sites include: 1) The Islands - famous for its coral gardens, 2) Ras Mamlah - known for its dramatic drop-offs, 3) The Caves - a series of underwater caverns, and 4) The Canyon - a spectacular underwater geological formation. Many sites are accessible directly from shore."
    },
    {
      question: "Are there ATMs and currency exchange in Nuweiba?",
      answer: "Yes, there are several ATMs in Nuweiba city center (near the port area) that accept international cards. Currency exchange offices are available but rates are better in Cairo or Sharm El Sheikh. Most hotels and dive centers accept USD and Euros, but small shops prefer Egyptian pounds."
    },
    {
      question: "What's unique about Nuweiba compared to other Red Sea resorts?",
      answer: "Nuweiba offers a more authentic, laid-back experience compared to developed resorts like Sharm El Sheikh. It's known for its stunning mountain-meets-sea landscapes, Bedouin culture, and pristine beaches without massive hotel developments. The ferry to Jordan makes it unique among Egyptian Red Sea destinations."
    }
  ];

  const galleryImages = [
    {
      src: "https://thumbs.dreamstime.com/b/egypt-11191273.jpg",
      alt: "Nuweiba beach with mountain backdrop"
    },
    {
      src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0b/79/98/coral-reefs.jpg?w=900&h=500&s=1",
      alt: "Colorful coral reef in Nuweiba"
    },
    {
      src: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/8d/d1/2d.jpg",
      alt: "Colored Canyon rock formations"
    },
    {
      src: "https://i.redd.it/vfhbf3ivawy71.jpg",
      alt: "Traditional Bedouin tent in the desert"
    },
    {
      src: "https://cdn.bookaway.com/media/files/66f054bbf1d747bec9e85e40.webp?width=512&height=304&quality=80",
      alt: "Nuweiba Port with ferry to Jordan"
    },
    {
      src: "https://lighthousephotography.gr/wp-content/uploads/2019/02/wadirum-wedding-elopement-jordan-10.jpg",
      alt: "Sunset over Nuweiba mountains"
    }
  ];

  const activities = [
    {
      title: "Desert Safari to Colored Canyon",
      description: "Explore one of Sinai's most spectacular natural wonders with its rainbow-colored sandstone walls and narrow passages.",
      price: "$50-80",
      image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6a/e7/93.jpg"
    },
    {
      title: "Snorkeling at The Islands",
      description: "Discover vibrant coral reefs teeming with marine life just offshore from Nuweiba's beaches.",
      price: "$25-40",
      image: "https://d3rr2gvhjw0wwy.cloudfront.net/uploads/activity_galleries/301209/2000x2000-0-70-c857fccfceec27fbad41c766a369bd86.jpg"
    },
    {
      title: "Bedouin Cultural Experience",
      description: "Spend an evening with local Bedouin tribes, enjoying traditional food, music, and stargazing in the desert.",
      price: "$30-60",
      image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/ea/1c.jpg"
    }
  ];

  const restaurants = [
    {
      name: "El Khan Restaurant",
      description: "Beachfront dining with fresh seafood and Egyptian specialties, known for its grilled fish and mezze platters.",
      rating: "4.5 ★ (200+ reviews)",
      price: "$$",
      image: "https://arabmls.org/wp-content/uploads/2024/07/naguib-mahfouz-cafe-khan-el-khalili-cairo-8-of-10.jpg"
    },
    {
      name: "Habiba Village",
      description: "Authentic Bedouin-style restaurant serving traditional dishes in a relaxed beach setting with nightly bonfires.",
      rating: "4.7 ★ (150+ reviews)",
      price: "$$",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/327996003.jpg?k=a3e0fdc23efddf0a3bd1a859733a4d0333b9ca5c9a647d140c100ff678095580&o=&hp=1"
    },
    {
      name: "Basata Eco Cafe",
      description: "Sustainable dining with organic ingredients, vegetarian options, and fresh juices in an eco-friendly environment.",
      rating: "4.6 ★ (120+ reviews)",
      price: "$$$",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4xgKr7duOZMVLS3YxoxZNNla7SmlTXljWlmG-3FqBsMXHQ3D6Luce53-HBr0c1VlBcc&usqp=CAU"
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
            backgroundImage: `url('https://img.12go.asia/0/fit/1024/0/ce/1/plain/s3://12go-web-static/static/images/upload-media/4337.jpeg')`
          }}
        ></div>
        <div className="relative text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Nuweiba, Egypt
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Sinai's Untouched Coastal Paradise
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-blue-600 bg-opacity-90 px-4 py-2 rounded-full">Diving Haven</span>
            <span className="bg-amber-600 bg-opacity-90 px-4 py-2 rounded-full">Desert Adventures</span>
            <span className="bg-emerald-600 bg-opacity-90 px-4 py-2 rounded-full">Bedouin Culture</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Discover Nuweiba</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Where rugged mountains meet the crystal-clear waters of the Red Sea
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://img.youm7.com/ArticleImgs/2023/8/1/100610-%D9%86%D9%88%D9%8A%D8%A8%D8%B9-(1).png" 
                alt="Nuweiba coastline" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Sinai's Best Kept Secret</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nuweiba (Arabic: نويبع) is a coastal town in the Sinai Peninsula of Egypt, located along the Gulf of Aqaba. Unlike its more famous neighbors Sharm El Sheikh and Dahab, Nuweiba has maintained a tranquil, laid-back atmosphere with its long sandy beaches, palm trees, and stunning mountain backdrop.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">500km²</div>
                  <div className="text-sm text-gray-600">Area</div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">10,000</div>
                  <div className="text-sm text-gray-600">Population</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The town serves as an important port with ferry connections to Aqaba in Jordan. Nuweiba is divided into three main areas: Nuweiba Port (the commercial center), Nuweiba City (with local markets), and Tarabin (the tourist area with beach camps). The local Bedouin population maintains traditional lifestyles while welcoming visitors to experience their culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuweiba Highlights</h2>
            <p className="text-xl text-gray-600">What makes this destination special</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pristine Diving</h3>
              <p className="text-gray-600">
                World-class dive sites with vibrant coral reefs and abundant marine life, without the crowds of more popular resorts.
              </p>
            </div>
            

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stunning Landscapes</h3>
              <p className="text-gray-600">
                Dramatic meeting of desert mountains and turquoise sea, with the spectacular Colored Canyon nearby.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Authentic Culture</h3>
              <p className="text-gray-600">
                Experience genuine Bedouin hospitality and traditions in a more authentic setting than commercialized resorts.
              </p>
            </div>
          </div>
        </div>
      </section>

<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience Nuweiba</h2>
      <p className="text-xl text-gray-600">Discover the hidden beauty of Sinai’s coastal gem</p>
    </div>

    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
  src="https://www.youtube.com/embed/uhrE704zmzY?start=7"
  title="Nuweiba Video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
    </div>
  </div>
</section>


      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Activities</h2>
            <p className="text-xl text-gray-600">Experience the best of Nuweiba</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-blue-600">{activity.price}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section id="dining" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Local Dining</h2>
            <p className="text-xl text-gray-600">Taste authentic Sinai flavors</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {restaurants.map((restaurant, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center mb-4">
                  <Utensils className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-900">{restaurant.name}</h3>
                </div>
                <img 
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 mb-4">
                  {restaurant.description}
                </p>
                <p className="text-sm text-gray-500 mb-2">{restaurant.rating} · {restaurant.price}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Travel Info Section */}
<section id="travel" className="py-24 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-6 sm:px-10">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-extrabold text-gray-900">Travel Information</h2>
      <p className="mt-4 text-lg text-gray-600">Getting to and around Nuweiba</p>
    </div>

    <div className="grid md:grid-cols-2 gap-12">
      {/* How to Reach */}
      <div className="space-y-10">
        <h3 className="text-3xl font-bold text-gray-900">How to Reach Nuweiba</h3>

        <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
          <Plane className="w-7 h-7 text-blue-600 mt-1" />
          <div>
            <h4 className="text-xl font-semibold mb-2">By Air</h4>
            <p className="text-gray-600">
              Fly to Sharm El Sheikh International Airport (SSH), then take a bus or private transfer (3–4 hrs). Some flights arrive directly, others via Cairo.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
          <Car className="w-7 h-7 text-green-600 mt-1" />
          <div>
            <h4 className="text-xl font-semibold mb-2">By Road</h4>
            <p className="text-gray-600">
              From Cairo: 6–7 hr bus via East Delta or SuperJet. From Sharm: 3 hr scenic drive. From Taba: 1.5 hr south along the coast.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-start gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-amber-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <div>
            <h4 className="text-xl font-semibold mb-2">By Ferry</h4>
            <p className="text-gray-600">
              Arab Bridge Maritime ferry from Nuweiba Port to Aqaba, Jordan (1 hr). Check seasonal schedules. Arrive 2 hrs early for customs.
            </p>
          </div>
        </div>
      </div>

      {/* Local Transport */}
      <div className="space-y-10">
        <h3 className="text-3xl font-bold text-gray-900">Local Transportation</h3>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-xl font-semibold mb-4">Getting Around Nuweiba</h4>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 w-7 h-7 rounded-full flex items-center justify-center mr-3 font-bold">1</span>
              <span><strong>Taxis:</strong> Agree price beforehand. 20–100 EGP depending on distance.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 w-7 h-7 rounded-full flex items-center justify-center mr-3 font-bold">2</span>
              <span><strong>Microbuses:</strong> Shared vans for 5–10 EGP between Port, City & Tarabin.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 w-7 h-7 rounded-full flex items-center justify-center mr-3 font-bold">3</span>
              <span><strong>Bicycle Rental:</strong> 50–100 EGP/day at beach camps. Great for the coast.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 w-7 h-7 rounded-full flex items-center justify-center mr-3 font-bold">4</span>
              <span><strong>Walking:</strong> Ideal in Tarabin area—everything’s close along the beach.</span>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
          <h4 className="text-xl font-semibold flex items-center text-yellow-700 mb-3">
            <Clock className="w-5 h-5 mr-2" />
            Important Travel Tip
          </h4>
          <p className="text-gray-700">
            South Sinai has unique visa rules. Many can get a free 15-day Sinai-only visa at Taba or Sharm. Need more time or want to visit Cairo? Get a full Egyptian visa.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuweiba in Pictures</h2>
            <p className="text-xl text-gray-600">Visual journey through this coastal paradise</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 bg-white">
                  <p className="text-sm text-gray-600">{image.alt}</p>
                </div>
              </div>
            ))}
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
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-600" />
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

export default NuweibaPage;