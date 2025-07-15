import React from 'react';

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between border-b-2 mb-8">
      {['Information', 'Tour Plan', 'Location', 'Gallery'].map((tab) => (
        <button
          key={tab}
          className={`pb-2 px-4 text-gray-900 font-bold ${
            activeTab === tab ? 'border-b-2 border-[#DF6951]' : ''
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;