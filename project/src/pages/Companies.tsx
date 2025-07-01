import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCompanies, Company } from '../services/api';

const discounts = [
  {
    id: 1,
    title: "Last Minute Deal: Hurghada Resort",
    rating: 4.5,
    reviews: 890,
    price: 2500,
    originalPrice: 5000,
    hotelName: "Hurghada Beach Resort",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "Tomorrow",
    discount: 50,
    isLimitedTime: true
  },
  {
    id: 2,
    title: "Flash Sale: Alexandria Weekend",
    rating: 4.3,
    reviews: 756,
    price: 1800,
    originalPrice: 3000,
    hotelName: "Alexandria Sea View",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "Next 24 hours",
    discount: 40,
    isLimitedTime: true
  },
  {
    id: 3,
    title: "Early Bird: Aswan Cruise",
    rating: 4.7,
    reviews: 1200,
    price: 4000,
    originalPrice: 6000,
    hotelName: "Nile Cruise Deluxe",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    availableUntil: "This week",
    discount: 33,
    isLimitedTime: false
  }
];

const companyTypes = ["All", "Luxury", "Adventure", "Cultural", "Family", "Budget"];
const destinations = ["All", "Europe", "Asia", "Africa", "South America", "Caribbean", "Pacific", "Middle East"];
const specialties = [
  "Luxury Tours",
  "Honeymoon Packages",
  "Private Jets",
  "Hiking",
  "Safari",
  "Water Sports",
  "Heritage Tours",
  "Food Tours",
  "Art Expeditions"
];

const Companies = () => {
  const [currentDiscountIndex, setCurrentDiscountIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 5;
  const navigate = useNavigate();

 // في مكون Companies.tsx
useEffect(() => {
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { items, totalCount } = await getCompanies(currentPage, companiesPerPage);
      
      console.log('Fetched Companies:', {
        currentPage,
        itemsCount: items.length,
        items
      });
      
      setCompanies(items);
      setTotalCompanies(totalCount);
    } catch (err) {
      setError('Failed to fetch companies');
      console.error('Error in fetchCompanies:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchCompanies();
}, [currentPage]); // التأكد من أن currentPage مدرج في dependencies

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextDiscount();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentDiscountIndex]);

  const handleNextDiscount = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentDiscountIndex((prev) => (prev + 1) % discounts.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrevDiscount = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentDiscountIndex((prev) => (prev - 1 + discounts.length) % discounts.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const filteredCompanies = companies.filter(company => {
    if (searchTerm && !company.companyName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedType !== 'All' && company.type !== selectedType) {
      return false;
    }
    if (selectedDestination !== 'All' && !company.destinations?.includes(selectedDestination)) {
      return false;
    }
    if (selectedSpecialties.length > 0 && !selectedSpecialties.some(specialty => 
      company.specialties?.includes(specialty)
    )) {
      return false;
    }
    if (selectedRating && company.rating < selectedRating) {
      return false;
    }
    if (verifiedOnly && !company.verified) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(totalCompanies / companiesPerPage);

  const handleViewCompany = (companyId: number) => {
    navigate(`/companies/${companyId}`);
  };

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedType('All');
    setSelectedDestination('All');
    setSelectedSpecialties([]);
    setSelectedRating(null);
    setVerifiedOnly(false);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageButtons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (totalPages > maxVisiblePages) {
      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }
    }

    if (startPage > 1) {
      pageButtons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 border rounded ${1 === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageButtons.push(<span key="start-ellipsis" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 border rounded ${i === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<span key="end-ellipsis" className="px-2">...</span>);
      }
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 border rounded ${totalPages === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center mt-8 gap-2">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        
        {pageButtons}
        
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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Discounts</h2>
        <div className="relative">
          <div className={`transition-all duration-300 ease-out ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row h-[300px]">
                <div className="md:w-2/5">
                  <div className="relative h-full">
                    <img
                      src={discounts[currentDiscountIndex].image}
                      alt={discounts[currentDiscountIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discounts[currentDiscountIndex].discount}%
                    </div>
                  </div>
                </div>
                <div className="md:w-3/5 p-4 md:p-6 flex flex-col justify-between">
                  <div>
                    {discounts[currentDiscountIndex].isLimitedTime && (
                      <div className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold mb-2">
                        Limited Time
                      </div>
                    )}
                    <h3 className="text-lg font-bold mb-2">{discounts[currentDiscountIndex].title}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            className={index < Math.floor(discounts[currentDiscountIndex].rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">({discounts[currentDiscountIndex].reviews})</span>
                    </div>
                    <p className="text-sm text-blue-500 mb-2">{discounts[currentDiscountIndex].hotelName}</p>
                    <p className="text-sm text-gray-600">Until: {discounts[currentDiscountIndex].availableUntil}</p>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold text-red-600">${discounts[currentDiscountIndex].price}</span>
                      <span className="text-sm line-through text-gray-500">${discounts[currentDiscountIndex].originalPrice}</span>
                    </div>
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                      Book Now
                    </button>
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
            {discounts.map((_, index) => (
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
                  index === currentDiscountIndex ? 'bg-red-500 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Our Partner Companies</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search companies..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Company Type</h3>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {companyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Destination</h3>
                <select
                  value={selectedDestination}
                  onChange={(e) => {
                    setSelectedDestination(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {destinations.map(destination => (
                    <option key={destination} value={destination}>{destination}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Minimum Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      onClick={() => {
                        setSelectedRating(rating === selectedRating ? null : rating);
                        setCurrentPage(1);
                      }}
                      className="flex items-center cursor-pointer"
                    >
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            className={`${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
                              ${rating === selectedRating ? "scale-110" : ""}`}
                          />
                        ))}
                      </div>
                      <span className={`ml-2 ${rating === selectedRating ? "font-semibold" : ""}`}>& Up</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <h3 className="font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {specialties.map(specialty => (
                    <button
                      key={specialty}
                      onClick={() => toggleSpecialty(specialty)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedSpecialties.includes(specialty)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => {
                      setVerifiedOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>Verified Companies Only</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {companies.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700">No companies found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            companies.map((company) => (
              <div key={company.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                    src={company.profileImageUrl || "https://via.placeholder.com/300x200"}
                    alt={company.companyName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 md:w-2/3 flex flex-col">
                  <div className="flex items-center mb-4">
                    <img
                      src={company.profileImageUrl || "https://via.placeholder.com/50"}
                      alt={company.companyName}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-sm"
                    />
                   <div>
  <h3 className="text-xl font-bold">{company.companyName}</h3>
  <div className="flex items-center">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(company.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ))}
    <span className="ml-2 text-sm text-gray-600">({company.ratings?.length || 0})</span>
  </div>
</div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{company.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Destinations</h4>
                      <p className="text-sm">{company.destinations?.slice(0, 3).join(", ") || "Various destinations"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500">Specialties</h4>
                      <p className="text-sm">{company.specialties?.slice(0, 2).join(", ") || "Various specialties"}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleViewCompany(company.id)}
                    className="mt-auto w-full md:w-auto bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View Company
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {renderPagination()}
      </div>
    </div>
  );
};

export default Companies;
