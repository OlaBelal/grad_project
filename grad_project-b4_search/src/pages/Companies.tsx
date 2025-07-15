import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { getCompanies, Company } from "../services/api";
import { fetchDiscountedTours } from "../services/travelService";
import { Tour } from "../types";

const addresses = [
  "All",
  "Cairo",
  "Giza",
  "Hurghada",
  "Sharm El Sheikh",
  "Aswan",
  "Luxor",
  "Tanta",
];

interface UserInteraction {
  id: string;
  type: string;
  checkout: number;
  favourite: boolean;
  booked: boolean;
  total: number;
}

const Companies = () => {
  const [currentDiscountIndex, setCurrentDiscountIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [discountedTours, setDiscountedTours] = useState<Tour[]>([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("All");
  const [sortOption, setSortOption] = useState<string>("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5;

  const navigate = useNavigate();

  const calculateOriginalPrice = (price: number) => {
    return Math.round(price / 0.7);
  };

  const isFavorite = (id: number): boolean => {
    return false;
  };

  const calculateTotal = (interaction: UserInteraction): number => {
    return 0;
  };

  const saveInteraction = (interaction: UserInteraction): void => {
    console.log("Interaction saved:", interaction);
  };

  // const handleBookNow = (tour: Tour) => {
  //   navigate(`/booking/${tour.id}`, {
  //     state: {
  //       tour: tour,
  //       originalPrice: calculateOriginalPrice(tour.price)
  //     }
  //   });
  // };
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

  const handleSeeDetails = (tour: Tour) => {
    const interaction: UserInteraction = {
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

  const handleCompanyClick = (companyId?: number) => {
    if (companyId) {
      navigate(`/companies/${companyId}`);
    }
  };

  const handleViewCompany = (companyId: number) => {
    navigate(`/companies/${companyId}`);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const { items, totalCount, totalPages } = await getCompanies(
          currentPage,
          companiesPerPage,
          sortOption,
          selectedRating || undefined,
          searchTerm,
          verifiedOnly,
          selectedAddress
        );
        setCompanies(items);
        setTotalCompanies(totalCount);
        setTotalPages(totalPages);
      } catch (err) {
        setError("Failed to fetch companies");
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [
    currentPage,
    companiesPerPage,
    sortOption,
    selectedRating,
    searchTerm,
    verifiedOnly,
    selectedAddress,
  ]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoadingDiscounts(true);
        const tours = await fetchDiscountedTours();
        setDiscountedTours(tours);
      } catch (error) {
        console.error("Error fetching discounted tours:", error);
      } finally {
        setLoadingDiscounts(false);
      }
    };

    fetchDiscounts();
  }, []);

  useEffect(() => {
    if (discountedTours.length > 0) {
      const interval = setInterval(() => {
        handleNextDiscount();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentDiscountIndex, discountedTours]);

  const handleNextDiscount = () => {
    if (isAnimating || discountedTours.length === 0) return;
    setIsAnimating(true);
    setCurrentDiscountIndex(
      (previousIndex) => (previousIndex + 1) % discountedTours.length
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrevDiscount = () => {
    if (isAnimating || discountedTours.length === 0) return;
    setIsAnimating(true);
    setCurrentDiscountIndex(
      (previousIndex) =>
        (previousIndex - 1 + discountedTours.length) % discountedTours.length
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const resetFilters = () => {
    setSelectedRating(null);
    setVerifiedOnly(false);
    setSearchTerm("");
    setSelectedAddress("All");
    setSortOption("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center mt-8 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
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
              className={`px-3 py-1 border rounded ${
                pageNum === currentPage
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  if (loading && currentPage === 1) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-[#DF6951] mb-4 font-yesteryear">
          You're in Safe Hands
        </h1>
        <p className="text-lg text-gray-700 font-volkhov">
          Book your next trip with trusted travel companies and travel
          worry-free.
        </p>
      </div>
      {/* Discounts Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Special Discounts
        </h2>
        {loadingDiscounts ? (
          <div className="flex justify-center items-center h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : discountedTours.length > 0 ? (
          <div className="relative">
            <div
              className={`transition-all duration-300 ease-out ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row h-[300px]">
                  <div className="md:w-2/5">
                    <div className="relative h-full">
                      <img
                        src={
                          discountedTours[currentDiscountIndex].imageUrls[0] ||
                          "https://via.placeholder.com/600x400"
                        }
                        alt={discountedTours[currentDiscountIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round(
                          (1 -
                            discountedTours[currentDiscountIndex].price /
                              calculateOriginalPrice(
                                discountedTours[currentDiscountIndex].price
                              )) *
                            100
                        )}
                        %
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-4 md:p-6 flex flex-col justify-between">
                    <div>
                      <div className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold mb-2">
                        Limited Time
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        {discountedTours[currentDiscountIndex].title}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              size={16}
                              className={
                                index <
                                Math.floor(
                                  discountedTours[currentDiscountIndex]
                                    .rating || 0
                                )
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p
                        className="text-sm text-blue-500 mb-2 hover:text-blue-700 hover:underline cursor-pointer"
                        onClick={() =>
                          handleCompanyClick(
                            discountedTours[currentDiscountIndex].companyId
                          )
                        }
                      >
                        {discountedTours[currentDiscountIndex].companyName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Destination:{" "}
                        {discountedTours[currentDiscountIndex].destinationCity}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold text-red-600">
                          ${discountedTours[currentDiscountIndex].price}
                        </span>
                        <span className="text-sm line-through text-gray-500">
                          $
                          {calculateOriginalPrice(
                            discountedTours[currentDiscountIndex].price
                          )}
                        </span>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() =>
                            handleBookNow(discountedTours[currentDiscountIndex])
                          }
                          disabled={
                            discountedTours[currentDiscountIndex]
                              .availableSeats <= 0
                          }
                          className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 text-sm font-semibold ${
                            discountedTours[currentDiscountIndex]
                              .availableSeats > 0
                              ? "bg-orange-500 text-white hover:bg-orange-600"
                              : "bg-gray-400 text-gray-700 cursor-not-allowed"
                          }`}
                        >
                          {discountedTours[currentDiscountIndex]
                            .availableSeats > 0
                            ? "Book Now"
                            : "Sold Out"}
                        </button>
                        <button
                          onClick={() =>
                            handleSeeDetails(
                              discountedTours[currentDiscountIndex]
                            )
                          }
                          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-200 text-sm font-semibold"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePrevDiscount}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-lg hover:bg-white transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextDiscount}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-lg hover:bg-white transition-all"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex justify-center mt-3 space-x-1.5">
              {discountedTours.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating && index !== currentDiscountIndex) {
                      setIsAnimating(true);
                      setCurrentDiscountIndex(index);
                      setTimeout(() => setIsAnimating(false), 300);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentDiscountIndex
                      ? "bg-red-500 w-6"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-600">No current discounts available</p>
          </div>
        )}
      </div>

      {/* Companies Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Filters</h3>
              <button
                onClick={resetFilters}
                className="text-sm text-orange-500 hover:text-orange-700 font-bold"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-6">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search companies..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>

              {/* <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <select
                  value={selectedAddress}
                  onChange={(event) => {
                    setSelectedAddress(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {addresses.map(address => (
                    <option key={address} value={address}>{address}</option>
                  ))}
                </select>
              </div> */}

              {/* <div>
                <h3 className="font-semibold mb-2">Sort By</h3>
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Default</option>
                  <option value="rating-desc">Highest Rating</option>
                  <option value="rating-asc">Lowest Rating</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                </select>
              </div> */}

              <div>
                <h3 className="font-semibold mb-2">Maximum Rating</h3>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div
                      key={rating}
                      onClick={() => {
                        setSelectedRating(
                          rating === selectedRating ? null : rating
                        );
                        setCurrentPage(1);
                      }}
                      className="flex items-center cursor-pointer"
                    >
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            className={`${
                              index < rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            } 
                              ${rating === selectedRating ? "scale-110" : ""}`}
                          />
                        ))}
                      </div>
                      <span
                        className={`ml-2 ${
                          rating === selectedRating ? "font-semibold" : ""
                        }`}
                      >
                        {rating === 1 ? "1 star max" : `${rating} stars max`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(event) => {
                      setVerifiedOnly(event.target.checked);
                      setCurrentPage(1);
                    }}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>Verified Companies Only</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Companies List */}
        <div className="lg:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Our Partner Companies
            </h2>
            <p className="text-gray-600">
              Showing {companies.length} of {totalCompanies} companies
              {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </p>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : companies.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700">
                  No companies found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              companies.map((company) => (
                <div
                  key={company.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow"
                >
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={
                        company.profileImageUrl ||
                        "https://via.placeholder.com/300x200"
                      }
                      alt={company.companyName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 md:w-2/3 flex flex-col">
                    <div className="flex items-center mb-4">
                      <img
                        src={
                          company.profileImageUrl ||
                          "https://via.placeholder.com/50"
                        }
                        alt={company.companyName}
                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-sm"
                      />
                      <div>
                        <h3
                          className="text-xl font-bold hover:text-blue-600 hover:underline cursor-pointer"
                          onClick={() => handleViewCompany(company.id)}
                        >
                          {company.companyName}
                        </h3>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              size={16}
                              className={
                                index < Math.floor(company.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            ({company.ratings?.length || 0})
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {company.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">
                          Address
                        </h4>
                        <p className="text-sm">
                          {company.address || "Address not specified"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">
                          Destinations
                        </h4>
                        <p className="text-sm">
                          {company.destinations?.slice(0, 2).join(", ") ||
                            "Various destinations"}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-auto">
                      <button
                        onClick={() => handleViewCompany(company.id)}
                        className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        View Company
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Companies;
