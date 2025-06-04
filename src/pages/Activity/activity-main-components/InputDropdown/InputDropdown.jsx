import React, { useState, useRef, useEffect } from "react";

const InputField = ({
  inputRef,
  readonly,
  title,
  postBody,
  setPostBody,
  passedData,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(passedData.value);
  }, [passedData]);

  const handleInputChange = (e) => {
    if (!readonly) {
      const userTypedInputValue = e.target.value;
      setInputValue(userTypedInputValue);
      let newPostBody = { ...postBody };
      let valueIdToBeUpdated = passedData.value_id;
      newPostBody[valueIdToBeUpdated] = userTypedInputValue;
      setPostBody(newPostBody);
    }
  };

  return (
    <div>
      <label className="text-xs">
        {title[0].toUpperCase() + title.slice(1)}
      </label>
      <input
        type="text"
        ref={inputRef}
        className={`w-full p-1 border border-gray-500 rounded-md focus:outline-none bg-transparent ${
          readonly ? "cursor-not-allowed opacity-70" : ""
        }`}
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        readOnly={readonly}
      />
    </div>
  );
};

const Dropdown = ({
  items,
  postBody,
  readonly,
  setPostBody,
  passedData,
  onChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // find the object with Selected : true
    const selectedItem = items.filter(
      (item) => item.Selected === true || item.flag === "selected"
    );
    if (selectedItem.length > 0) {
      const selectedValue = selectedItem[0].name;
      setSelectedItem(selectedValue);
    }
  }, [items]);

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

  const handleDropdownItemSelected = (item) => {
    let itemname = item.name;
    let item_id = item.unit_id;
    onChange({ name: itemname, id: item_id });
    setSelectedItem(itemname);
    // Set the postBody
    // get the catergoryid to update from the passedData
    // let categoryIdToUpdate = passedData.category_id;
    // let newPostBody = { ...postBody };
    // newPostBody[categoryIdToUpdate] = item_id;
    // setPostBody(newPostBody);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <label className="text-xs text-transparent">Random</label>
      <button
        className={`p-1 border border-gray-500 rounded-md bg-none w-full ${
          readonly ? "cursor-not-allowed opacity-70" : ""
        }`}
        onClick={() => !readonly && setShowDropdown((prev) => !prev)}
        disabled={readonly}
      >
        {selected ? selected : "Select"}
      </button>

      {showDropdown && !readonly && (
        <ul className="bg-white z-50 scrollbar absolute left-0 mt-1 w-full border border-gray-500 rounded-md shadow-md bg-none max-h-40 overflow-y-auto">
          {items?.map(
            (item, index) =>
              item.name && (
                <li
                  key={index}
                  className={`p-2 border-b last:border-b-0 border-b-gray-500 hover:bg-[#6060605e] cursor-pointer ${
                    selected?.unit_id === item.unit_id ? "bg-[#000000]" : ""
                  }`}
                  onClick={() => handleDropdownItemSelected(item)}
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

const InputDropdown = ({
  passedData,
  readonly = true,
  title,
  isEditRow,
  postBody,
  setPostBody,
  onChange,
}) => {
  const inputRef = useRef(null);

  return (
    <>
      <InputField
        inputRef={inputRef}
        readonly={readonly}
        title={title}
        postBody={postBody}
        setPostBody={setPostBody}
        passedData={passedData}
      />

      <Dropdown
        items={passedData?.data_array}
        readonly={readonly}
        postBody={postBody}
        setPostBody={setPostBody}
        passedData={passedData}
        onChange={onChange}
      />
    </>
  );
};

export default InputDropdown;
