import React, { useState } from "react";

const Input = ({ selectedValue, key, setField, valueKey }) => {
  const [value, setValue] = useState(selectedValue);
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <input
      value={value}
      onChange={(e) => handleInputChange(e)}
      className="border border-black rounded-lg h-6 p-2"
    />
  );
};

export default Input;
