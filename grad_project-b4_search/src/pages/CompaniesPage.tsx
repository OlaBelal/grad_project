import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { authService } from '../services/authService';

interface SocialMediaLink {
  platform: string;
  url: string;
}

interface PaymentMethod {
  type: string;
  provider: string;
}

interface Travel {
  id: number;
  title: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  availableSeats: number;
  departurePoint: string;
  destinationCity: string;
  transportationType: string;
  coverImageUrl: string;
  imageUrls: string[];
}

interface WorkingHour {
  dayOfWeek: string;
  workingTime: string;
}

interface Company {
  id: number;
  companyName: string;
  address: string;
  email: string;
  phoneNumber: string;
  description: string;
  website: string;
  slogan: string;
  profileImageUrl: string;
  coverImageUrl: string;
  rating: number;
  socialMediaLinks: SocialMediaLink[];
  paymentMethods: PaymentMethod[];
  travels: Travel[];
  workingHours: WorkingHour[];
}

interface Review {
  id: string;
  userId: string;
  companyId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  date: string;
}

interface SimilarCompany {
  id: number;
  name: string;
  image: string;
  email: string;
}

const API_BASE_URL = 'https://journeymate.runasp.net';

const CompaniesPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Photos");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [showWorkingTimesModal, setShowWorkingTimesModal] = useState<boolean>(false);
  const [workingHoursFormatted, setWorkingHoursFormatted] = useState<{day: string, hours: string}[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: '',
  });
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [similarCompanies, setSimilarCompanies] = useState<SimilarCompany[]>([]);

  const getCompanyDetails = async (id: number): Promise<Company> => {
    try {
      const response = await axios.get<Company>(`${API_BASE_URL}/api/Company/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch company details');
    }
  };

  const fetchSimilarCompanies = async (currentCompanyId: number) => {
    try {
      
      const allSimilarCompanies = [
        {
          id: 1,
          name: 'Adventure Travels',
          image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          email: 'contact@adventure-travels.com'
        },
        {
          id: 2,
          name: 'Explore Worldwide',
          image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          email: 'info@explore-worldwide.com'
        },
        {
          id: 3,
          name: 'Global Journeys',
          image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          email: 'support@global-journeys.com'
        },
        {
          id: 4,
          name: 'Travel Experts',
          image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          email: 'info@travel-experts.com'
        }
      ];

      // تصفية الشركات المشابهة لإزالة الشركة الحالية
      const filteredCompanies = allSimilarCompanies.filter(
        company => company.id !== currentCompanyId
      ).slice(0, 3); // أخذ أول 3 شركات فقط

      setSimilarCompanies(filteredCompanies);
    } catch (error) {
      console.error('Error fetching similar companies:', error);
    }
  };

  const loadReviews = () => {
    const allReviews = JSON.parse(localStorage.getItem('companyReviews') || '[]');
    const companyReviews = allReviews.filter((review: Review) => review.companyId === Number(companyId));
    setReviews(companyReviews);
  };

  const saveReview = (review: Review) => {
    const allReviews = JSON.parse(localStorage.getItem('companyReviews') || '[]');
    const updatedReviews = allReviews.filter(
      (existingReview: Review) => !(existingReview.userId === review.userId && existingReview.companyId === review.companyId)
    );
    updatedReviews.push(review);
    localStorage.setItem('companyReviews', JSON.stringify(updatedReviews));
    loadReviews();
  };

  const formatWorkingHours = (workingHours: WorkingHour[]): {day: string, hours: string}[] => {
    if (!workingHours || workingHours.length === 0) return [];
    return workingHours.map(item => ({
      day: item.dayOfWeek,
      hours: item.workingTime || 'CLOSED'
    }));
  };

  const isOpenNow = (): boolean => {
    if (!workingHoursFormatted || workingHoursFormatted.length === 0) return false;
    
    const now = new Date();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayHours = workingHoursFormatted.find(item => item.day === today);
    
    if (!todayHours || !todayHours.hours || todayHours.hours === 'CLOSED') return false;
    if (todayHours.hours === '24/7') return true;
    
    if (typeof todayHours.hours !== 'string' || !todayHours.hours.includes(' - ')) {
      return false;
    }

    try {
      const [openTime, closeTime] = todayHours.hours.split(' - ');
      const currentHour = now.getHours();
      const openingHour = parseInt(openTime.split(':')[0]);
      const closingHour = parseInt(closeTime.split(':')[0]);
      
      return currentHour >= openingHour && currentHour < closingHour;
    } catch (error) {
      console.error('Error parsing working hours:', error);
      return false;
    }
  };

  const renderStarRating = (rating: number): JSX.Element => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="text-yellow-500">
          <i className={`fas ${i <= rating ? 'fa-star' : 'fa-star-o'}`}></i>
        </span>
      );
    }
    return <div className="flex items-center">{stars}</div>;
  };

  const handleTravelClick = (travel: Travel) => {
    navigate('/travel-with-us', { state: { tour: travel } });
  };

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!currentUser) {
      alert('Please login to submit a review');
      return;
    }

    if (!newReview.text.trim() || newReview.rating === 0) {
      alert('Please provide both a rating and review text');
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      userId: currentUser.id,
      companyId: Number(companyId),
      userName: currentUser.name || 'Anonymous',
      userAvatar: currentUser.avatar || 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString()
    };

    saveReview(review);
    setShowReviewForm(false);
    setNewReview({
      rating: 0,
      text: ''
    });
  };

  const renderReviewForm = () => (
    <div className="bg-white p-5 rounded-lg shadow-md mb-5">
      <h3 className="text-xl font-bold mb-4">Write a Review</h3>
      {currentUser ? (
        <form onSubmit={handleReviewSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating *</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setNewReview({...newReview, rating: star})}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Review *</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={4}
              value={newReview.text}
              onChange={(event) => setNewReview({...newReview, text: event.target.value})}
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={() => setShowReviewForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${
                !newReview.text.trim() || newReview.rating === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
              disabled={!newReview.text.trim() || newReview.rating === 0}
            >
              Submit Review
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-4">
          <p className="mb-4">Please login to leave a review</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );

  const renderReviews = () => (
    <div className="bg-white p-5 rounded-lg shadow-md mb-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold">Reviews</h3>
        <button
          onClick={() => setShowReviewForm(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Write a Review
        </button>
      </div>
      
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="border-b pb-4 mb-4 last:border-b-0">
            <div className="flex items-center mb-2">
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h4 className="font-semibold">{review.userName}</h4>
                <div className="flex items-center">
                  {renderStarRating(review.rating)}
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No reviews yet</p>
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Be the first to review
          </button>
        </div>
      )}
    </div>
  );

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      
      case "Photos":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <div className="grid grid-cols-3 gap-4">
              {company?.profileImageUrl && (
                <img src={company.profileImageUrl} alt="Profile" className="w-full h-48 object-cover rounded-lg" />
              )}
              {company?.coverImageUrl && (
                <img src={company.coverImageUrl} alt="Cover" className="w-full h-48 object-cover rounded-lg" />
              )}
              {company?.travels.flatMap(travel => 
                travel.imageUrls.map((url, index) => (
                  <img
                    key={`${travel.id}-${index}`}
                    src={url}
                    alt={`Travel ${travel.id}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))
              )}
            </div>
          </div>
        );
        case "Description":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <p className="text-gray-800">{company?.description}</p>
          </div>
        );
      case "Travels":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <h2 className="text-xl font-bold mb-5">Available Tours</h2>
            {company?.travels && company.travels.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {company.travels.map(travel => (
                  <div key={travel.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img
                          src={travel.coverImageUrl || travel.imageUrls?.[0] || 'https://via.placeholder.com/300x200'}
                          alt={travel.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-orange-500">{travel.title}</h3>
                          <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                            ${travel.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center mt-1 mb-2">
                          {company && renderStarRating(company.rating)}
                          <span className="ml-2 text-sm text-gray-600">{travel.destinationCity}</span>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{travel.description}</p>
                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center">
                            <i className="fas fa-calendar-day text-orange-500 mr-2"></i>
                            <span>
                              {new Date(travel.startDate).toLocaleDateString()} - {new Date(travel.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-chair text-orange-500 mr-2"></i>
                            <span>{travel.availableSeats} seats available</span>
                          </div>
                          {travel.transportationType && (
                            <div className="flex items-center">
                              <i className="fas fa-bus text-orange-500 mr-2"></i>
                              <span>{travel.transportationType}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <button 
                            onClick={() => handleTravelClick(travel)}
                            className="text-orange-500 hover:text-orange-600 font-medium flex items-center"
                          >
                            View Details <ChevronRight className="ml-1" size={16} />
                          </button>
                          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition duration-300">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-10">No tours available at the moment</p>
            )}
          </div>
        );
      case "Reviews":
        return (
          <>
            {showReviewForm ? renderReviewForm() : renderReviews()}
          </>
        );
      default:
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <p className="text-gray-800">{company?.description}</p>
          </div>
        );
    }
  };

  useEffect(() => {
    const loadCompanyData = async (): Promise<void> => {
      try {
        setLoading(true);
        const companyData = await getCompanyDetails(Number(companyId));
        
        setCompany(companyData);
        setWorkingHoursFormatted(formatWorkingHours(companyData.workingHours));
        loadReviews();
        fetchSimilarCompanies(Number(companyId));

      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, [companyId]);

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto p-5">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1400px] mx-auto p-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="max-w-[1400px] mx-auto p-5">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Company not found</h2>
          <button 
            onClick={() => navigate('/companies')}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Companies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative font-sans max-w-[1400px] mx-auto p-5">
      <div className="bg-white rounded-lg shadow-md mb-5 max-w-[1300px] mx-auto">
        <div className="relative">
          <div className="h-72 overflow-hidden rounded-t-lg">
            <img
              src={company.coverImageUrl || "https://via.placeholder.com/1200x400"}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center mt-[-75px] px-10 pb-8 relative">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={company.profileImageUrl || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="ml-5 flex-1">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-orange-500 mt-20">{company.companyName}</h1>
                <div className="ml-3 mt-20">{renderStarRating(company.rating)}</div>
              </div>
              <p className="text-lg text-gray-600">{company.slogan}</p>
            </div>

            <div className="flex items-center space-x-6 mt-20 ml-10 pr-14 pt-2">
              {company.phoneNumber ? (
                <a
                  href={`https://wa.me/${company.phoneNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600"
                >
                  <i className="fab fa-whatsapp text-4xl"></i> 
                </a>
              ) : (
                <span className="text-gray-400" title="Phone not available">
                  <i className="fab fa-whatsapp text-4xl"></i>
                </span>
              )}
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`border-2 ${
                  isFollowing
                    ? "border-orange-500 text-orange-500 bg-white hover:bg-gray-50" 
                    : "border-orange-500 text-white bg-orange-500 hover:bg-orange-600" 
                } px-10 py-2 rounded-lg transition duration-300 text-md`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5">
        <div className="flex gap-5 mt-5">
          <div className="w-[320px] sticky top-5 h-[calc(100vh-40px)] overflow-y-auto no-scrollbar">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-3">Intro</h2>
              
              <p className="text-gray-800 text-center font-semibold text-lg py-3 border-b-2">
                {company.slogan}
              </p>

              <p className="text-black font-semibold flex items-center mt-5 mb-5">
                <i className="fas fa-envelope mr-2 text-orange-500"></i>
                Email: <span className="ml-2">{company.email || "Not available"}</span>
              </p>
              <p className="text-black font-semibold flex items-center mb-5">
                <i className="fab fa-whatsapp mr-2 text-orange-500"></i>
                Phone: <span className="ml-2">{company.phoneNumber || "Not available"}</span>
              </p>
              <p className="text-black font-semibold flex items-center mb-5">
                <i className="fas fa-map-marker-alt mr-2 text-orange-500"></i>
                Address: <span className="ml-2">{company.address || "Not available"}</span>
              </p>
              <p className="text-black font-semibold flex items-center mb-5">
                <i className="fas fa-globe mr-2 text-orange-500"></i>
                Website: {company.website ? (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 underline">
                    {company.website}
                  </a>
                ) : (
                  <span className="ml-2">Not available</span>
                )}
              </p>

              <div
                className="cursor-pointer mb-5"
                onClick={() => setShowWorkingTimesModal(true)}
              >
                <p
                  className={`font-semibold ${
                    isOpenNow() ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isOpenNow() ? "Open now" : "Closed now"}
                </p>
              </div>
              <p
                className="text-black font-semibold mt-3 cursor-pointer hover:text-orange-500"
                onClick={() => setActiveTab("Reviews")}
              >
                {reviews.length > 0 ? `${reviews.length} Reviews` : "No reviews yet"}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between border-b-2 border-gray-200 mb-5">
              
              <button 
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "Photos" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("Photos")}
              >
                Photos
              </button>
              <button 
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "Description" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("Description")}
              >
                Description
              </button>
              <button 
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "Travels" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("Travels")}
              >
                Travels
              </button>
              <button 
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "Reviews" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("Reviews")}
              >
                Reviews
              </button>
            </div>

            {renderTabContent()}
          </div>

          <div className={`w-[280px] h-[calc(100vh-40px)] sticky top-5 ${
            showWorkingTimesModal ? "opacity-50 pointer-events-none" : ""
          }`}>
            <div className="bg-white p-5 rounded-lg shadow-md mb-5">
              <h2 className="text-xl font-bold mb-5 text-orange-500">Upcoming Travels</h2>
              {company.travels && company.travels.length > 0 ? (
                company.travels
                  .filter(travel => {
                    const startDate = new Date(travel.startDate);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return startDate > today;
                  })
                  .slice(0, 3)
                  .map(travel => {
                    const startDate = new Date(travel.startDate);
                    const today = new Date();
                    const daysLeft = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <div 
                        key={travel.id} 
                        className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        onClick={() => handleTravelClick(travel)}
                      >
                        <img
                          src={travel.coverImageUrl || travel.imageUrls?.[0] || 'https://via.placeholder.com/150'}
                          alt={travel.title}
                          className="w-12 h-12 rounded-full mr-3 object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{travel.destinationCity}</h3>
                          <p className="text-sm text-gray-600">
                            {startDate.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-sm text-gray-600">
                          {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="text-gray-500">No upcoming travels scheduled</p>
              )}
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md mb-5">
              <h2 className="text-xl font-bold mb-5 text-orange-500">Similar Companies</h2>
              {similarCompanies.length > 0 ? (
                <div className="space-y-4">
                  {similarCompanies.map(similarCompany => (
                    <div 
                      key={similarCompany.id} 
                      className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                      onClick={() => navigate(`/companies/${similarCompany.id}`)}
                    >
                      <img
                        src={similarCompany.image}
                        alt={similarCompany.name}
                        className="w-12 h-12 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{similarCompany.name}</h3>
                        <p className="text-sm text-gray-600 truncate w-40">{similarCompany.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No similar companies found</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showWorkingTimesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Working Hours</h2>
              <button 
                onClick={() => setShowWorkingTimesModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {workingHoursFormatted.map((day, index) => (
                <div key={index} className="flex justify-between">
                  <p className="text-gray-700">{day.day}</p>
                  <p className="text-gray-700">{day.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;