import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

interface SocialMediaLink {
  platform: string;
  url: string;
}

interface PaymentMethod {
  type: string;
  provider: string;
}

interface Rating {
  userId: string;
  companyId: number;
  rating: number;
  message: string;
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
  ratings: Rating[];
  travels: Travel[];
  workingHours: WorkingHour[];
}

interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

interface Post {
  id: number;
  userName: string;
  userProfile: string;
  time: string;
  text: string;
  image?: string;
}

interface SimilarCompany {
  id: number;
  name: string;
  image: string;
  email: string;
}

interface UpcomingTravel {
  id: number;
  location: string;
  image: string;
  date: string;
  daysLeft: number;
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
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [showWorkingTimesModal, setShowWorkingTimesModal] = useState<boolean>(false);
  const [newReview, setNewReview] = useState({
    name: "",
    text: "",
    rating: 0,
    avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [similarCompanies, setSimilarCompanies] = useState<SimilarCompany[]>([]);
  const [upcomingTravels, setUpcomingTravels] = useState<UpcomingTravel[]>([]);
  const [workingHoursFormatted, setWorkingHoursFormatted] = useState<{day: string, hours: string}[]>([]);

  const getCompanyDetails = async (id: number): Promise<Company> => {
    try {
      const response = await axios.get<Company>(`${API_BASE_URL}/api/Company/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch company details');
    }
  };

  const submitReviewToAPI = async (companyId: number, reviewData: {
    userId: string;
    companyId: number;
    rating: number;
    message: string;
  }): Promise<Rating> => {
    try {
      const response = await axios.post<Rating>(
        `${API_BASE_URL}/api/Company/${companyId}/ratings`,
        reviewData
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit review');
    }
  };

  const calculateDaysLeft = (dateString: string): number => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const differenceInTime = targetDate.getTime() - today.getTime();
    return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  };

  const formatWorkingHours = (workingHours: WorkingHour[]): {day: string, hours: string}[] => {
    return workingHours.map(item => ({
      day: item.dayOfWeek,
      hours: item.workingTime
    }));
  };

  const isOpenNow = (): boolean => {
    if (workingHoursFormatted.length === 0) return false;
    
    const now = new Date();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayHours = workingHoursFormatted.find(item => item.day === today);
    
    if (!todayHours || todayHours.hours === 'CLOSED') return false;
    if (todayHours.hours === '24/7') return true;
    
    const [openTime, closeTime] = todayHours.hours.split(' - ');
    const currentHour = now.getHours();
    const openingHour = parseInt(openTime.split(':')[0]);
    const closingHour = parseInt(closeTime.split(':')[0]);
    
    return currentHour >= openingHour && currentHour < closingHour;
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

  const handleReviewSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    
    if (!company) return;

    try {
      const reviewData = {
        userId: 'current-user-id',
        companyId: company.id,
        rating: newReview.rating,
        message: newReview.text
      };

      const submittedReview = await submitReviewToAPI(company.id, reviewData);
      
      const formattedReview: Review = {
        id: parseInt(submittedReview.userId),
        name: newReview.name,
        role: 'Customer',
        image: newReview.avatar,
        rating: submittedReview.rating,
        text: submittedReview.message,
        date: new Date().toLocaleDateString(),
        avatar: newReview.avatar
      };

      setReviews([formattedReview, ...reviews]);
      setNewReview({
        name: "",
        text: "",
        rating: 0,
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
      });
      setShowReviewForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleRatingSelection = (selectedRating: number): void => {
    setNewReview(prev => ({ ...prev, rating: selectedRating }));
  };

  const handleTravelClick = (travel: Travel) => {
    navigate('/travel-with-us', { state: { tour: travel } });
  };

  const handleSimilarCompanyClick = (companyId: number) => {
    navigate(`/companies/${companyId}`);
  };

  useEffect(() => {
    const loadCompanyData = async (): Promise<void> => {
      try {
        setLoading(true);
        const companyData = await getCompanyDetails(Number(companyId));
        
        setCompany(companyData);
        setWorkingHoursFormatted(formatWorkingHours(companyData.workingHours));
        
        const formattedReviews = companyData.ratings.map(rating => ({
          id: parseInt(rating.userId),
          name: `User ${rating.userId.substring(0, 5)}`,
          role: "Customer",
          image: "https://randomuser.me/api/portraits/lego/1.jpg",
          rating: rating.rating,
          text: rating.message || 'No review text',
          date: new Date().toLocaleDateString(),
          avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
        }));
        setReviews(formattedReviews);

        const upcoming = companyData.travels
          .filter(travel => calculateDaysLeft(travel.startDate) > 0)
          .map(travel => ({
            id: travel.id,
            location: travel.destinationCity,
            image: travel.coverImageUrl || travel.imageUrls?.[0] || '',
            date: travel.startDate,
            daysLeft: calculateDaysLeft(travel.startDate)
          }));
        setUpcomingTravels(upcoming);

        // Sample data for posts
        setPosts([{
          id: 1,
          userName: 'Company Admin',
          userProfile: 'https://randomuser.me/api/portraits/lego/1.jpg',
          time: new Date().toISOString(),
          text: 'Welcome to our company page!',
          image: 'https://via.placeholder.com/600x400'
        }]);

        // Sample similar companies (3 companies)
        setSimilarCompanies([
          {
            id: 1,
            name: 'Adventure Travel Co.',
            image: 'https://images.unsplash.com/photo-1582719471386-8b63b3d8d6b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            email: 'adventure@example.com'
          },
          {
            id: 2,
            name: 'Explore Egypt Tours',
            image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1368&q=80',
            email: 'explore@example.com'
          },
          {
            id: 3,
            name: 'Nile Cruises',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            email: 'nile@example.com'
          }
        ]);

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

  const renderTabContent = (): JSX.Element => {
    switch (activeTab) {
      case "Posts":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className="mb-6">
                  <div className="flex items-center mb-3">
                    <img src={post.userProfile} alt={post.userName} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <h3 className="font-semibold">{post.userName}</h3>
                      <p className="text-sm text-gray-600">{new Date(post.time).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-3">{post.text}</p>
                  {post.image && <img src={post.image} alt="Post" className="w-full h-64 object-cover rounded-lg" />}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">No posts available</p>
            )}
          </div>
        );
      case "Description":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <p className="text-gray-800">{company.description}</p>
          </div>
        );
      case "Photos":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <div className="grid grid-cols-3 gap-4">
              {company.profileImageUrl && (
                <img src={company.profileImageUrl} alt="Profile" className="w-full h-48 object-cover rounded-lg" />
              )}
              {company.coverImageUrl && (
                <img src={company.coverImageUrl} alt="Cover" className="w-full h-48 object-cover rounded-lg" />
              )}
              {company.travels.flatMap(travel => 
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
      case "Travels":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <h2 className="text-xl font-bold mb-5">Available Tours</h2>
            {company.travels.length > 0 ? (
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
                          {renderStarRating(company.rating)}
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
      case "Review":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Reviews ({reviews.length})</h2>
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Add Review
              </button>
            </div>

            {showReviewForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
                      <button 
                        onClick={() => setShowReviewForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Your Name</label>
                        <input
                          type="text"
                          value={newReview.name}
                          onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Your Rating</label>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingSelection(star)}
                              className="text-2xl mr-2 focus:outline-none"
                            >
                              {star <= newReview.rating ? (
                                <i className="fas fa-star text-yellow-500"></i>
                              ) : (
                                <i className="far fa-star text-yellow-500"></i>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Your Review</label>
                        <textarea
                          value={newReview.text}
                          onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          rows={4}
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition duration-300"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {reviews.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center mb-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-gray-600">{review.role}</p>
                      <div className="flex items-center">
                        {renderStarRating(review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800">{review.text}</p>
                  <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                </div>
              ))
            )}
          </div>
        );
      default:
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <p className="text-gray-800">{company.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="font-sans max-w-[1400px] mx-auto p-5">
      <div className="bg-white rounded-lg shadow-md mb-5 max-w-[1300px] mx-auto ">
        <div className="relative">
          <div className="h-72 overflow-hidden rounded-t-lg">
            <img
              src={company.coverImageUrl || "https://via.placeholder.com/1200x400"}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center mt-[-75px] px-10 pb-8 z-10 relative">
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
          {/* Left Sidebar - Widened to 300px */}
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

              {/* Open/Closed Now */}
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

              {/* Working Hours Modal */}
              {showWorkingTimesModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
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

              <p
                className="text-black font-semibold mt-3 cursor-pointer hover:text-orange-500"
                onClick={() => setActiveTab("Review")}
              >
                {reviews.length > 0 ? `${reviews.length} Reviews` : "No reviews yet"}
              </p>
            </div>

            
          </div>

          {/* Main Content */}
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
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "Review" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("Review")}
              >
                Review
              </button>
            </div>

            {renderTabContent()}
          </div>

          {/* Right Sidebar */}
          <div className="w-[280px] sticky top-5 h-[calc(100vh-40px)]">
            <div className="bg-white p-5 rounded-lg shadow-md mb-5">
              <h2 className="text-xl font-bold mb-5 text-orange-500">Upcoming Travels</h2>
              {upcomingTravels.length > 0 ? (
                upcomingTravels.map(travel => (
                  <div 
                    key={travel.id} 
                    className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => handleTravelClick(company.travels.find(t => t.id === travel.id)!)}
                  >
                    <img
                      src={travel.image}
                      alt={travel.location}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{travel.location}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(travel.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {travel.daysLeft} days left
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No upcoming travels scheduled</p>
              )}
            </div>
            {/* Similar Companies Section */}
            <div className="bg-white p-5 rounded-lg shadow-md mt-5">
              <h2 className="text-xl font-bold mb-5 text-orange-500">Similar Companies</h2>
              {similarCompanies.map(company => (
                <div 
                  key={company.id} 
                  className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  onClick={() => handleSimilarCompanyClick(company.id)}
                >
                  <img
                    src={company.image}
                    alt={company.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-sm text-gray-600">{company.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
