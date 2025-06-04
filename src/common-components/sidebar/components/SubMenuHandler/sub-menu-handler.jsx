import React, { useState } from "react";
import {
  AirplaneTilt,
  File,
  UsersThree,
  Lightbulb,
  House,
  ChatCircle,
  Lock,
  Database,
} from "@phosphor-icons/react";

const SubMenuHandler = ({ setEditOpen, clickHandler }) => {
  // State to manage input value and selected icon
  const [inputValue, setInputValue] = useState("");
  const [selectedIconIndex, setSelectedIconIndex] = useState(null); // Change to store index instead of icon

  const icons = [
    <AirplaneTilt />,
    <File />,
    <UsersThree />,
    <Lightbulb />,
    <House />,
    <ChatCircle />,
    <Lock />,
    <Database />,
    <AirplaneTilt />,
    <File />,
    <UsersThree />,
    <Lightbulb />,
    <House />,
    <ChatCircle />,
    <Lock />,
    <Database />,
  ];

  const handleIconClick = (index) => {
    setSelectedIconIndex(index); // Set the index of the selected icon
  };

  const handleAddClick = () => {
    // Pass the selected icon and input value to the clickHandler
    const selectedIcon =
      selectedIconIndex !== null ? icons[selectedIconIndex] : null;
    clickHandler(selectedIcon, inputValue);
  };

  return (
    <div className="border h-full w-full p-4">
      <div className="flex flex-col mb-4">
        <div className="text-xs">Name</div>
        <input
          className="bg-transparent w-full border border-black rounded-sm text-[12px] mt-2 p-1"
          value={inputValue} // Bind the input value
          onChange={(e) => setInputValue(e.target.value)} // Update state on change
        />
      </div>

      <div>
        <div className="mt-4 text-sm">Icons</div>
        <div className="grid grid-cols-6 w-full overflow-hidden mt-2 gap-3 p-4">
          {icons.map((icon, index) => (
            <div
              key={index}
              onClick={() => handleIconClick(index)} // Set the selected icon index on click
              className={`cursor-pointer h-10 border border-black w-10 flex justify-center items-center rounded-md ${
                selectedIconIndex === index ? "bg-[#66f22fb0]" : ""
              }`} // Highlight selected icon
            >
              {React.cloneElement(icon, { size: 20 })}
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 flex justify-end items-end">
        <div
          onClick={handleAddClick} // Pass the selected icon and input value to the clickHandler
          className="text-xs text-white flex justify-center items-center p-2 bg-[#6770eb] w-20 rounded-md cursor-pointer font-medium mr-3"
        >
          Add
        </div>
        <div
          onClick={() => setEditOpen(false)}
          className="text-xs text-[#6770eb] flex justify-center items-center p-2 border border-[#6770eb] w-20 rounded-md cursor-pointer font-medium"
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

export default SubMenuHandler;
