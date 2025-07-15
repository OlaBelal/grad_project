import { useState } from 'react';
import {  Clock, Utensils, Car, Plane, ChevronDown, ChevronUp } from 'lucide-react';

function SiwaPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the best time to visit Siwa Oasis?",
      answer: "The ideal time to visit Siwa is from October to April when daytime temperatures range between 20-28°C (68-82°F). Winter nights can drop to 5°C (41°F). Summer (May-September) sees extreme heat reaching 45°C (113°F), making outdoor exploration challenging. The annual Siwa Date Festival in October is a particularly vibrant time to visit."
    },
    {
      question: "How do I get to Siwa from Cairo?",
      answer: "There are three main options: 1) Direct buses from Cairo's Turgoman Station (10-12 hours, ~$15), 2) Private car (8-9 hours via Marsa Matruh), or 3) Organized tours. The 560km journey crosses the Western Desert with military checkpoints. Note there are currently no commercial flights to Siwa."
    },
    {
      question: "What cultural customs should I be aware of?",
      answer: "Siwa is a conservative Muslim community. Women should cover shoulders and knees. Public displays of affection are frowned upon. Always ask permission before photographing locals. The Siwi people are Berbers with their own language and traditions - learning basic greetings like 'Salam alikum' (peace be upon you) is appreciated."
    },
    {
      question: "What are the must-see attractions in Siwa?",
      answer: "Top sites include: 1) Temple of the Oracle (visited by Alexander the Great), 2) Shali Fortress ruins, 3) Cleopatra's Spring, 4) Fatnas Island (sunset spot), 5) Great Sand Sea dunes, and 6) Bir Wahed hot springs. Don't miss the salt lakes and local crafts like Siwan embroidery."
    },
    {
      question: "Is Siwa safe for tourists?",
      answer: "Yes, Siwa is generally very safe. The oasis is protected by its remote location and tight-knit community. Standard precautions apply - don't wander alone at night in deserted areas, secure valuables, and follow local advice regarding desert excursions which require experienced guides."
    }
  ];

  const galleryImages = [
    {
      src: "https://www.johnthego.com/wp-content/uploads/2023/12/Small-salt-pools-Siwa.jpg",
      alt: "Aerial view of Siwa Oasis showing palm groves and salt lakes"
    },
    {
      src: "https://www.cairotoptours.com/storage/6521/conversions/21261b9a9be32c71746e554774815407-webp.webp",
      alt: "Cleopatra's Bath natural spring surrounded by palm trees"
    },
    {
      src: "https://www.westerndeserttours.com/wp-content/uploads/Temple-of-the-Oracle-in-Siwa-Oasis-Sights-in-and-around-Siwa-Oasis.jpg",
      alt: "Ancient ruins of the Temple of the Oracle in Siwa"
    },
    {
      src: "https://d3rr2gvhjw0wwy.cloudfront.net/uploads/mandators/41668/cms/562301/940x500-1-50-7ef046f6222a7f5bc9e81c6d880978ba.jpg",
      alt: "Vast dunes of the Great Sand Sea near Siwa"
    },
    {
      src: "https://www.egypttoursportal.com/images/2023/06/Siwan-Oasis-Bazaar-Egypt-Tours-Portal.jpg",
      alt: "Traditional Siwan mud-brick architecture in Shali village"
    },
    {
      src: "https://d3rr2gvhjw0wwy.cloudfront.net/uploads/mandators/56119/cms/560427/940x500-1-50-a97abb638ffb859e3288c1b54bee4151.jpg",
      alt: "Spectacular sunset over Siwa's salt lakes at Fatnas Island"
    }
  ];
const activities = [
  {
    title: "Great Sand Sea Safari",
    description: "Embark on a 4x4 journey across towering dunes. Enjoy sandboarding and visits to hot springs like Bir Wahed.",
    price: "$80-120",
    image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=450,height=450,dpr=2/tour_img/c456ea2f5134841443b690de16ca9c633907e6c293a448aff3a48e6ea386c50f.jpg",
    bookingLink: "https://www.viator.com/Siwa-tours/Desert-Safaris/d23468-g11"
  },
  {
    title: "Ancient Ruins Tour",
    description: "Explore the Oracle Temple, Mountain of the Dead, and Shali Fortress with a local guide.",
    price: "$40-70",
    image: "https://matrouh.travel/wp-content/uploads/2024/10/Siwa-Oasis-Tours.webp",
    bookingLink: "https://www.getyourguide.com/siwa-l1519/historical-tours-tc3/"
  },
  {
    title: "Salt Lakes & Cleopatra's Spring",
    description: "Swim in the natural salt pools and enjoy a relaxing soak in Cleopatra’s Bath. Ideal for relaxation and therapy.",
    price: "$30-50",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/4e/93/6c/caption.jpg?w=300&h=300&s=1",
    bookingLink: "https://www.tripadvisor.com/AttractionProductReview-g297547-d11483210"
  }
];

  const restaurants = [
    {
      name: "Abdu's Restaurant",
      description: "Authentic Siwan cuisine in a rooftop garden setting. Famous for their stuffed pigeon, lamb tagine, and fresh date desserts. Vegetarian options available.",
      rating: "4.7 ★ (350+ reviews)",
      price: "$$",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Syojh3dF41bQLaJTiC-88EklzR1KYnWKxTdqTNo-d69zOnphDqBHyVWLyQSv_ZSF4u4&usqp=CAU",
      link: "https://www.tripadvisor.com/Restaurant_Review-g297547-d7397566-Reviews-Abdu_Restaurant-Siwa_Siwa_Oasis_Matrouh_Governorate.html"
    },
    {
      name: "Alexander Restaurant",
      description: "Cozy eatery near Cleopatra's Spring serving Egyptian and international dishes. Try their fresh juices and Siwan bread baked in clay ovens.",
      rating: "4.5 ★ (280+ reviews)",
      price: "$",
      image: "https://d3rr2gvhjw0wwy.cloudfront.net/uploads/activity_galleries/304253/2000x2000-0-70-26080a670c4df7af6dabfbdfca33cd45.jpg",
      link: "https://www.tripadvisor.com/Restaurant_Review-g297547-d1054886-Reviews-Alexander_Restaurant-Siwa_Siwa_Oasis_Matrouh_Governorate.html"
    },
    {
      name: "Taziry Ecolodge",
      description: "Farm-to-table dining using organic ingredients from their gardens. Set menu features traditional Berber dishes with modern twists.",
      rating: "4.8 ★ (190+ reviews)",
      price: "$$$",
      image: "https://www.taziry.com/wp-content/uploads/2017/11/5E3A7864.jpg",
      link: "https://www.tripadvisor.com/Restaurant_Review-g297547-d7397569-Reviews-Taziry_Ecolodge-Siwa_Siwa_Oasis_Matrouh_Governorate.html"
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
            backgroundImage: `url('https://www.egypttoursportal.com/images/2019/09/Siwa-Oasis-Egypt-Tours-Portal.jpg')`
          }}
        ></div>
        <div className="relative text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Siwa Oasis, Egypt
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Ancient Berber Kingdom in the Western Desert
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-amber-600 bg-opacity-90 px-4 py-2 rounded-full">Desert Adventures</span>
            <span className="bg-blue-600 bg-opacity-90 px-4 py-2 rounded-full">Historic Ruins</span>
            <span className="bg-emerald-600 bg-opacity-90 px-4 py-2 rounded-full">Salt Lakes</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Discover Siwa Oasis</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Egypt's most remote and culturally unique destination
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://lp-cms-production.imgix.net/2023-05/iStock-177135791.jpg?fit=crop&ar=1%3A1&w=1200&auto=format&q=75" 
                alt="Aerial view of Siwa Oasis" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">The Western Desert's Hidden Gem</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Located 560km southwest of Cairo near the Libyan border, Siwa Oasis is one of Egypt's most isolated settlements. Inhabited since at least 10,000 BCE, it was known in antiquity for its Oracle of Amun, consulted by Alexander the Great in 331 BCE. The indigenous Siwi people are ethnically Berber and maintain their distinct language and traditions.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-amber-600">80km</div>
                  <div className="text-sm text-gray-600">From Libyan border</div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-amber-600">300,000</div>
                  <div className="text-sm text-gray-600">Date palms</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The oasis produces renowned dates and olives, with agriculture sustained by 200+ freshwater springs. Siwa's unique kershef architecture (salt-mud bricks) creates a distinctive landscape. The ruins of ancient temples blend with traditional villages among thousands of palm trees, surrounded by the vast Great Sand Sea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Siwa Oasis</h2>
      <p className="text-xl text-gray-600">A visual journey through Egypt's most mystical desert sanctuary</p>
    </div>
    
    <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl">
      <iframe 
        src="https://www.youtube.com/embed/k1nfk9KeJlU" 
        title="Siwa Oasis Documentary" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        className="w-full h-[500px]"
      ></iframe>
    </div>
  </div>
</section>


      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Experiences</h2>
            <p className="text-xl text-gray-600">Unforgettable activities in the oasis</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-amber-600">{activity.price}</span>
                    <a 
                      href={activity.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Book Now
                    </a>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Local Cuisine</h2>
            <p className="text-xl text-gray-600">Taste authentic Siwan flavors</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {restaurants.map((restaurant, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center mb-4">
                  <Utensils className="w-6 h-6 text-amber-600 mr-2" />
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
                <a 
                  href={restaurant.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Info Section */}
      <section id="travel" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Travel Essentials</h2>
            <p className="text-xl text-gray-600">Practical information for your journey</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Getting There</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Car className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">By Road</h4>
                    <p className="text-gray-600 mb-2">
                      <strong>From Cairo:</strong> 8-10 hour drive (560km) via Marsa Matruh. Private car recommended for flexibility. Military convoys sometimes required.
                    </p>
                    <p className="text-gray-600">
                      <strong>Bus Services:</strong> West Delta Bus Company operates daily buses from Cairo's Turgoman Station (LE250-300, ~$15).
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Plane className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">By Air</h4>
                    <p className="text-gray-600">
                      Marsa Matruh Airport (MUH) occasionally has flights from Cairo (1 hour). From there, it's a 3-hour drive to Siwa. Check EgyptAir for current schedules.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Organized Tours</h4>
                    <p className="text-gray-600">
                      Many operators offer 3-5 day tours from Cairo including transport, accommodation and guided activities. Prices start around $300 per person.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Local Transportation</h3>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Getting Around Siwa</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <span><strong>Bicycles:</strong> The most popular way to explore. Rent from hotels for 50-100 EGP/day (~$3-6).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <span><strong>Donkey Carts:</strong> Traditional transport for short distances (20-50 EGP per ride).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <span><strong>4WD Vehicles:</strong> Essential for desert excursions. Arrange through hotels.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-100 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                    <span><strong>Walking:</strong> The town center is compact and easily walkable.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 text-amber-600 mr-2" />
                  Travel Tips
                </h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Bring sufficient cash - ATMs are limited</li>
                  <li>• Pack warm clothing for cold desert nights</li>
                  <li>• Respect local customs - dress modestly</li>
                  <li>• Book desert tours only with licensed guides</li>
                  <li>• Carry passport for military checkpoints</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Siwa Through the Lens</h2>
            <p className="text-xl text-gray-600">Capturing the essence of the oasis</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Visitor Questions</h2>
            <p className="text-xl text-gray-600">Answers to common queries about Siwa</p>
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

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Siwa Adventure?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience Egypt's most unique desert oasis with ancient ruins, therapeutic springs, and breathtaking landscapes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.booking.com/searchresults.en-gb.html?dest_id=-290029&dest_type=city" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Book Accommodation
            </a>
            <a 
              href="https://www.viator.com/Siwa/d23468-ttd" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-amber-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Explore Tours
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SiwaPage;