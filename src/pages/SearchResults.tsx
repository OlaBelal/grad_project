import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const SearchResults = () => {
  const location = useLocation();
  const { results, searchTerm, searchType } = location.state || {};

  // Ensure it's an array
  const safeResults = Array.isArray(results) ? results : [];

  console.log("Search Results Data:", safeResults);

  if (safeResults.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          No results found for "{searchTerm}" in {searchType}
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Results for "{searchTerm}" in {searchType}
      </h2>
      <ul className="space-y-4">
        {safeResults.map((item: any, index: number) => (
          <li key={index} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
            <p>{item.description || "No description available."}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
