import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompanies, Company } from '../services/api';

const Partners = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        const data = await getCompanies();
        setCompanies(data.items);
        setError(null);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError('Failed to load companies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Loading companies...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-gray-600">
            Trusted by World-Leading Travel Companies
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {companies.map((company) => (
            <Link 
              key={company.id} 
              to={`/companies/${company.id}`}
              className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
            >
              <img
                src={company.profileImageUrl || 'https://via.placeholder.com/128x64?text=Logo'}
                alt={company.companyName}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/128x64?text=Logo';
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;






















// import React, { useEffect, useState, useCallback, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import { getCompanies } from '../services/api';

// // تعريف واجهة Company مباشرة إذا لم تكن موجودة في ملف آخر
// interface Company {
//   id: number;
//   userId: string;
//   companyName: string;
//   address: string;
//   description: string;
//   logo?: string;
//   // يمكن إضافة المزيد من الخصائص حسب حاجة API
// }

// const Partners = () => {
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [isInitializing, setIsInitializing] = useState(true);
//   const [hasError, setHasError] = useState(false);

//   const fetchCompanies = useCallback(async () => {
//     try {
//       const { items } = await getCompanies();
      
//       setCompanies(prev => {
//         const newItems = items || [];
//         if (JSON.stringify(prev) === JSON.stringify(newItems)) {
//           return prev;
//         }
//         return newItems;
//       });
//     } catch (error) {
//       console.error('Error fetching companies:', error);
//       setHasError(true);
//     } finally {
//       setIsInitializing(false);
//     }
//   }, []);

//   useEffect(() => {
//     const controller = new AbortController();
//     const timer = setTimeout(() => {
//       fetchCompanies();
//     }, 150);

//     return () => {
//       clearTimeout(timer);
//       controller.abort();
//     };
//   }, [fetchCompanies]);

//   const renderedCompanies = useMemo(() => {
//     return companies.map(company => ({
//       ...company,
//       uniqueKey: `company-${company.id}-${company.userId.split('-')[0]}`
//     }));
//   }, [companies]);

//   if (isInitializing) {
//     return (
//       <div className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
//             {[...Array(5)].map((_, i) => (
//               <div key={`placeholder-${i}`} className="w-32 h-16 bg-gray-100 rounded opacity-70"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (hasError) {
//     return (
//       <div className="py-12 bg-white text-center">
//         <p className="text-red-500 mb-4">Failed to load companies data</p>
//         <button
//           onClick={() => {
//             setHasError(false);
//             setIsInitializing(true);
//             fetchCompanies();
//           }}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <section className="py-12 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <h2 className="text-xl font-medium text-gray-600">Trusted by World-Leading Travel Companies</h2>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
//           {renderedCompanies.map((company) => (
//             <div 
//               key={company.uniqueKey}
//               className="w-32 h-16 relative transition-opacity duration-300 opacity-100"
//             >
//               <Link to={`/companies/${company.id}`} className="block h-full">
//                 <img
//                   src={company.logo || '/default-company-logo.png'}
//                   alt={company.companyName}
//                   className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = '/default-company-logo.png';
//                   }}
//                   loading="eager"
//                   decoding="sync"
//                 />
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Partners;