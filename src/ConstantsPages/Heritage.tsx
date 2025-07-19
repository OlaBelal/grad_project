import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ArchaeologicalSite {
  id: number;
  name: string;
  description: string;
  image: string;
  route: string; // Added route property
}

const archaeologicalSites: ArchaeologicalSite[] = [
  {
    id: 1,
    name: "Pyramids of Giza",
    description: "One of the Seven Wonders of the Ancient World, these monumental pyramids showcase ancient Egyptian engineering brilliance.",
    image: "https://toppng.com/uploads/preview/egyptian-pyramids-11547843159jpseqoon3h.jpg",
    route: "/pyramids"
  },
  {
    id: 2,
    name: "Karnak Temple Complex",
    description: "The largest religious site from antiquity, featuring magnificent temples, obelisks, and the famous Hypostyle Hall.",
    image: "https://egyptra.com/wp-content/uploads/2024/12/pngtree-egypt-luxor-temple-view-image_15653539.jpg",
    route: "/luxor-temple"
  },
  // ... rest of the sites remain unchanged
  {
    id: 3,
    name: "Valley of the Kings",
    description: "Necropolis containing rock-cut tombs of pharaohs and powerful nobles of the New Kingdom period.",
    image: "https://traveladdicts.net/wp-content/uploads/2011/10/Egypt-Hatshepsut-Temple.jpg",
    route: "#"
  },
  {
    id: 4,
    name: "Philae Temple",
    description: "Picturesque island temple dedicated to goddess Isis, showcasing exquisite Ptolemaic architecture.",
    image: "https://www.egiptoexclusivo.com/wp-content/uploads/2023/06/templo-fachada-philae.jpg",
    route: "#"
  },
  {
    id: 5,
    name: "Temple of Hatshepsut",
    description: "Striking mortuary temple with terraced architecture honoring Egypt's most successful female pharaoh.",
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/c0/b5/65.jpg",
    route: "#"
  },
  {
    id: 6,
    name: "Abu Simbel Temples",
    description: "Twin rock temples commemorating Ramses II and Queen Nefertari, relocated during the Aswan Dam project.",
    image: "https://cdn.britannica.com/49/189749-050-EDADDEC0/Great-Temple-of-Ramses-II-temples-larger.jpg",
    route: "#"
  }
];

const Heritage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Video Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/BapSQFJPMM0?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=BapSQFJPMM0"
          title="Siwa Oasis Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          frameBorder="0"
          className="absolute inset-0 w-full h-full"
        ></iframe>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Archaeological Sites Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Ancient Egyptian Monuments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover architectural marvels that have stood for millennia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archaeologicalSites.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer"
                onClick={() => navigate(site.route)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    {site.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {site.description}
                  </p>
                  
                  <div className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-300 group/link">
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

export default Heritage;