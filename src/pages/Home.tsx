
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import ServicesSection from '../components/Services';
import AIEvents from '../components/AIEvents';
import RomanticDestination from '../components/RomanticDestination';
import PopularDestinations from '../components/PopularDestinations';
import TrendingTours from '../components/TrendingTours';
import Testimonials from '../components/Testimonials';
import DiscountedTours from '../components/DiscountedTours';
import LeavingSoonTours from '../components/LeavingSoonTours';
import NewestTours from '../components/NewestTours';
const Home = () => {
  return (
    <>
      <Hero />
      <Partners />
      <ServicesSection />
      <DiscountedTours/>
      <LeavingSoonTours/>
      <AIEvents />
      <RomanticDestination />
      
      <NewestTours/>
      <PopularDestinations />
      <TrendingTours />
      <Testimonials />
    </>
  );
};

export default Home;