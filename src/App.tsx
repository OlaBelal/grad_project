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
import AccountPage from './pages/AccountPage';
import ContactUsForm from './pages/ContactUsForm';
import GetInTouch from './pages/GetInTouch';
import CompaniesPage from './pages/CompaniesPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import Partners from './components/Partners';
import Travels from './pages/Travels';
import Companies from './pages/Companies';
import Events from './pages/Events';
import { setupWeeklySubmission } from './services/schedulerService';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import { authService } from './services/authService';
import ResetPassword from './pages/ResetPassword';
import AllTours from './components/AllTours';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ChatbotProvider } from './context/ChatbotContext';
import Chatbot from './components/Chatbot';
import PyramidsPage from './ConstantsPages/PyramidsPage';

// SignalR imports
import { HubConnectionBuilder } from '@microsoft/signalr';

const GOOGLE_CLIENT_ID = '822773664134-n09666thqoc67ee4rhkfjetb51ep0vg5.apps.googleusercontent.com';

function App() {
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setupWeeklySubmission(user.id);
    }

    // Initialize SignalR connection
    const initializeSignalR = async () => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl('https://your-backend-url/chatHub')
          .withAutomaticReconnect()
          .build();

        await connection.start();
        console.log('SignalR Connected');

        // Store connection in context or state management
      } catch (err) {
        console.error('SignalR Connection Error:', err);
      }
    };

    initializeSignalR();

    return () => {
      // Cleanup SignalR connection if needed
    };
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
                    <Route path="/account" element={<AccountPage/>} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/contact" element={<ContactUsForm />} />
                    <Route path="/GetInTouch" element={<GetInTouch />} />
                    <Route path="/companies/:companyId" element={<CompaniesPage />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/travels" element={<Travels />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/tours" element={<AllTours />} />
                    <Route path="/pyramids" element={<PyramidsPage />} />

                    <Route element={<ProtectedRoute />}>
                      <Route path="/payment" element={<PaymentPage />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/payment/success" element={<PaymentSuccess />} />
                      <Route path="/payment/failed" element={<PaymentFailed />} />
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