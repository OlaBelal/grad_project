import { useEffect } from 'react';
import './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import TravelWithUs from './pages/TravelWithUs';
import SignUp from "./pages/SignUp";
import './styles/global.css';
import LogIn from './pages/LogIn';
import Account from './pages/account';

import ContactUsForm from './pages/ContactUsForm';
import GetInTouch from './pages/GetInTouch';
import CompaniesPage from './pages/CompaniesPage';

import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import Partners from './components/Partners';

import Companies from './pages/Companies';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import { setupWeeklySubmission } from './services/schedulerService';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import { authService } from './services/authService';
import ResetPassword from './pages/ResetPassword';
import AllTours from './components/AllTours';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ChatbotProvider } from './context/ChatbotContext';
import Chatbot from './components/Chatbot';


import Mountains from './ConstantsPages/Mountains';
import About from './ConstantsPages/About';
import Beaches from './ConstantsPages/Beaches';
import Heritage from './ConstantsPages/Heritage';
import PyramidsPage from './ConstantsPages/PyramidsPage';
import LuxorTemplePage from './ConstantsPages/LuxorTemple';
import NuweibaPage from './ConstantsPages/NuweibaPage';
import Cities from './ConstantsPages/Cities';
import SiwaPage from './ConstantsPages/SiwaPage';
import Museums from './ConstantsPages/Museums';
import { extractUserIdFromToken } from './services/authService';


import NewBookingPage from "./pages/NewBookingPage";
import UserBookingsPage from "./pages/UserBookingsPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentStatus from "./pages/PaymentStatus";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

const GOOGLE_CLIENT_ID = '822773664134-n09666thqoc67ee4rhkfjetb51ep0vg5.apps.googleusercontent.com';

function App() {
  useEffect(() => {
  const initializeUserServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = token ? extractUserIdFromToken(token) : null;

      if (userId) {
        console.log('Setting up weekly submission for user:', userId);
        setupWeeklySubmission(userId);
      } else {
        console.log('No authenticated user found - skipping weekly submission setup');
      }
    } catch (error) {
      console.error('Error in user service initialization:', error);
    }
  };

  initializeUserServices();
}, []);
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <UserProvider>
        <FavoritesProvider>
          <ChatbotProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-16 pb-[70px]">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/travel-with-us" element={<TravelWithUs />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/account/reset-password" element={<ResetPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/contact" element={<ContactUsForm />} />
                    <Route path="/GetInTouch" element={<GetInTouch />} />
                    <Route path="/companies/:companyId" element={<CompaniesPage />} />
                    <Route path="/partners" element={<Partners />} />
                    
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetails />} />
                    <Route path="/tours" element={<AllTours />} />

                    <Route path="/nuweiba" element={<NuweibaPage />} />
                    
                    {/* Static pages */}
                    <Route path="/about" element={<About />} />
                    <Route path="/heritage" element={<Heritage />} />
                    <Route path="/pyramids" element={<PyramidsPage />} />
                    <Route path="/luxor-temple" element={<LuxorTemplePage />} />
                    <Route path="/siwa" element={<SiwaPage />} />
                    <Route path="/heritage" element={<Heritage />} />
                    <Route path="/beaches" element={<Beaches />} />
                    <Route path="/mountains" element={<Mountains />} />
                    <Route path="/cities" element={<Cities />} />
                    <Route path="/museums" element={<Museums />} />

                    {/* Fallback route for unmatched paths */}

                    {/* Protected routes */}


                    <Route element={<ProtectedRoute />}>
                  
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/payment-status" element={<PaymentStatus />} />
                    <Route path="/book-now" element={<NewBookingPage />} />
                    <Route path="/my-bookings" element={<UserBookingsPage />} />

                    <Route path="/favorites" element={<Favorites />} />
                    
                    <Route
                      path="/payment-success"
                      element={<PaymentSuccess />}
                    />
                    <Route path="/payment-failed" element={<PaymentFailed />} />

                    </Route>
                  </Routes>
                </main>
                <Footer />
                <Chatbot />
              </div>
            </Router>
          </ChatbotProvider>
        </FavoritesProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;