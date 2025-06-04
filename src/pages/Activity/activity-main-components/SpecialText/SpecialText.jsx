import React, { useEffect, useState, useRef } from "react";

const SpecialText = ({ text, onChange, title, passedData, readOnly }) => {
  console.log(passedData);
  const [textareaValue, setTextAreaValue] = useState();
  const debounceTimeout = useRef(null);

  useEffect(() => {
    setTextAreaValue(text);
  }, [text]);

  const handleTextAreaChange = (e) => {
    if (!readOnly) {
      const value = e.target.value;
      setTextAreaValue(value);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        onChange({
          name: value,
          id: passedData,
        });
      }, 500); // 500ms debounce delay
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-xs">{title}</label>
      <textarea
        onChange={(e) => handleTextAreaChange(e)}
        value={textareaValue}
        className="h-[33px] border border-gray-500 rounded-md p-1 bg-transparent"
        placeholder="Enter values"
        cols={2}
        readOnly={readOnly}
      />
    </div>
  );
};

export default SpecialText;
