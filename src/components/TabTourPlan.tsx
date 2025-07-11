import React from 'react';

const TabTourPlan: React.FC = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-[#DF6951] mb-4">Tour Plan</h2>
      <div className="relative">
        {/* Vertical Timeline */}
        <div className="absolute left-4 h-full border-l-2 border-gray-300 border-dashed"></div>

        {/* Day 1 */}
        <div className="flex items-start mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
            <span className="text-sm font-bold">01</span>
          </div>
          <div className="ml-6 flex-1">
            <h3 className="text-xl font-bold mb-2">Day 1: Departure</h3>
            <p className="text-gray-700 mb-4">
              Ullam Temporibus Voluptariae Qui Quia Commodi Rem Praesentium Alias. Ea Voluptates Officia Sed Molestiae Sint Et Voluptas Quae Qui Harum Repudiandae Collium Dolorem.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>5 Star Accommodation</li>
              <li>Breakfast</li>
            </ul>
          </div>
        </div>

        {/* Day 2 */}
        <div className="flex items-start mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
            <span className="text-sm font-bold">02</span>
          </div>
          <div className="ml-6 flex-1">
            <h3 className="text-xl font-bold mb-2">Day 2: Visitin, Geneva And Zermatt</h3>
            <p className="text-gray-700 mb-4">
              Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>5 Star Accommodation</li>
              <li>Breakfast</li>
            </ul>
          </div>
        </div>

        {/* Day 3 */}
        <div className="flex items-start mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
            <span className="text-sm font-bold">03</span>
          </div>
          <div className="ml-6 flex-1">
            <h3 className="text-xl font-bold mb-2">Day 3: Rest</h3>
            <p className="text-gray-700 mb-4">
              Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>5 Star Accommodation</li>
              <li>Breakfast</li>
            </ul>
          </div>
        </div>

        {/* Day 4 */}
        <div className="flex items-start mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
            <span className="text-sm font-bold">04</span>
          </div>
          <div className="ml-6 flex-1">
            <h3 className="text-xl font-bold mb-2">Day 4: Historical Tour</h3>
            <p className="text-gray-700 mb-4">
              Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>5 Star Accommodation</li>
              <li>Breakfast</li>
            </ul>
          </div>
        </div>

        {/* Day 5 */}
        <div className="flex items-start mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-[#DF6951] text-white rounded-full z-10">
            <span className="text-sm font-bold">05</span>
          </div>
          <div className="ml-6 flex-1">
            <h3 className="text-xl font-bold mb-2">Day 5: Return</h3>
            <p className="text-gray-700 mb-4">
              Donec Quam Felis, Ultricies Nec, Pellentesque Eu, Pretium Quis, Sem. Nulla Consequat Massa Quis Enim. Donec Pede Justo, Fringilla Vel, Aliquet Nec, Vulputate Eget, Arcu. In Enim Justo, Rhoncus Ut, Imperdiet A, Venenatis Vitae, Justo. Nullam Dictum Felis Eu Pede Mollis Pretium.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>5 Star Accommodation</li>
              <li>Breakfast</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabTourPlan;
