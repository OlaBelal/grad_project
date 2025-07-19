import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface City {
  id: number;
  name: string;
  description: string;
  image: string;
  route: string;
  highlights: string[];
  bestFor: string;
}

const egyptianCities: City[] = [
  {
    id: 1,
    name: "Cairo",
    description: "The vibrant capital of Egypt, where ancient wonders meet modern life, home to the Pyramids of Giza and the Egyptian Museum.",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    route: "/cairo",
    highlights: ["Pyramids of Giza", "Egyptian Museum", "Khan el-Khalili", "Citadel of Saladin"],
    bestFor: "History lovers & cultural experiences"
  },
  {
    id: 2,
    name: "Luxor",
    description: "Often called the world's greatest open-air museum, featuring incredible temples and tombs from ancient Thebes.",
    image: "https://www.egypttoursportal.com/images/2017/11/luxor-the-ancient-city-egypt-tours-portal.jpg",
    route: "/luxor",
    highlights: ["Karnak Temple", "Valley of the Kings", "Luxor Temple", "Hatshepsut Temple"],
    bestFor: "Archaeology enthusiasts"
  },
  {
    id: 3,
    name: "Aswan",
    description: "A picturesque Nile-side city with Nubian culture, granite quarries, and beautiful islands.",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/428431945.jpg?k=659c830e36357a7c97ca20bc48141da106848ee1f735ff4fc3ce8f3502ff34de&o=&hp=1",
    route: "/aswan",
    highlights: ["Philae Temple", "Aswan High Dam", "Nubian Village", "Elephantine Island"],
    bestFor: "Relaxed Nile views & Nubian culture"
  },
  {
    id: 4,
    name: "Alexandria",
    description: "Egypt's Mediterranean jewel with Greco-Roman history, modern cafes, and beautiful seaside promenades.",
    image: "https://www.hurghadareisen.com/wp-content/uploads/2020/02/Alexandria-second-largest-city-in-Egypt-rich-historical.jpg",
    route: "/alexandria",
    highlights: ["Bibliotheca Alexandrina", "Qaitbay Citadel", "Catacombs of Kom El Shoqafa", "Montaza Palace"],
    bestFor: "Mediterranean vibes & history"
  },
  {
    id: 5,
    name: "Sharm El Sheikh",
    description: "Egypt's premier Red Sea resort town, famous for its coral reefs, nightlife, and desert excursions.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/03/8e/75/rixos-premium-seagate.jpg?w=1200&h=-1&s=1",
    route: "/sharm",
    highlights: ["Naama Bay", "Ras Mohammed National Park", "Mount Sinai", "Colored Canyon"],
    bestFor: "Diving & beach vacations"
  },
  {
    id: 6,
    name: "Hurghada",
    description: "Another Red Sea paradise offering world-class diving, water sports, and desert adventures.",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/2a/ab/0f/3c/caption.jpg",
    route: "/hurghada",
    highlights: ["Giftun Islands", "Mahmya Island", "Hurghada Marina", "Desert Safari"],
    bestFor: "Family beach holidays"
  }
];

const Cities = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-50">
      {/* Hero Image Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="https://t4.ftcdn.net/jpg/02/72/61/45/360_F_272614583_1aA0sKnF91rMj4uWZQegqsPc7AY72gEt.jpg"
          alt="Egyptian Cities Landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Egypt's Vibrant Cities
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              From ancient capitals to modern beach resorts
            </p>
          </div>
        </div>
      </div>

      {/* Cities Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Egypt's Must-Visit Cities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the diversity of urban Egypt through its most fascinating destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {egyptianCities.map((city) => (
              <div
                key={city.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer"
                onClick={() => navigate(city.route)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {city.name}
                  </h3>
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-gray-500">Best for: </span>
                    <span className="text-sm text-gray-600">{city.bestFor}</span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {city.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Highlights:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {city.highlights.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300 group/link">
                    <span className="mr-2">Explore city</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cities;