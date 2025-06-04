import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchableInput = ({ onValueChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (inputValue) {
      const fetchResults = async () => {
        try {
          const response = await axios.get(
            `https://meseer.com/dog/food-items/search/${inputValue}`
          );
          setSearchResults(response.data || []);
          setIsDropdownOpen(true);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      fetchResults();
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onValueChange({ value: e.target.value, cat_qty_id: null });
  };

  const handleOptionSelect = (option) => {
    setInputValue(option.name);
    onValueChange({ value: option.name, cat_qty_id: option.f_db_id });
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
        className="border-2 border-blue-500 p-1 rounded-md w-full h-full "
      />
      {isDropdownOpen && searchResults.length > 0 && (
        <div className="absolute mt-1 border border-gray-300 bg-white rounded-md shadow-md w-full overflow-auto">
          {searchResults.map((result) => (
            <div
              key={result.f_db_id}
              onClick={() => handleOptionSelect(result)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableInput;
