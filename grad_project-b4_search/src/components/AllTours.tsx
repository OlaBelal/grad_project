import { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Heart,
  Search,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { saveInteraction } from "../services/localStorageService";
import { calculateTotal } from "../services/calculationService";
import { UserInteraction } from "../interfaces/userInteraction";
import { authService } from "../services/authService";
import { fetchTours, fetchCategories } from "../services/travelService";
import { Tour, Category } from "../types";
import { API_BASE_URL } from "../services/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faChair,
  faBus,
} from "@fortawesome/free-solid-svg-icons";

const PAGE_SIZE = 5;

const AllTours = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [paginatedTours, setPaginatedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("creationDate-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userId = authService.getUserIdFromToken() || "anonymous";

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [toursData, categoriesData] = await Promise.all([
          fetchTours(),
          fetchCategories(),
        ]);

        setTours(toursData);
        setCategories(categoriesData);
        setFilteredTours(toursData);
        setTotalPages(Math.ceil(toursData.length / PAGE_SIZE));
      } catch (err) {
        setError("Failed to load tours. Please try again later.");
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const filtered = tours.filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.destinationCity.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        (tour.price || 0) >= priceRange[0] &&
        (tour.price || 0) <= priceRange[1];
      const matchesCategory = selectedCategory
        ? tour.categoryId === selectedCategory
        : true;
      return matchesSearch && matchesPrice && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return (a.price || 0) - (b.price || 0);
        case "price-desc":
          return (b.price || 0) - (a.price || 0);
        case "rating-desc":
          return (b.rating || 0) - (a.rating || 0);
        case "creationDate-desc":
          return (
            new Date(b.creationDate || 0).getTime() -
            new Date(a.creationDate || 0).getTime()
          );
        case "startDate-asc":
          return (
            new Date(a.startDate || 0).getTime() -
            new Date(b.startDate || 0).getTime()
          );
        default:
          return 0;
      }
    });

    setFilteredTours(sorted);
    setTotalPages(Math.ceil(sorted.length / PAGE_SIZE));
    setCurrentPage(1);
  }, [tours, searchTerm, priceRange, selectedCategory, sortOption]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    setPaginatedTours(filteredTours.slice(startIndex, endIndex));
  }, [currentPage, filteredTours]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const requireAuth = (action: () => void) => {
    if (!authService.isAuthenticated()) {
      if (
        window.confirm("You need to login first. Do you want to login now?")
      ) {
        navigate("/login", { state: { from: location.pathname } });
      }
      return false;
    }
    action();
    return true;
  };

  // const handleBookNow = (tour: Tour) => {
  //   requireAuth(() => {
  //     const interaction: UserInteraction = {
  //       userId,
  //       id: tour.id.toString(),
  //       type: "travel",
  //       checkout: 1,
  //       favourite: isFavorite(tour.id),
  //       booked: true,
  //       total: tour.price || 0,
  //     };

  //     interaction.total = calculateTotal(interaction);
  //     saveInteraction(interaction);

  //     navigate("/payment", {
  //       state: {
  //         title: tour.title,
  //         price: tour.price,
  //         location: tour.destinationCity,
  //         imageUrl: tour.imageUrls?.[0] || `${API_BASE_URL}/default-tour.jpg`,
  //       },
  //     });
  //   });
  // };
  const handleBookNow = (tour: Tour) => {
    requireAuth(() => {
      navigate(`/book-now?travelId=${tour.id}`, {
        state: {
          travelId: tour.id,
        },
        replace: false, // ensure it's a real push navigation
      });
    });
  };

  const handleFavorite = (tour: Tour) => {
    requireAuth(() => {
      const isCurrentlyFavorite = isFavorite(tour.id);
      toggleFavorite({
        ...tour,
        image: tour.imageUrls?.[0] || `${API_BASE_URL}/default-tour.jpg`,
      });

      const interaction: UserInteraction = {
        userId,
        id: tour.id.toString(),
        type: "travel",
        checkout: 0,
        favourite: !isCurrentlyFavorite,
        booked: false,
        total: 0,
      };

      interaction.total = calculateTotal(interaction);
      saveInteraction(interaction);
    });
  };

  const handleSeeDetails = (tour: Tour) => {
    const interaction: UserInteraction = {
      userId,
      id: tour.id.toString(),
      type: "travel",
      checkout: 0,
      favourite: isFavorite(tour.id),
      booked: false,
      total: 0,
    };

    interaction.total = calculateTotal(interaction);
    saveInteraction(interaction);

    navigate("/travel-with-us", { state: { tour } });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 10000]);
    setSelectedCategory(null);
    setSortOption("creationDate-desc");
  };

  const renderStarRating = (rating?: number) => {
    const stars = [];
    const filledStars = rating ? Math.round(rating) : 0;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={
            i <= filledStars ? "text-yellow-400 fill-current" : "text-gray-300"
          }
        />
      );
    }

    return <div className="flex">{stars}</div>;
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Available Tours
            </h2>
            <p className="text-lg text-gray-600">Loading tours...</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="md:flex animate-pulse">
                  <div className="md:w-1/3 h-40 md:h-40 bg-gray-200"></div>
                  <div className="p-4 md:w-2/3">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-[#DF6951] mb-4 font-yesteryear  ">
            Explore All Tours
          </h1>
          <p className="text-lg text-gray-600 font-volkhov">
            Discover your perfect adventure from our collection of{" "}
            {tours.length} tours
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h3 className="text-lg font-bold mb-4">Filters</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search tours..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: £{priceRange[0]} - £{priceRange[1]}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span>All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span>{category.categoryName}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="creationDate-desc">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="startDate-asc">Departure Date</option>
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          <div className="lg:w-3/4">
            {paginatedTours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  No tours match your search criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Show All Tours
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 mb-6">
                  {paginatedTours.map((tour) => (
                    <div
                      key={tour.id}
                      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3 h-40 md:h-40 relative">
                          <img
                            src={
                              tour.coverImageUrl ||
                              (tour.imageUrls?.length > 0
                                ? tour.imageUrls[0].startsWith("http")
                                  ? tour.imageUrls[0]
                                  : `${API_BASE_URL}/${tour.imageUrls[0]}`
                                : "https://via.placeholder.com/300x200")
                            }
                            alt={tour.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/300x200";
                            }}
                          />
                          <button
                            onClick={() => handleFavorite(tour)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                            aria-label={
                              isFavorite(tour.id)
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                          >
                            <Heart
                              size={20}
                              className={
                                isFavorite(tour.id)
                                  ? "text-red-500 fill-current"
                                  : "text-gray-400 hover:text-red-500"
                              }
                            />
                          </button>
                          <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-orange-500 shadow-sm">
                            £{tour.price || 0}
                          </div>
                        </div>
                        <div className="p-4 md:w-2/3">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-orange-500">
                              {tour.title}
                            </h3>
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                              £{tour.price?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="flex items-center mt-1 mb-2">
                            {renderStarRating(tour.rating)}
                            <span className="ml-2 text-sm text-gray-600">
                              <MapPin size={14} className="inline mr-1" />
                              {tour.destinationCity}
                            </span>
                          </div>
                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {tour.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faCalendarDay}
                                className="text-orange-500 mr-2"
                              />
                              <span>
                                {tour.startDate
                                  ? new Date(
                                      tour.startDate
                                    ).toLocaleDateString()
                                  : "N/A"}{" "}
                                -{" "}
                                {tour.endDate
                                  ? new Date(tour.endDate).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faChair}
                                className="text-orange-500 mr-2"
                              />
                              <span>{tour.availableSeats} seats available</span>
                            </div>
                            {tour.transportationType && (
                              <div className="flex items-center">
                                <FontAwesomeIcon
                                  icon={faBus}
                                  className="text-orange-500 mr-2"
                                />
                                <span>{tour.transportationType}</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <button
                              onClick={() => handleSeeDetails(tour)}
                              className="text-orange-500 hover:text-orange-600 font-medium flex items-center"
                            >
                              View Details{" "}
                              <ChevronRight className="ml-1" size={16} />
                            </button>
                            <button
                              onClick={() => handleBookNow(tour)}
                              className={`${
                                tour.availableSeats > 0
                                  ? "bg-orange-500 hover:bg-orange-600"
                                  : "bg-gray-400 cursor-not-allowed"
                              } text-white px-4 py-2 rounded-lg transition duration-300`}
                              disabled={tour.availableSeats <= 0}
                            >
                              {tour.availableSeats > 0
                                ? "Book Now"
                                : "Sold Out"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-md ${
                            currentPage === pageNum
                              ? "bg-orange-500 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllTours;
