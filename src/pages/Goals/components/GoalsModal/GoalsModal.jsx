import React, { useState } from "react";

const GoalsModal = ({ dateStart, title, eventTitle, onSubmit }) => {
  const [recurrence, setRecurrence] = useState("standalone");

  const handleSubmit = () => {
    if (!dateStart) {
      console.warn("No date selected");
      return;
    }

    const occurrences = [];
    let startDate = new Date(dateStart);

    if (recurrence === "standalone") {
      occurrences.push(startDate);
    } else if (recurrence === "weekly") {
      for (let i = 0; i < 4; i++) {
        let newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + i * 7); // Add 7 days each iteration
        occurrences.push(newDate);
      }
    } else if (recurrence === "monthly") {
      for (let i = 0; i < 3; i++) {
        let newDate = new Date(startDate);
        newDate.setMonth(newDate.getMonth() + i); // Add a month each iteration
        occurrences.push(newDate);
      }
    }

    console.log("Event occurrences:", occurrences);

    // Call the onSubmit function to pass the occurrences back to the parent
    onSubmit(occurrences);
  };

  return (
    <div className="p-4 w-full h-full bg-white shadow-lg rounded-lg border border-gray-300">
      {/* Modal Title */}
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      {/* Event Title */}
      <p className="text-md text-gray-600 mb-3">{eventTitle}</p>

      {/* Selected Date */}
      <p className="text-sm text-gray-500 mb-3">
        Date: {dateStart ? new Date(dateStart).toLocaleDateString() : "Not Set"}
      </p>

      {/* Recurrence Dropdown */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Repeat:
      </label>
      <select
        className="w-full p-2 border rounded-md"
        value={recurrence}
        onChange={(e) => setRecurrence(e.target.value)}
      >
        <option value="standalone">Standalone</option>
        <option value="weekly">Weekly Repeat</option>
        <option value="monthly">Monthly Repeat</option>
      </select>

      {/* Submit Button */}
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default GoalsModal;
