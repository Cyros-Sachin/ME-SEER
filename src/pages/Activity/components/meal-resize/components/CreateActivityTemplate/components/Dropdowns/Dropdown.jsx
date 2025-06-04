import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option.unit_id || option.cat_id);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={handleDropdownToggle}
        className="border border-gray-300 p-1 rounded-md cursor-pointer"
      >
        {selectedOption
          ? selectedOption.name
          : options
          ? options[1].name
          : "Select an Option"}
      </div>
      {isDropdownOpen && (
        <div className="absolute mt-1 border border-gray-300 bg-white z-10 rounded-md shadow-md w-full max-h-40 overflow-auto">
          {options.map((option) => (
            <div
              key={option.unit_id || option.cat_id}
              onClick={() => handleOptionSelect(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
