import React from 'react';

interface Tour {
  image?: string;
  title?: string;
  location?: string;
}

interface HeaderSectionProps {
  tour: Tour;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ tour }) => {
  return (
    <div
      className="h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-white relative"
      style={{ backgroundImage: `url(${tour?.image})` }} // Use tour image
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Title and Location */}
      <h1 className="text-6xl font-bold z-10">{tour?.title}</h1>
      <p className="text-xl mt-4 z-10">{tour?.location}</p>
    </div>
  );
};

export default HeaderSection;
