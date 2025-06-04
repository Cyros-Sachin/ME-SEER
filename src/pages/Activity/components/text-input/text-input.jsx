// TextInputSection.js
import React, { useState } from 'react';

const TextInputSection = ({ label, initialValue }) => {
    // Local state for the input value
    const [value, setValue] = useState(initialValue);

    // Handler for input changes
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div
            style={{ fontFamily: "var(--primary-font-family)" }}
            className="mt-8 flex text-[12px] font-semibold justify-between"
        >
            <div className="ml-8">{label}</div>
            <input
                className="flex w-[550px] border border-black rounded-sm items-center p-1 mr-8"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default TextInputSection;
