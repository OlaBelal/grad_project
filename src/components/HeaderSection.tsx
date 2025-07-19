import React from 'react';

interface Tour {
  image?: string;
  coverImageUrl?: string;
  imageUrls?: string[];
  title?: string;
  location?: string;
  destinationCity: string;
}

interface HeaderSectionProps {
  tour: Tour;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ tour }) => {
  // تحديد مصدر الصورة بالأولوية لـ coverImageUrl ثم image ثم أول صورة من imageUrls
  const imageUrl = tour.coverImageUrl || tour.image || 
                  (tour.imageUrls && tour.imageUrls.length > 0 ? tour.imageUrls[0] : '');

  return (
    <div className="relative h-[400px] w-full">
      {/* الخلفية مع الصورة والتعتيم */}
      {imageUrl ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gray-300" />
      )}

      {/* المحتوى النصي */}
      <div className="relative h-full flex flex-col items-center justify-center text-white z-10 p-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{tour.title}</h1>
        <p className="text-xl md:text-2xl">{tour.destinationCity}</p>
      </div>
    </div>
  );
};

export default HeaderSection;