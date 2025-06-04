import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({
  items,
  selected,
  onSelect,
  readonly,
  category = false,
  title,
  differentData = false,
  setSpace_id,
}) => {
  console.log(items, differentData);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdown, setDropdown] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (differentData) {
    return (
      <div className="relative inline-block w-full">
        <label className={`${title ? "text-xs" : "text-transparent"}`}>
          {title || "Hello"}
        </label>
        <button
          ref={buttonRef}
          className={`p-1 border border-gray-500 rounded-md w-full text-left ${
            readonly ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
          onClick={() => !readonly && setShowDropdown((prev) => !prev)}
          disabled={readonly}
        >
          {readonly && selected
            ? selected.name || "No name"
            : dropdown || "Select an option"}
        </button>

        {showDropdown && !readonly && (
          <ul
            ref={dropdownRef}
            className="scrollbar mt-1 w-full border border-gray-500 rounded-md shadow-md bg-gray-800 max-h-40 overflow-y-auto z-50"
          >
            {items?.length > 0 ? (
              items.map((item, index) => {
                // Skip rendering for index 0
                if (index === 0) return null;

                return (
                  <li
                    key={index}
                    className={`p-2 border-b last:border-b-0 border-b-gray-500 hover:bg-gray-700 cursor-pointer ${
                      selected?.id === item.subspace_id
                        ? "bg-gray-800 text-white"
                        : "text-gray-300"
                    }`}
                    onClick={() => {
                      setSpace_id(item.space_id);
                      let passingId;
                      if (item.cat_id !== undefined) {
                        passingId = item.cat_id;
                      } else if (item.subspace_id !== undefined) {
                        passingId = item.subspace_id;
                      } else {
                        passingId = item.unit_id;
                      }
                      onSelect({
                        name: item.space_name || item.item_name,
                        id: passingId,
                      });
                      setShowDropdown(false);
                      setDropdown(item.subspace_name || item.item_name);
                    }}
                  >
                    {item.space_name
                      ? `${item.space_name} - ${item.subspace_name}`
                      : item.item_name}
                  </li>
                );
              })
            ) : (
              <li className="p-2 text-gray-500">No options available</li>
            )}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block w-full">
      <label className={`${title ? "text-xs" : "text-transparent"}`}>
        {title || "Hello"}
      </label>
      <button
        ref={buttonRef}
        className={`p-1 border border-gray-500 rounded-md w-full text-left ${
          readonly ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
        onClick={() => !readonly && setShowDropdown((prev) => !prev)}
        disabled={readonly}
      >
        {readonly && selected
          ? selected.name || "No name"
          : dropdown || "Select an option"}
      </button>

      {showDropdown && !readonly && (
        <ul
          ref={dropdownRef}
          className="scrollbar mt-1 w-full border border-gray-500 rounded-md shadow-md bg-gray-800 max-h-40 overflow-y-auto z-50"
        >
          {items?.length > 0 ? (
            items.map((item, index) => {
              // Custom condition to ignore index 0

              return (
                <li
                  key={index}
                  className={`p-2 border-b last:border-b-0 border-b-gray-500 hover:bg-gray-700 cursor-pointer ${
                    selected?.id === item.unit_id
                      ? "bg-gray-800 text-white"
                      : "text-gray-300"
                  }`}
                  onClick={() => {
                    let passingId;
                    if (category) {
                      passingId = item.cat_id;
                    } else {
                      passingId = item.unit_id;
                    }
                    onSelect({ name: item.name, id: passingId });
                    setShowDropdown(false);
                    setDropdown(item.name);
                  }}
                >
                  {item.name}
                </li>
              );
            })
          ) : (
            <li className="p-2 text-gray-500">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
