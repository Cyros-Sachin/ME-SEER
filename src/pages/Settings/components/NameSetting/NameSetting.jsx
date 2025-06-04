import React, { useState } from "react";
import { useUserInformation } from "../../../Login/context/UserInformationContext";

const NameSetting = () => {
  // Get user information and the setter function from context
  const { userInformation, setUserInformation } = useUserInformation();

  // Initialize state with the current user's name
  const [name, setName] = useState(userInformation.name);

  // Handle name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle form submission (update the name)
  const handleSubmit = () => {
    setUserInformation({ ...userInformation, name });
    alert("Name updated successfully!");
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-1xl font-light text-gray-800 mb-6">
        Change Your Name
      </h2>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your new name"
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-2 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default NameSetting;
