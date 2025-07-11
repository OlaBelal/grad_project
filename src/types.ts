

// // src/types.ts
// // src/types.ts
// export interface Tour {
//   id: number;
//   title: string;
//   name: string;
//   destination: string;
//   location?: string;
//   imageUrls: string;
//   image?: string;
//   rating: number;
//   price: number;
//   companyName: string;
//   companyLogoUrl: string;
//   companyLogo?: string;
//   availableSeats: number;
//   description?: string;
//   departureDate?: string;
//   returnDate?: string;
//   transport?: string;
//   included?: string[];
//   notIncluded?: string[];
//   galleryImages?: { url: string }[];
//   images?: { url: string }[];
//   itinerary?: {
//     day: number;
//     title: string;
//     description: string;
//     activities: string[];
//   }[];
//   tags?: string[];
//   duration?: string;
//   highlights?: string[];
//   amenities?: string[];
//   hotelName?: string;
//   originalPrice?: number;
//   availableUntil?: string;
//   reviewsCount?: number;
//   isLimitedTime?: boolean;
// }

// export interface Review {
//   id: number;
//   userName: string;
//   rating: number;
//   comment: string;
//   date: string;
//   userAvatar?: string;
//   tourId?: number;
// }import tirhalLogo from "./assets/images/tirhalLogo.jpg";
// import tirhalLogo from "./assets/images/tirhalLogo.jpg";
// import tirhalCover from "./assets/images/Tirhalcover.jpg";
// import photo1 from "./assets/images/tirhalasewa.jpg";
// import photo2 from "./assets/images/tirhalasewa2.jpg";
// import photo3 from "./assets/images/tirhalaswan3.jpg";
// import photo4 from "./assets/images/tirhaldahab.jpg";
// import photo5 from "./assets/images/tirhalaswan2.jpg";
// import photo6 from "./assets/images/tirhaldahab3.jpg";
// import photo7 from "./assets/images/tirhaldahab4.jpg";
// import photo8 from "./assets/images/tirhaltravel.jpg";
// import photo9 from "./assets/images/tirhaltravel2.jpg";
// import photo10 from "./assets/images/tirhaltravel3.jpg";
// import photo11 from "./assets/images/tirhaltravel4.jpg";
// import photo12 from "./assets/images/tirhaltravel5.jpg";
export interface Itinerary {
  title: string;
  dayNumber: number;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  activities: string[];
  includesBreakfast: boolean;
  includesLunch: boolean;
  includesDinner: boolean;
  notes: string;
}

export interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  creationDate?: string;
  availableSeats: number;
  departurePoint: string;
  departurePointLat?: number;
  departurePointLng?: number;
  destinationCity: string;
  destinationCityLat?: number;
  destinationCityLng?: number;
  transportationType: string;
  coverImageUrl: string;
  amenities: string[];
  companyId?: number;
  companyName?: string;
  profileImageUrl?: string;
  companyProfileImageUrl?: string;
  imageUrls: string[];
  image?: string;
  tags?: string[];
  rating?: number;
  itineraries?: Itinerary[];
  categoryId?: number;
}




export interface Review {
  id: number;
  name: string; 
  rating: number;
  comment: string;
  date: string;
  avatar?: string;  
}

export interface BookingFormData {
  name: string;
  email: string;
  confirmEmail: string;
  phone: string;
  numberOfAdults: number;
  numberOfChildren: number;
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  coverImage: string;
  profileImage: string;
  rating: number;
  description: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  slogan: string;
  destinations?: string[];
  established?: number;
  verified?: boolean;
  type?: string;
  specialties?: string[];
  workingHours: { day: string; hours: string }[];
  reviews: {
    id: number;
    name: string;
    role: string;
    image: string;
    rating: number;
    text: string;
    date: string;
    avatar: string;
  }[];
  posts: {
    id: number;
    userName: string;
    userProfile: string;
    time: string;
    text: string;
    image: string;
  }[];
  similarCompanies: {
    id: number;
    name: string;
    email: string;
    image: string;
  }[];
  upcomingTravels: {
    id: number;
    location: string;
    date: string;
    daysLeft: number;
    image: string;
  }[];
  photos: string[];
}

// export const companies: Company[] = [
//   {
//     id: 1,
//     name: "Emirates",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
//     coverImage: "https://www.emirates.com/media/english/images/Emirates-A380-Flying-Clouds-1920x700_tcm233-1106661.jpg",
//     profileImage: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
//     rating: 4.8,
//     description: "Emirates connects the world to, and through, our global hub in Dubai. We operate modern, efficient and comfortable aircraft, and our culturally diverse workforce delivers award-winning services to our customers across six continents every day.",
//     destinations: ["Europe", "Asia", "Caribbean"],
//     established: 2005,
//     verified: true,
//     type: "Luxury",
//     specialties: ["Luxury Tours", "Honeymoon Packages", "Private Jets"],
//     email: "contact@emirates.com",
//     phone: "+971 4 708 8888",
//     location: "Dubai, UAE",
//     website: "www.emirates.com",
//     slogan: "Fly Better with Emirates",
//     workingHours: [
//       { day: "Monday", hours: "8:00 AM - 10:00 PM" },
//       { day: "Tuesday", hours: "8:00 AM - 10:00 PM" },
//       { day: "Wednesday", hours: "8:00 AM - 10:00 PM" },
//       { day: "Thursday", hours: "8:00 AM - 10:00 PM" },
//       { day: "Friday", hours: "8:00 AM - 10:00 PM" },
//       { day: "Saturday", hours: "8:00 AM - 10:00 PM" },
//       { day: "Sunday", hours: "8:00 AM - 10:00 PM" },
//     ],
//     reviews: [
//       {
//         id: 1,
//         name: "Ahmed Mohamed",
//         role: "Frequent Flyer",
//         image: "https://randomuser.me/api/portraits/men/1.jpg",
//         rating: 4.9,
//         text: "Emirates provides excellent service and comfortable flights. The entertainment system is top-notch!",
//         date: "2024-03-15",
//         avatar: "https://randomuser.me/api/portraits/men/1.jpg"
//       },
//       {
//         id: 2,
//         name: "Layla Hassan",
//         role: "Business Traveler",
//         image: "https://randomuser.me/api/portraits/women/1.jpg",
//         rating: 4.7,
//         text: "The business class experience is exceptional. The lie-flat seats make long flights much more comfortable.",
//         date: "2024-02-28",
//         avatar: "https://randomuser.me/api/portraits/women/1.jpg"
//       }
//     ],
//     posts: [
//       {
//         id: 1,
//         userName: "Emirates",
//         userProfile: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
//         time: "3 hours ago",
//         text: "Experience luxury in the sky with our new First Class suites! ✈️",
//         image: "https://www.emirates.com/media/english/images/Emirates-A380-First-Class-Private-Suite-1920x700px_tcm233-1106662.jpg"
//       },
//       {
//         id: 2,
//         userName: "Emirates",
//         userProfile: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
//         time: "1 day ago",
//         text: "Our new route to Bali is now operational! Book your tropical getaway today. 🌴",
//         image: "https://www.emirates.com/media/english/images/Emirates-Destination-Bali-1920x700px_tcm233-1106664.jpg"
//       }
//     ],
//     similarCompanies: [
//       {
//         id: 2,
//         name: "Qatar Airways",
//         email: "contact@qatarairways.com",
//         image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Qatar_Airways_Logo.svg"
//       },
//       {
//         id: 5,
//         name: "Etihad Airways",
//         email: "contact@etihad.com",
//         image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Etihad_Airways_logo.svg"
//       }
//     ],
//     upcomingTravels: [
//       {
//         id: 1,
//         location: "Dubai, UAE",
//         date: "2024-05-15",
//         daysLeft: 32,
//         image: "https://www.emirates.com/media/english/images/Emirates-Destination-Dubai-1920x700px_tcm233-1106663.jpg"
//       },
//       {
//         id: 2,
//         location: "Maldives",
//         date: "2024-06-20",
//         daysLeft: 68,
//         image: "https://www.emirates.com/media/english/images/Emirates-Destination-Maldives-1920x700px_tcm233-1106665.jpg"
//       }
//     ],
//     photos: [
//       "https://www.emirates.com/media/english/images/Emirates-A380-First-Class-Private-Suite-1920x700px_tcm233-1106662.jpg",
//       "https://www.emirates.com/media/english/images/Emirates-Business-Class-1920x700px_tcm233-1106666.jpg",
//       "https://www.emirates.com/media/english/images/Emirates-Economy-Class-1920x700px_tcm233-1106667.jpg"
//     ]
//   },
//   {
//     id: 2,
//     name: "Trivago",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Trivago.svg",
//     coverImage: "https://www.trivago.com/static/img/bg/trivago-homepage-background.jpg",
//     profileImage: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Trivago.svg",
//     rating: 4.5,
//     description: "trivago is a global hotel and accommodation search platform. We compare prices from over 700 booking sites to help you find your ideal hotel at the lowest price.",
//     destinations: ["South America", "Africa", "Pacific"],
//     established: 2010,
//     verified: true,
//     type: "Adventure",
//     specialties: ["Hiking", "Safari", "Water Sports"],
//     email: "support@trivago.com",
//     phone: "+1 555 123 4567",
//     location: "Düsseldorf, Germany",
//     website: "www.trivago.com",
//     slogan: "Find your ideal hotel for the best price",
//     workingHours: [
//       { day: "Monday", hours: "9:00 AM - 6:00 PM" },
//       { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
//       { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
//       { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
//       { day: "Friday", hours: "9:00 AM - 6:00 PM" },
//       { day: "Saturday", hours: "CLOSED" },
//       { day: "Sunday", hours: "CLOSED" },
//     ],
//     reviews: [
//       {
//         id: 1,
//         name: "John Smith",
//         role: "Budget Traveler",
//         image: "https://randomuser.me/api/portraits/men/3.jpg",
//         rating: 4.3,
//         text: "Great platform for comparing hotel prices. Saved me 30% on my last booking!",
//         date: "2024-03-10",
//         avatar: "https://randomuser.me/api/portraits/men/3.jpg"
//       },
//       {
//         id: 2,
//         name: "Emma Wilson",
//         role: "Travel Blogger",
//         image: "https://randomuser.me/api/portraits/women/2.jpg",
//         rating: 4.0,
//         text: "The price comparison feature is excellent, but I wish there were more filter options.",
//         date: "2024-02-15",
//         avatar: "https://randomuser.me/api/portraits/women/2.jpg"
//       }
//     ],
//     posts: [
//       {
//         id: 1,
//         userName: "Trivago",
//         userProfile: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Trivago.svg",
//         time: "2 days ago",
//         text: "New feature alert! Now you can compare vacation rentals alongside hotels. 🏡",
//         image: "https://www.trivago.com/static/img/bg/trivago-vacation-rentals.jpg"
//       },
//       {
//         id: 2,
//         userName: "Trivago",
//         userProfile: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Trivago.svg",
//         time: "1 week ago",
//         text: "Top 10 hidden gem hotels in Europe you need to visit this summer! 🌍",
//         image: "https://www.trivago.com/static/img/bg/trivago-europe-hotels.jpg"
//       }
//     ],
//     similarCompanies: [
//       {
//         id: 1,
//         name: "Booking.com",
//         email: "contact@booking.com",
//         image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Booking.com_logo.svg"
//       },
//       {
//         id: 4,
//         name: "Expedia",
//         email: "contact@expedia.com",
//         image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Expedia_2012_logo.svg"
//       }
//     ],
//     upcomingTravels: [
//       {
//         id: 1,
//         location: "Paris, France",
//         date: "2024-07-01",
//         daysLeft: 79,
//         image: "https://www.trivago.com/static/img/bg/trivago-paris-hotels.jpg"
//       },
//       {
//         id: 2,
//         location: "Tokyo, Japan",
//         date: "2024-09-15",
//         daysLeft: 155,
//         image: "https://www.trivago.com/static/img/bg/trivago-tokyo-hotels.jpg"
//       }
//     ],
//     photos: [
//       "https://www.trivago.com/static/img/bg/trivago-hotel-search.jpg",
//       "https://www.trivago.com/static/img/bg/trivago-price-comparison.jpg",
//       "https://www.trivago.com/static/img/bg/trivago-mobile-app.jpg"
//     ]
//   },
//   {
//     id: 3,
//     name: "Airbnb",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
//     coverImage: "https://news.airbnb.com/wp-content/uploads/sites/4/2021/05/Airbnb-Beachfront.jpg",
//     profileImage: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
//     rating: 4.7,
//     description: "Airbnb connects people to unique travel experiences, from apartments and villas to castles and treehouses. Book unique homes and experiences all over the world.",
//     destinations: ["Asia", "Middle East", "Africa"],
//     established: 2008,
//     verified: true,
//     type: "Cultural",
//     specialties: ["Heritage Tours", "Food Tours", "Art Expeditions"],
//     email: "support@airbnb.com",
//     phone: "+1 855-424-7262",
//     location: "San Francisco, USA",
//     website: "www.airbnb.com",
//     slogan: "Belong anywhere",
//     workingHours: [
//       { day: "Monday", hours: "8:00 AM - 9:00 PM" },
//       { day: "Tuesday", hours: "8:00 AM - 9:00 PM" },
//       { day: "Wednesday", hours: "8:00 AM - 9:00 PM" },
//       { day: "Thursday", hours: "8:00 AM - 9:00 PM" },
//       { day: "Friday", hours: "8:00 AM - 6:00 PM" },
//       { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
//       { day: "Sunday", hours: "9:00 AM - 5:00 PM" },
//     ],
//     reviews: [
//       {
//         id: 1,
//         name: "Sarah Johnson",
//         role: "Frequent Traveler",
//         image: "https://randomuser.me/api/portraits/women/3.jpg",
//         rating: 4.8,
//         text: "Airbnb has transformed how I travel. The unique homes and local experiences make every trip special.",
//         date: "2024-02-10",
//         avatar: "https://randomuser.me/api/portraits/women/3.jpg"
//       },
//       {
//         id: 2,
//         name: "Michael Chen",
//         role: "Digital Nomad",
//         image: "https://randomuser.me/api/portraits/men/4.jpg",
//         rating: 4.5,
//         text: "Great platform for long-term stays. The customer support is responsive and helpful when needed.",
//         date: "2024-01-25",
//         avatar: "https://randomuser.me/api/portraits/men/4.jpg"
//       }
//     ],
//     posts: [
//       {
//         id: 1,
//         userName: "Airbnb",
//         userProfile: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
//         time: "2 days ago",
//         text: "Discover unique stays you can't find anywhere else! From treehouses to houseboats, your dream vacation awaits. 🌍",
//         image: "https://news.airbnb.com/wp-content/uploads/sites/4/2021/05/Airbnb-Unique-Stays.jpg"
//       },
//       {
//         id: 2,
//         userName: "Airbnb",
//         userProfile: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
//         time: "1 week ago",
//         text: "New feature alert! Now you can search for pet-friendly homes so your furry friends can join the adventure. 🐶",
//         image: "https://news.airbnb.com/wp-content/uploads/sites/4/2021/05/Airbnb-Pets.jpg"
//       }
//     ],
//     similarCompanies: [
//       {
//         id: 4,
//         name: "VRBO",
//         email: "support@vrbo.com",
//         image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Vrbo_logo.svg"
//       },
//       {
//         id: 5,
//         name: "Booking.com",
//         email: "customer.service@booking.com",
//         image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Booking.com_logo.svg"
//       }
//     ],
//     upcomingTravels: [
//       {
//         id: 1,
//         location: "Bali, Indonesia",
//         date: "2024-07-15",
//         daysLeft: 93,
//         image: "https://news.airbnb.com/wp-content/uploads/sites/4/2021/05/Airbnb-Bali.jpg"
//       },
//       {
//         id: 2,
//         location: "Santorini, Greece",
//         date: "2024-09-01",
//         daysLeft: 141,
//         image: "https://news.airbnb.com/wp-content/uploads/sites/4/2021/05/Airbnb-Santorini.jpg"
//       }
//     ],
//     photos: [
//       "https://news.airbnb.com/wp-content/uploads/sites/4/2021/05/Airbnb-Luxury.jpg",
//       "https://news.airbnb.com/wp-content/uploads/sites/4/2021/05/Airbnb-Cabins.jpg",
//       "https://news.airbnb.com/wp-content/uploads/sites/4/2021/05/Airbnb-Beach.jpg"
//     ]
//   },
//   {
//     id: 4,
//     name: "Tirhal",
//     logo: tirhalLogo,  
//     coverImage: tirhalCover,  
//     profileImage: tirhalLogo,  
//     rating: 4.6,
//     description: "Tirhal is a premier Egyptian travel company specializing in unique cultural experiences, desert adventures, and Nile cruises. We bring you authentic Egyptian hospitality with modern comforts.",
//     email: "contact@tirhal.com",
//     phone: "+2010 98815309",
//     location: "Tanta, Egypt",
//     website: "www.tirhal.com",
//     slogan: " بنسعى اننا نخلي السفر تجربة تحب تكررها، وحابين ان كل الناس تعيش الحياة تِرحال. 🐪",
//     workingHours: [
//       { day: "Monday", hours: "9:00 AM - 11:00 PM" },
//       { day: "Tuesday", hours: "9:00 AM - 11:00 PM" },
//       { day: "Wednesday", hours: "9:00 AM - 11:00 PM" },
//       { day: "Thursday", hours: "9:00 AM - 11:00 PM" },
//       { day: "Friday", hours: "CLOSED" },
//       { day: "Saturday", hours: "9:00 AM - 11:00 PM" },
//       { day: "Sunday", hours: "9:00 AM - 11:00 PM" },
//     ],
//     reviews: [
//       {
//         id: 1,
//         name: "Ahmed Mohamed",
//         role: "Travel Enthusiast",
//         image: "https://randomuser.me/api/portraits/men/5.jpg",
//         rating: 4.9,
//         text: "Tirhal made my trip to Luxor unforgettable! The guides were knowledgeable and the itinerary was perfect.",
//         date: "2024-03-10",
//         avatar: "https://randomuser.me/api/portraits/men/5.jpg"
//       },
//       {
//         id: 2,
//         name: "Nour El-Din",
//         role: "Adventure Seeker",
//         image: "https://randomuser.me/api/portraits/men/6.jpg",
//         rating: 4.8,
//         text: "The White Desert safari was the highlight of my Egypt trip. Tirhal's team was professional and fun!",
//         date: "2024-02-15",
//         avatar: "https://randomuser.me/api/portraits/men/6.jpg"
//       },
//       {
//         id: 3,
//         name: "Ola Belal",
//         role: "Cultural Explorer",
//         image: "https://randomuser.me/api/portraits/women/6.jpg",
//         rating: 4.7,
//         text: "Excellent organization and attention to detail. Learned so much about ancient Egyptian history.",
//         date: "2024-01-20",
//         avatar: "https://randomuser.me/api/portraits/women/6.jpg"
//       }
//     ],
//     posts: [
//       {
//         id: 1,
//         userName: "Tirhal",
//         userProfile: tirhalLogo,
//         time: "3 hours ago",
//         text: "Exploring the beauty of Aswan! 🌅 Don't miss out on our Nile cruise packages. Book now!",
//         image: "https://www.kemet.travel/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-02-at-14.11.21_0a961478.jpg",
//       },
//       {
//         id: 2,
//         userName: "Tirhal",
//         userProfile: tirhalLogo,
//         time: "1 day ago",
//         text: "The White Desert is a must-visit! 🏜️ Check out our latest tour packages for an unforgettable adventure.",
//         image: "https://lp-cms-production.imgix.net/2023-06/shutterstockRF89650903.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75",
//       },
//       {
//         id: 3,
//         userName: "Tirhal",
//         userProfile:tirhalLogo,
//         time: "2 days ago",
//         text: "Sunset in Dahab is magical! 🌄 Join us for a desert safari and experience the beauty of Sinai.",
//         image: "https://www.ootlah.com/wp-content/uploads/2021/06/Dahab.jpg",
//       },
//     ],
//     similarCompanies: [
//       {
//         id: 5,
//         name: "Egypt Tours",
//         email: "info@egypttours.com",
//         image: "https://example.com/egypt-tours-logo.jpg"
//       },
//       {
//         id: 6,
//         name: "Nile Explorers",
//         email: "contact@nileexplorers.com",
//         image: "https://example.com/nile-explorers-logo.jpg"
//       }
//     ],
//     upcomingTravels: [
//       {
//         id: 1,
//         location: "Luxor, Egypt",
//         date: "2024-05-10",
//         daysLeft: 27,
//         image: "https://example.com/tirhal-luxor-tour.jpg"
//       },
//       {
//         id: 2,
//         location: "White Desert, Egypt",
//         date: "2024-06-05",
//         daysLeft: 53,
//         image: "https://example.com/tirhal-white-desert.jpg"
//       },
//       {
//         id: 3,
//         location: "Aswan, Egypt",
//         date: "2024-07-20",
//         daysLeft: 98,
//         image: "https://example.com/tirhal-aswan.jpg"
//       }
//     ],
//     photos: [
//       photo1,  
//       photo2,  
//       photo3,  
//       photo4,  
//       photo5,  
//       photo6,  
//       photo7,  
//       photo8,  
//       photo9, 
//       photo10,
//       photo11,
//       photo12
//     ]
//   },
//   {
//     id: 5,
//     name: "Swiss International Air Lines",
//     logo: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Swiss_International_Air_Lines_Logo_2011.svg",
//     coverImage: "https://www.swiss.com/media/english/images/Swiss-Airplane-Flying-1920x700.jpg",
//     profileImage: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Swiss_International_Air_Lines_Logo_2011.svg",
//     rating: 4.6,
//     description: "Swiss International Air Lines is the flag carrier of Switzerland, operating scheduled services in Europe and to North America, South America, Africa and Asia.",
//     email: "contact@swiss.com",
//     phone: "+41 848 700 700",
//     location: "Basel, Switzerland",
//     website: "www.swiss.com",
//     slogan: "Made of Switzerland",
//     workingHours: [
//       { day: "Monday", hours: "8:00 AM - 8:00 PM" },
//       { day: "Tuesday", hours: "8:00 AM - 8:00 PM" },
//       { day: "Wednesday", hours: "8:00 AM - 8:00 PM" },
//       { day: "Thursday", hours: "8:00 AM - 8:00 PM" },
//       { day: "Friday", hours: "8:00 AM - 6:00 PM" },
//       { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
//       { day: "Sunday", hours: "9:00 AM - 5:00 PM" },
//     ],
//     reviews: [
//       {
//         id: 1,
//         name: "Thomas Müller",
//         role: "Business Traveler",
//         image: "https://randomuser.me/api/portraits/men/7.jpg",
//         rating: 4.5,
//         text: "Reliable service and comfortable seats. The Swiss hospitality is always excellent.",
//         date: "2024-03-05",
//         avatar: "https://randomuser.me/api/portraits/men/7.jpg"
//       }
//     ],
//     posts: [
//       {
//         id: 1,
//         userName: "SWISS",
//         userProfile: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Swiss_International_Air_Lines_Logo_2011.svg",
//         time: "5 days ago",
//         text: "New direct flights to Singapore starting next month! Book your tickets now.",
//         image: "https://www.swiss.com/media/english/images/Swiss-Airplane-Singapore-1920x700.jpg"
//       }
//     ],
//     similarCompanies: [
//       {
//         id: 1,
//         name: "Lufthansa",
//         email: "contact@lufthansa.com",
//         image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Lufthansa_Logo.svg"
//       },
//       {
//         id: 3,
//         name: "Austrian Airlines",
//         email: "contact@austrian.com",
//         image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Austrian_Airlines_Logo.svg"
//       }
//     ],
//     upcomingTravels: [
//       {
//         id: 1,
//         location: "Zurich, Switzerland",
//         date: "2024-05-20",
//         daysLeft: 37,
//         image: "https://www.swiss.com/media/english/images/Swiss-Destination-Zurich-1920x700.jpg"
//       }
//     ],
//     photos: [
//       "https://www.swiss.com/media/english/images/Swiss-Business-Class-1920x700.jpg",
//       "https://www.swiss.com/media/english/images/Swiss-Economy-Class-1920x700.jpg"
//     ]
//   }
// ];




// -----------------------------
// 👇 Interaction Types Section
// -----------------------------
export interface EventInteraction {
  eventId: string | number;
  userCheckOut: boolean;
  addedToWishList: boolean;
  booked: boolean;
  rate?: number;
  timestamp?: string;
}

export interface UserRatings {
  [eventId: string]: number;
}

export interface UserData {
  id: string;
  ratings: UserRatings;
}