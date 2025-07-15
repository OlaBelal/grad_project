import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, User } from 'lucide-react';
import { authService } from '../services/authService';
import { useFavorites } from '../context/FavoritesContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { favorites } = useFavorites();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, [location]);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsProfileOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-500">
              {t('navbar.travel')}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">

            
            <NavLink to="/tours" active={location.pathname === "/tours"}>
              {t('navbar.travels')}
            </NavLink>
            <NavLink to="/companies" active={location.pathname === "/companies"}>
              {t('navbar.companies')}
            </NavLink>
            <NavLink to="/events" active={location.pathname === "/events"}>
              {t('navbar.events')}
            </NavLink>

            <NavLink to="/about" active={location.pathname === "/about"}>
              {t('navbar.about')}
            </NavLink>

            <NavLink to="/GetInTouch" active={location.pathname === "/GetInTouch"}>
              {t('navbar.getInTouch')}
            </NavLink>
            
            <Link
              to="/favorites"
              className={`flex items-center text-sm font-medium ${
                location.pathname === "/favorites" ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              <Heart size={18} className="mr-1" />
              {t('navbar.favorites')}
              {favorites.length > 0 && (
                <span className="ml-1 bg-orange-500 text-white rounded-full px-2 text-xs font-semibold">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => changeLanguage('en')}
                className={`text-sm ${i18n.language === 'en' ? 'font-bold text-orange-500' : 'text-gray-500'}`}
              >
                EN
              </button>
              <span>|</span>
              <button 
                onClick={() => changeLanguage('ar')}
                className={`text-sm ${i18n.language === 'ar' ? 'font-bold text-orange-500' : 'text-gray-500'}`}
              >
                AR
              </button>
            </div>
            
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 rtl:space-x-reverse focus:outline-none"

                >
                  {currentUser?.avatar ? (
  <img
    src={currentUser.avatar}
    alt="User avatar"
    className="w-8 h-8 rounded-full object-cover"
  />
) : (
  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
    <User size={18} className="text-orange-500" />
  </div>
)}

                  <span className="text-sm font-medium">{currentUser.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      {t('profile')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                    >
                      {t('navbar.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
              >
                {t('login.title')}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" active={location.pathname === "/"}>
              {t('navbar.home')}
            </MobileNavLink>
            <MobileNavLink to="/about" active={location.pathname === "/about"}>
              {t('navbar.about')}
            </MobileNavLink>
            <MobileNavLink to="/GetInTouch" active={location.pathname === "/GetInTouch"}>
              {t('navbar.getInTouch')}
            </MobileNavLink>
            <MobileNavLink to="/travels" active={location.pathname === "/travels"}>
              {t('navbar.travels')}
            </MobileNavLink>
            <MobileNavLink to="/companies" active={location.pathname === "/companies"}>
              {t('navbar.companies')}
            </MobileNavLink>
            <MobileNavLink to="/events" active={location.pathname === "/events"}>
              {t('navbar.events')}
            </MobileNavLink>
            
            <Link
              to="/favorites"
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/favorites" ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
              }`}
            >
              <Heart size={18} className="mr-2" />
              {t('navbar.favorites')}
              {favorites.length > 0 && (
                <span className="ml-1 bg-orange-500 text-white rounded-full px-2 text-xs font-semibold">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <div className="flex space-x-4 px-3 py-2">
              <button 
                onClick={() => changeLanguage('en')}
                className={`text-sm ${i18n.language === 'en' ? 'font-bold text-orange-500' : 'text-gray-500'}`}
              >
                English
              </button>
              <button 
                onClick={() => changeLanguage('ar')}
                className={`text-sm ${i18n.language === 'ar' ? 'font-bold text-orange-500' : 'text-gray-500'}`}
              >
                العربية
              </button>
            </div>
            
            {currentUser ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-base font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
                <Link
                  to="/account"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('profile')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link
                to="/signup"
                className="w-full text-left px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                {t('signUp')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// NavLink component for desktop
const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active?: boolean }) => (
  <Link
    to={to}
    className={`text-sm font-medium ${
      active ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
    }`}
  >
    {children}
  </Link>
);

// MobileNavLink component for mobile
const MobileNavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active?: boolean }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-md text-base font-medium ${
      active ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;