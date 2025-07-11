import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import TravelWithUs from "./pages/TravelWithUs";
import SignUp from "./pages/SignUp";
import "./styles/global.css";
import LogIn from "./pages/LogIn";
import ContactUsForm from "./pages/ContactUsForm";
import GetInTouch from "./pages/GetInTouch";
import CompaniesPage from "./pages/CompaniesPage";
import NewBookingPage from "./pages/NewBookingPage";
import UserBookingsPage from "./pages/UserBookingsPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentStatus from "./pages/PaymentStatus";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";
import Partners from "./components/Partners";
import Travels from "./pages/Travels";
import Companies from "./pages/Companies";
import Events from "./pages/Events";
import { setupWeeklySubmission } from "./services/schedulerService";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { authService } from "./services/authService";
import ResetPassword from "./pages/ResetPassword";
import AllTours from "./components/AllTours";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID =
  "822773664134-n09666thqoc67ee4rhkfjetb51ep0vg5.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setupWeeklySubmission(user.id);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <UserProvider>
        <FavoritesProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-16 pb-[70px]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/travel-with-us" element={<TravelWithUs />} />
                  <Route
                    path="/signup"
                    element={
                      authService.isAuthenticated() ? (
                        <Navigate to="/dashboard" />
                      ) : (
                        <SignUp />
                      )
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      authService.isAuthenticated() ? (
                        <Navigate to="/dashboard" />
                      ) : (
                        <LogIn />
                      )
                    }
                  />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/contactus" element={<ContactUsForm />} />
                  <Route path="/GetInTouch" element={<GetInTouch />} />
                  <Route path="/CompaniesPag" element={<CompaniesPage />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/travels" element={<Travels />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/AllTours" element={<AllTours />} />

                  {/* صفحات محمية */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/payment-status" element={<PaymentStatus />} />
                    <Route path="/book-now" element={<NewBookingPage />} />
                    <Route path="/my-bookings" element={<UserBookingsPage />} />

                    <Route path="/favorites" element={<Favorites />} />
                    <Route
                      path="/companies/:companyId"
                      element={<CompaniesPage />}
                    />
                    <Route
                      path="/payment-success"
                      element={<PaymentSuccess />}
                    />
                    <Route path="/payment-failed" element={<PaymentFailed />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </FavoritesProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
