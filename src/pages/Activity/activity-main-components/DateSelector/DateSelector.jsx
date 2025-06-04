import React, { useEffect, useState } from "react";

const DateSelector = ({
  title = "Date",
  cat_qty_track,
  passedData,
  onChange,
}) => {
  const [isDateFirstFormat, setIsDateFirstFormat] = useState(true);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Debounce state
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    if (cat_qty_track !== 0) {
      if (cat_qty_track === 46) {
        setIsDateFirstFormat(false);
      } else {
        setIsDateFirstFormat(true);
      }
    }
  }, [cat_qty_track]);

  useEffect(() => {
    // If you want to initialize from passedData
    if (passedData && passedData.length === 2) {
      const dateParts = passedData[0]?.name?.split("/") || [];
      if (dateParts.length === 3) {
        setDay(dateParts[0]);
        setMonth(dateParts[1]);
        setYear(dateParts[2]);
      }
    }
  }, [passedData]);

  // Handle the change and debounce
  const handleChange = (value, type) => {
    // Set the day, month, or year based on the type
    if (type === "day") {
      setDay(value);
    }
    if (type === "month") {
      setMonth(value);
    }
    if (type === "year") {
      // Ensure that year is handled as a string to preserve all digits
      setYear(value);
    }

    // Handle the construction of the date when the "year" is updated
    if (type === "year") {
      // Construct the final date string in the 'YYYY-MM-DD' format
      const dateStr = `${value.toString()}-${month
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

      // Create a Date object from the valid date string (assuming the date string is in 'YYYY-MM-DD' format)
      const dateObject = new Date(dateStr);

      // Check if the date is valid (to avoid Invalid Date)
      if (!isNaN(dateObject)) {
        // Convert to ISO format (including time part)
        const isoDateStr = dateObject.toISOString();

        // Remove the last 4 characters (`.000Z`) from the ISO string and keep the time part
        const trimmedDateStr = isoDateStr.slice(0, -5); // Removes `.000Z`

        // Log the created ISO date string with time
        console.log("ISO Date with time:", trimmedDateStr);

        // Call onChange with the ISO formatted date with time
        onChange({ name: trimmedDateStr });
      } else {
        console.log("Invalid Date");
      }
    }
  };

  return (
    <div className="w-full bg-transparent">
      <label className="text-xs">{title}</label>
      <div className="flex">
        <div className="grid grid-cols-3 gap-1">
          {isDateFirstFormat ? (
            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => handleChange(e.target.value, "day")}
              className="w-full p-1 border border-gray-500 rounded-md focus:outline-none bg-transparent"
            />
          ) : (
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => handleChange(e.target.value, "month")}
              className="w-full p-1 border border-gray-500 rounded-md focus:outline-none bg-transparent"
            />
          )}

          {isDateFirstFormat ? (
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => handleChange(e.target.value, "month")}
              className="w-full p-1 border border-gray-500 rounded-md focus:outline-none bg-transparent"
            />
          ) : (
            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => handleChange(e.target.value, "day")}
              className="w-full p-1 border border-gray-500 rounded-md focus:outline-none bg-transparent"
            />
          )}

          <input
            type="number"
            min="1989"
            max="2100"
            value={year}
            onChange={(e) => handleChange(e.target.value, "year")}
            className="w-full p-1 border border-gray-500 rounded-md focus:outline-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
