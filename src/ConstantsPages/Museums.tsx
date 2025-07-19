import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Museum {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  route: string;
  highlights: string[];
  bestFor: string;
}

const egyptianMuseums: Museum[] = [
  {
    id: 1,
    name: "The Egyptian Museum",
    location: "Cairo",
    description: "Home to the world's most extensive collection of pharaonic antiquities, including the treasures of Tutankhamun.",
    image: "https://jakadatoursegypt.com/wp-content/uploads/2020/12/the-Egyptian-Museum-Cairo.jpg",
    route: "/egyptian-museum",
    highlights: ["Tutankhamun's golden mask", "Royal Mummies Room", "Narmer Palette", "Ancient Egyptian jewelry collection"],
    bestFor: "Ancient Egyptian history enthusiasts"
  },
  {
    id: 2,
    name: "Grand Egyptian Museum",
    location: "Giza",
    description: "The soon-to-open mega museum near the pyramids, set to be the world's largest archaeological museum.",
    image: "https://cdn.expeditions.com/globalassets/expedition-stories/5-things-you-didnt-know-gem-re-opening/shutterstock_2286414079.jpg?width=1920&height=1080&mode=crop&scale=none&quality=50",
    route: "/grand-egyptian-museum",
    highlights: ["Complete Tutankhamun collection", "Great Hall with Ramses II statue", "Conservation labs", "Panoramic pyramid views"],
    bestFor: "State-of-the-art museum experience"
  },
  {
    id: 3,
    name: "Nubian Museum",
    location: "Aswan",
    description: "A beautiful museum dedicated to preserving Nubian culture and heritage, especially after the Aswan High Dam construction.",
    image: "https://www.youregypttours.com/storage/914/1673526614.jpg",
    route: "/nubian-museum",
    highlights: ["Nubian artifacts", "Traditional house reconstructions", "UNESCO-sponsored exhibits", "Beautiful garden setting"],
    bestFor: "Understanding Nubian history and culture"
  },
  {
    id: 4,
    name: "Alexandria National Museum",
    location: "Alexandria",
    description: "Housed in a restored Italian-style palace, this museum traces Alexandria's history through Pharaonic, Greco-Roman, Coptic and Islamic eras.",
    image: "https://images.memphistours.com/large/1019697401_museum3.jpg",
    route: "/alexandria-museum",
    highlights: ["Underwater archaeology finds", "Greco-Roman artifacts", "Royal jewelry collection", "Islamic era exhibits"],
    bestFor: "Alexandria's multicultural history"
  },
  {
    id: 5,
    name: "Luxor Museum",
    location: "Luxor",
    description: "A beautifully curated selection of artifacts from Luxor's West Bank and Karnak Temple, displayed in a modern setting.",
    image: "https://images.squarespace-cdn.com/content/v1/56c13cc00442627a08632989/1589748843269-75TRXGEE5UBOBUH1BRTE/luxormuseum.jpg",
    route: "/luxor-museum",
    highlights: ["Royal mummies from the cache", "Reconstructed wall from Akhenaten's temple", "Statues from Karnak", "New Kingdom artifacts"],
    bestFor: "Quality over quantity displays"
  },
  {
    id: 6,
    name: "Coptic Museum",
    location: "Cairo",
    description: "Located in Coptic Cairo, this museum houses the world's largest collection of Egyptian Christian artifacts.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTde94gdhYy1vS1TjpbW5eVhLFVxs1QhlFmTi-h4rdQjWVWtEFVmn-lBvsEqeTW2KYu5D8&usqp=CAU",
    route: "/coptic-museum",
    highlights: ["Early Christian textiles", "Ancient manuscripts", "Icons collection", "Architectural elements from churches"],
    bestFor: "Early Christian history in Egypt"
  }
];

const Museums = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-50">
      {/* Hero Image Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/7f/5a/b9.jpg"
          alt="Egyptian Museum Treasures"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Explore Egypt's Magnificent Museums
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              From pharaonic treasures to Coptic art and Nubian heritage
            </p>
          </div>
        </div>
      </div>

      {/* Museums Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Egypt's Premier Museums
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the artifacts that tell Egypt's 7,000-year story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {egyptianMuseums.map((museum) => (
              <div
                key={museum.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer"
                onClick={() => navigate(museum.route)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={museum.image}
                    alt={museum.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                      {museum.name}
                    </h3>
                    <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      {museum.location}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-gray-500">Best for: </span>
                    <span className="text-sm text-gray-600">{museum.bestFor}</span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {museum.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Must-see exhibits:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {museum.highlights.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-300 group/link">
                    <span className="mr-2">Explore museum</span>
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

export default Museums;