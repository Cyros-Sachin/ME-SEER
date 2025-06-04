import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

const SearchInput = ({
  passedData,
  trigger,
  readOnly = true,
  onChange,
  title = readOnly
    ? trigger === "meal"
      ? "Food Item"
      : "Exercise"
    : trigger === "meal"
    ? "Search Food"
    : "Search Exercise",
  postBody,
  setPostBody,
  isUpdated,
}) => {
  const [searchQuery, setSearchQuery] = useState(passedData?.value || "");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userTyping, setUserTyping] = useState(false); // Track typing

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (readOnly) {
      setSearchQuery(passedData?.value || "");
      setShowDropdown(false);
      return;
    }

    if (!userTyping) return; // Prevents reopening after selection

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchData = async () => {
      let apiUrl = "";

      if (trigger === "meal") {
        apiUrl = `https://meseer.com/dog/food-items/search/${searchQuery}`;
      } else if (trigger === "movement") {
        apiUrl = `https://meseer.com/dog/exercise/search/${searchQuery}`;
      } else {
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        setSearchResults(data || []);
        setShowDropdown(data.length > 0); // Open only if results exist
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, trigger, readOnly, userTyping]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setUserTyping(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full rounded-md relative">
      <label className="text-xs">{title}</label>
      <input
        type="text"
        ref={inputRef}
        placeholder="Search..."
        className="w-full p-1 border border-gray-500 rounded-md focus:outline-none bg-transparent"
        value={searchQuery}
        onChange={(e) => {
          if (!readOnly) {
            // Allow input change only if editable
            setSearchQuery(e.target.value);
            setUserTyping(true);
          }
        }}
        readOnly={readOnly}
        onFocus={() => userTyping && setShowDropdown(true)}
        style={{
          cursor: readOnly ? "not-allowed" : "text",
          opacity: readOnly ? 0.6 : 1,
        }}
      />

      {showDropdown && searchQuery.trim() && !readOnly && (
        <ul
          ref={dropdownRef}
          className="scrollbar mt-2 border border-gray-500 rounded-md shadow-md max-h-40 overflow-y-auto bg-white"
        >
          {loading ? (
            <li className="p-2 text-gray-500">Loading...</li>
          ) : searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <li
                key={index}
                className="text-xs p-2 border-b last:border-b-0 border-b-gray-500 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  console.log("Selected:", item);
                  setSearchQuery(item.name);
                  setShowDropdown(false); // Close dropdown after selection
                  setUserTyping(false); // Stop further searches
                  onChange({
                    name: item.name,
                    id: item.f_db_id || item.w_db_id,
                  });
                }}
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
