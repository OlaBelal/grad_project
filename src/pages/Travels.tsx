// import React, { useState, useEffect } from 'react';
// import { Star, MapPin, Clock, CalendarDays, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { fetchTours, fetchCategories } from '../services/travelService';
// import { Tour } from '../types';
// import { UserInteraction } from '../interfaces/userInteraction';
// import { saveInteraction } from '../services/localStorageService';
// import { calculateTotal } from '../services/calculationService';
// import { useFavorites } from '../context/FavoritesContext';
// import { authService } from '../services/authService';

// const Travels = () => {
//   const [tours, setTours] = useState<Tour[]>([]);
//   const [categories, setCategories] = useState<{id: number, categoryName: string}[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [priceRange, setPriceRange] = useState({ min: '', max: '' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
  
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { toggleFavorite, isFavorite } = useFavorites();
//   const userId = authService.getCurrentUser()?.id || 'anonymous';

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         const [categoriesData, toursData] = await Promise.all([
//           fetchCategories(),
//           fetchTours()
//         ]);

//         setCategories(categoriesData);
//         setTours(toursData);
//         setError('');
//       } catch (err) {
//         console.error('Error loading data:', err);
//         setError('Failed to load data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   useEffect(() => {
//     const loadFilteredTours = async () => {
//       try {
//         setLoading(true);
//         const toursData = await fetchTours(selectedCategory || undefined);
//         setTours(toursData);
//         setError('');
//       } catch (err) {
//         console.error('Error loading filtered tours:', err);
//         setError('Failed to load filtered tours. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFilteredTours();
//   }, [selectedCategory]);

//   const filteredTours = tours.filter(tour => {
//     // تصفية حسب البحث
//     if (searchTerm && !tour.title.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return false;
//     }

//     // تصفية حسب نطاق السعر
//     const minPrice = priceRange.min ? Number(priceRange.min) : 0;
//     const maxPrice = priceRange.max ? Number(priceRange.max) : Infinity;
//     if (tour.price < minPrice || tour.price > maxPrice) {
//       return false;
//     }

//     return true;
//   });

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const requireAuth = (action: () => void) => {
//     if (!authService.isAuthenticated()) {
//       if (window.confirm('You need to login first. Do you want to login now?')) {
//         navigate('/login', { state: { from: location.pathname } });
//       }
//       return false;
//     }
//     action();
//     return true;
//   };

//   const handleFavorite = (tour: Tour) => {
//     requireAuth(() => {
//       toggleFavorite(tour);
      
//       const interaction: UserInteraction = {
//         userId,
//         id: tour.id.toString(),
//         type: 'travel',
//         checkout: 0,
//         favourite: isFavorite(tour.id),
//         booked: false,
//         total: 0
//       };
      
//       interaction.total = calculateTotal(interaction);
//       saveInteraction(interaction);
//     });
//   };

//   const handleSeeDetails = (tour: Tour) => {
//     const interaction: UserInteraction = {
//       userId,
//       id: tour.id.toString(),
//       type: 'travel',
//       checkout: 0,
//       favourite: isFavorite(tour.id),
//       booked: false,
//       total: 0
//     };
    
//     interaction.total = calculateTotal(interaction);
//     saveInteraction(interaction);
    
//     navigate('/travel-with-us', { state: { tour } });
//   };

//   const handleBookNow = (tour: Tour) => {
//     requireAuth(() => {
//       const interaction: UserInteraction = {
//         userId,
//         id: tour.id.toString(),
//         type: 'travel',
//         checkout: 1,
//         favourite: isFavorite(tour.id),
//         booked: true,
//         total: tour.price
//       };
      
//       saveInteraction(interaction);
      
//       navigate('/payment', {
//         state: {
//           title: tour.title,
//           price: tour.price,
//           location: tour.destinationCity,
//         },
//       });
//     });
//   };

//   const totalItems = filteredTours.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentTours = filteredTours.slice(indexOfFirstItem, indexOfLastItem);

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const pageButtons = [];
//     const maxVisiblePages = 5;
//     let startPage = Math.max(1, currentPage - 2);
//     let endPage = Math.min(totalPages, currentPage + 2);

//     if (totalPages > maxVisiblePages) {
//       if (currentPage <= 3) {
//         endPage = maxVisiblePages;
//       } else if (currentPage >= totalPages - 2) {
//         startPage = totalPages - maxVisiblePages + 1;
//       }
//     }

//     pageButtons.push(
//       <button
//         key="prev"
//         onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className={`px-3 py-1 mx-1 border rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//       >
//         <ChevronLeft size={16} />
//       </button>
//     );

//     if (startPage > 1) {
//       pageButtons.push(
//         <button
//           key={1}
//           onClick={() => handlePageChange(1)}
//           className={`px-3 py-1 mx-1 border rounded ${1 === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         pageButtons.push(<span key="start-ellipsis" className="px-2">...</span>);
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageButtons.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`px-3 py-1 mx-1 border rounded ${i === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pageButtons.push(<span key="end-ellipsis" className="px-2">...</span>);
//       }
//       pageButtons.push(
//         <button
//           key={totalPages}
//           onClick={() => handlePageChange(totalPages)}
//           className={`px-3 py-1 mx-1 border rounded ${totalPages === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}`}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     pageButtons.push(
//       <button
//         key="next"
//         onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className={`px-3 py-1 mx-1 border rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//       >
//         <ChevronRight size={16} />
//       </button>
//     );

//     return (
//       <div className="flex justify-center mt-8">
//         {pageButtons}
//       </div>
//     );
//   };

//   const formatDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     } catch {
//       return dateString;
//     }
//   };

//   const calculateDuration = (startDate: string, endDate: string) => {
//     try {
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
//       return `${diffDays} days, ${diffDays - 1} nights`;
//     } catch {
//       return '';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8 text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//         <p className="mt-4 text-lg">Loading tours...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8 text-center">
//         <div className="text-red-500 text-lg mb-4">{error}</div>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-1/4">
//           <div className="bg-white rounded-lg shadow p-6 sticky top-4">
//             <h2 className="text-xl font-bold mb-6">Filters</h2>
            
//             <div className="mb-6">
//               <label className="block font-medium mb-2">Search</label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   placeholder="Search tours..."
//                   className="w-full p-2 border rounded-lg pl-4 pr-10"
//                 />
//                 <span className="absolute right-3 top-2.5">🔍</span>
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block font-medium mb-2">Price Range (EGP)</label>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   placeholder="Min"
//                   value={priceRange.min}
//                   onChange={(e) => {
//                     setPriceRange({...priceRange, min: e.target.value});
//                     setCurrentPage(1);
//                   }}
//                   className="w-full p-2 border rounded"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Max"
//                   value={priceRange.max}
//                   onChange={(e) => {
//                     setPriceRange({...priceRange, max: e.target.value});
//                     setCurrentPage(1);
//                   }}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block font-medium mb-2">Categories</label>
//               <div className="space-y-2">
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id="category-all"
//                     name="category"
//                     checked={selectedCategory === null}
//                     onChange={() => {
//                       setSelectedCategory(null);
//                       setCurrentPage(1);
//                     }}
//                     className="mr-2"
//                   />
//                   <label htmlFor="category-all">All Categories</label>
//                 </div>
//                 {categories.map((category) => (
//                   <div key={category.id} className="flex items-center">
//                     <input
//                       type="radio"
//                       id={`category-${category.id}`}
//                       name="category"
//                       checked={selectedCategory === category.id}
//                       onChange={() => {
//                         setSelectedCategory(category.id);
//                         setCurrentPage(1);
//                       }}
//                       className="mr-2"
//                     />
//                     <label htmlFor={`category-${category.id}`}>{category.categoryName}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setPriceRange({ min: '', max: '' });
//                 setSelectedCategory(null);
//                 setCurrentPage(1);
//               }}
//               className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//             >
//               Reset All Filters
//             </button>
//           </div>
//         </div>

//         <div className="lg:w-3/4">
//           {filteredTours.length === 0 ? (
//             <div className="text-center py-12">
//               <h3 className="text-xl font-semibold mb-2">
//                 {tours.length === 0 ? 'No tours available' : 'No matching tours found'}
//               </h3>
//               <p className="text-gray-600">
//                 {tours.length === 0
//                   ? 'There are currently no tours available.'
//                   : 'Try adjusting your search filters.'}
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-6">
//                 {currentTours.map((tour) => (
//                   <div key={tour.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
//                     <div className="flex flex-col md:flex-row">
//                       <div className="md:w-1/3 relative">
//                         <img
//                           src={
//                             tour.coverImageUrl && tour.coverImageUrl.trim() !== ''
//                               ? tour.coverImageUrl
//                               : tour.imageUrls?.[0] || 'https://via.placeholder.com/300x200'
//                           }
//                           alt={tour.title}
//                           className="w-full h-48 object-cover"
//                         />
//                       </div>

//                       <div className="md:w-2/3 p-6 relative">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleFavorite(tour);
//                           }}
//                           className="absolute top-4 right-4 p-2"
//                         >
//                           <Heart
//                             size={28}
//                             className={
//                               isFavorite(tour.id)
//                                 ? 'text-red-500 fill-current'
//                                 : 'text-gray-400 hover:text-red-500'
//                             }
//                           />
//                         </button>

//                         <div className="flex items-baseline justify-between mb-2">
//                           <div className="flex items-center gap-4">
//                             <h3 className="text-xl font-bold">{tour.title}</h3>
//                             <span className="text-orange-500 font-semibold text-lg">
//                               {tour.price.toLocaleString()} EGP
//                             </span>
//                           </div>
                          
//                           {tour.rating && (
//                             <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
//                               <Star className="fill-current mr-1" size={14} />
//                               {tour.rating.toFixed(1)}
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex items-center text-gray-600 mb-3">
//                           <MapPin size={16} className="mr-1" />
//                           <span>{tour.destinationCity}</span>
//                         </div>

//                         <div className="flex items-center text-gray-600 mb-3">
//                           <CalendarDays size={16} className="mr-1" />
//                           <span>
//                             {tour.startDate && tour.endDate
//                               ? `${formatDate(tour.startDate)} - ${formatDate(tour.endDate)}`
//                               : 'Flexible dates'}
//                           </span>
//                         </div>

//                         <div className="flex items-center text-gray-600 mb-4">
//                           <Clock size={16} className="mr-1" />
//                           <span>
//                             {tour.startDate && tour.endDate
//                               ? calculateDuration(tour.startDate, tour.endDate)
//                               : 'Duration varies'}
//                           </span>
//                         </div>

//                         <div className="flex justify-end space-x-4">
//                           <button
//                             className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleSeeDetails(tour);
//                             }}
//                           >
//                             View Details
//                           </button>
//                           <button
//                             className={`px-4 py-2 text-white rounded ${
//                               tour.availableSeats > 0
//                                 ? 'bg-orange-500 hover:bg-orange-600'
//                                 : 'bg-gray-400 cursor-not-allowed'
//                             }`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               if (tour.availableSeats > 0) {
//                                 handleBookNow(tour);
//                               }
//                             }}
//                             disabled={tour.availableSeats <= 0}
//                           >
//                             {tour.availableSeats > 0 ? 'Book Now' : 'Sold Out'}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {renderPagination()}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Travels;