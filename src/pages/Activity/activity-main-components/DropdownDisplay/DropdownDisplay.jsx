import React, { useEffect, useState, useRef } from "react";

const DropdownDisplay = ({ items, readonly, onSelect, title }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (items?.length > 0) {
      const preselectedItem = items.find(
        (item) =>
          item.flag === "selected" ||
          item.flag === "Selected" ||
          item.selected === true ||
          item.Selected === true
      );
      setSelected(preselectedItem || null);
    }
  }, [items]); // Runs whenever items change

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <label className="text-xs">{title}</label>
      <button
        className={`p-1 border border-gray-500 rounded-md w-full text-left ${
          readonly ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
        onClick={() => !readonly && setShowDropdown((prev) => !prev)}
        disabled={readonly} // Disable button if readonly
      >
        {selected ? selected.name : "Select"}
      </button>

      {showDropdown && !readonly && (
        <ul className="absolute left-0 mt-1 w-full border border-gray-500 rounded-md shadow-md bg-white max-h-40 overflow-y-auto">
          {items?.map(
            (item, index) =>
              item.name && (
                <li
                  key={index}
                  className={`p-2 border-b last:border-b-0 border-gray-500 hover:bg-gray-200 cursor-pointer ${
                    selected?.cat_id === item.cat_id ? "bg-gray-300" : ""
                  }`}
                  onClick={() => {
                    setSelected(item);
                    onSelect({ name: item.name, id: item.cat_id });
                    setShowDropdown(false);
                  }}
                >
                  {item.name}
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownDisplay;
