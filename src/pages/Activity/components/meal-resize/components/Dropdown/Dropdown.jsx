import React, { useEffect, useState } from "react";

const Dropdown = ({ selectedValue, options, key, setField }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValueIn, setSelectedValue] = useState(selectedValue);

  const handleOnDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    // handle when the option is getting selected
    setSelectedValue(option.name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex relative min-w-[50px] ml-2">
      <div
        onClick={handleOnDropdownClick}
        className="w-full border border-black p-1 rounded-lg cursor-pointer"
      >
        {selectedValueIn}
      </div>
      {isDropdownOpen && (
        <div className="w-full absolute top-full mt-2 border border-black p-1 bg-white overflow-auto">
          {options &&
            options.length > 0 &&
            options.map((option) => {
              return (
                <div
                  className="mt-1 cursor-pointer"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.name}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
