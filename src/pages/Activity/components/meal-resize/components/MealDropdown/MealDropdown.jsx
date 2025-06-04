import React, { useState, useEffect, useRef } from "react";

const MealDropdown = ({ unit, options }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownName, setDropdownName] = useState("");

  const dropdownRef = useRef(null);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update selected option if `unit` prop changes
  useEffect(() => {
    const selectedItem = unit.data.filter((item) => item.Selected || item.flag);

    // console.log(selectedItem);   // code do not need any changes

    if (selectedItem[0]) {
      setSelectedOption(selectedItem[0].name);
    } else if (!selectedItem) {
      setSelectedOption(unit.data);
    }

    // try setting the name
    let labelName = unit.data[0].item_name;
    setDropdownName(labelName);
  }, [unit]);

  return (
    <div className="w-full mr-1 ml-1 text-xs items-center" ref={dropdownRef}>
      <div
        className="cursor-pointer w-full relative"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <label className="text-[10px] text-gray-500">
          {dropdownName
            ? dropdownName[0].toUpperCase() + dropdownName.slice(1)
            : ""}
        </label>
        <div className="p-1 rounded-md border border-black">
          {selectedOption}
        </div>
        {isDropdownOpen && (
          <div className="scrollbar bg-white border border-gray-300 mt-2 absolute w-full z-10 h-20 overflow-auto">
            {options?.length > 0 ? (
              options.map((option, index) => (
                <div
                  key={index}
                  className="text-[10px] cursor-pointer hover:bg-gray-100 p-1"
                  onClick={(event) => {
                    event.stopPropagation(); // Prevent event propagation
                    setSelectedOption(option.name);
                    setIsDropdownOpen(false); // Close the dropdown
                  }}
                >
                  {option.name}
                </div>
              ))
            ) : (
              <div className="text-[10px] text-gray-500">
                No options available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealDropdown;
