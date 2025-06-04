import React from "react";

const BasicInput = ({ value, onValueChange, type }) => {
  const handleInputChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleInputChange}
      placeholder="Enter value..."
      className="border border-gray-300 p-1 rounded-md w-full focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default BasicInput;
