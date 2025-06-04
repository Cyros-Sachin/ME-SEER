import React, { useEffect, useState } from "react";

const SearchInput = ({ key, setField, valueKey }) => {
  const [value, setValue] = useState("");
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => handleInputChange(e)}
        className="border border-black rounded-lg h-6 p-2"
      />
      {}
    </div>
  );
};

export default SearchInput;
