import React from "react";
import { useNavigate } from "react-router-dom";

const SelectorTab = ({ title, route, name, selectedTab, setHandler }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(route);
    setHandler(name);
  };

  return (
    <div
      onClick={handleUserClick}
      className={`${
        selectedTab === name ? `bg-[#4a4a4a60]` : ``
      } flex justify-center items-center w-20 ml-4 p-2 rounded-lg cursor-pointer`}
    >
      {title}
    </div>
  );
};

export default SelectorTab;
