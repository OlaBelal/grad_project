import React from 'react';
import { Tour } from '../types';

const TabGallery: React.FC<{ tour: Tour }> = ({ tour }) => {
  // التحقق من وجود الصور وعرض بديل إذا لم تكن موجودة
  const imagesToShow = tour.imageUrls && tour.imageUrls.length > 0 
    ? tour.imageUrls 
    : Array(3).fill(null).map((_, i) => `https://via.placeholder.com/300x200?text=${tour?.title}+${i+1}`);

  return (
    <div>
      <h2 className="text-4xl font-bold text-[#DF6951] mb-4">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {imagesToShow.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Gallery ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              // استبدال الصورة المعطوبة بصورة افتراضية
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x200?text=${tour?.title}+${index+1}`;
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TabGallery;