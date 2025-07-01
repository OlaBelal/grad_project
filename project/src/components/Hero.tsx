import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (category?: string) => {
    const searchTermValue = searchTerm.trim();
    if (searchTermValue || category) {
      console.log('Searching for:', searchTermValue, 'in', category || selectedCategory);
    }
  };

  return (
    <div className="relative pt-16">
      <div
        className="absolute inset-0 h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            No matter where you're going to, we'll take you there
          </h1>

          {/* Category Buttons (above search bar) */}
          <div className="flex space-x-4 mb-4">
            <SearchButton
              label="Events"
              onClick={() => setSelectedCategory('Events')}
              isActive={selectedCategory === 'Events'}
            />
            <SearchButton
              label="Travels"
              onClick={() => setSelectedCategory('Travels')}
              isActive={selectedCategory === 'Travels'}
            />
            <SearchButton
              label="Companies"
              onClick={() => setSelectedCategory('Companies')}
              isActive={selectedCategory === 'Companies'}
            />
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-md shadow-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-orange-500 text-white px-6 py-3 rounded-r-md hover:bg-orange-600 transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between space-x-8 overflow-x-auto py-4">
          <CategoryButton icon="🏖️" label="Beaches" />
          <CategoryButton icon="🏛️" label="Heritage" />
          <CategoryButton icon="🏔️" label="Mountains" />
          <CategoryButton icon="🌆" label="Cities" />
          <CategoryButton icon="🏺" label="Museums" />
        </div>
      </div>
    </div>
  );
};

const SearchButton = ({ label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`bg-${isActive ? 'orange-500 text-white' : 'gray-200 text-gray-700'} px-6 py-3 rounded-md hover:bg-${
      isActive ? 'orange-600' : 'gray-300'
    } transition-colors`}
  >
    {label}
  </button>
);

const CategoryButton = ({ icon, label }: { icon: string; label: string }) => (
  <button className="flex flex-col items-center space-y-2 text-white hover:text-orange-500 transition-colors">
    <span className="text-2xl">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default Hero;
