import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Beach {
  id: number;
  name: string;
  description: string;
  image: string;
  route: string;
}

const beaches: Beach[] = [
  {
    id: 1,
    name: "Sharm El Sheikh",
    description: "Famous for its crystal-clear waters, vibrant coral reefs, and luxurious resorts along the Red Sea Riviera.",
    image: "https://egyptescapes.com/wp-content/uploads/2019/12/sharm-el-sheihk.jpg",
    route: "/sharm-el-sheikh"
  },
  {
    id: 2,
    name: "Nuweiba",
    description: "A premier beach destination offering world-class diving, water sports, and stunning desert-meets-sea landscapes.",
    image: "https://www.sis.gov.eg/Content/Upload/slider/32016242153637.jpg",
    route: "/nuweiba"
  },
  {
    id: 3,
    name: "Dahab",
    description: "A laid-back bohemian paradise with spectacular diving spots like the Blue Hole and breathtaking mountain views.",
    image: "https://media.cnn.com/api/v1/images/stellar/prod/200611101955-01-egypt-dahab.jpg?q=x_0,y_0,h_900,w_1599,c_fill/w_800",
    route: "#"
  },
  {
    id: 4,
    name: "Marsa Alam",
    description: "Pristine beaches with untouched coral reefs, known for dolphin sightings and eco-friendly resorts.",
    image: "https://www.cairotoptours.com/storage/612/conversions/Marsa%20Alam%20-%20Egypt%20Tours-webp.webp",
    route: "#"
  },
  {
    id: 5,
    name: "North Coast",
    description: "Egypt's summer capital featuring luxurious beach compounds, white sands, and turquoise Mediterranean waters.",
    image: "https://media.cntravellerme.com/photos/66acdb49058e9d5c9892c109/16:9/w_2560%2Cc_limit/Al%2520Alamein%2520Hotel2.JPG",
    route: "#"
  },
  {
    id: 6,
    name: "El Gouna",
    description: "Unique desert beaches with salt lakes and freshwater springs amidst stunning oasis landscapes.",
    image: "https://geotours.b-cdn.net/photos/excursions/Egypt%20El%20Gouna%20Abu%20Tig%20Marina_d47ba_lg.jpg",
    route: "#"
  }
];

const Beaches = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Hero Video Section */}
      <div className="relative w-full h-screen overflow-hidden">
  <iframe
    src="https://www.youtube.com/embed/mu2FnHr2HC4?autoplay=1&mute=1&start=9"
    title="Egyptian Beaches Video"
    allow="autoplay; encrypted-media"
    allowFullScreen
    frameBorder="0"
    className="absolute inset-0 w-full h-full"
  ></iframe>
  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
</div>



      {/* Beaches Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Egyptian Coastal Paradises
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover breathtaking beaches along the Red Sea and Mediterranean
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beaches.map((beach) => (
              <div
                key={beach.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer"
                onClick={() => navigate(beach.route)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={beach.image}
                    alt={beach.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {beach.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {beach.description}
                  </p>
                  
                  <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 group/link">
                    <span className="mr-2">Discover more</span>
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

export default Beaches;