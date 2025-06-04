import React from "react";
import componentController from "../../../controllers/componentController";
import ControlPuck from "../../ControlPuck/ControlPuck";

const SidebarAdvancedMain = ({ isExpanded, toggleSidebar, setCurrentUrl }) => {
  return (
    <div
      className={`z-50 fixed h-screen shadow-md shadow-[#00000077] p-2 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isExpanded ? "w-[220px]" : "w-[70px] items-center"
      }`}
    >
      <div className="flex flex-col items-center w-full overflow-hidden">
        <ControlPuck toggleSidebar={toggleSidebar} isExpanded={isExpanded} />

        {/* Logo */}
        <componentController.SidebarAdvancedLogo isExpanded={isExpanded} />

        {/* Sidebar Options */}
        <componentController.SidebarAdvancedOption isExpanded={isExpanded} />

      </div>

      {/* Profile */}
      <componentController.SidebarAdvancedProfile isExpanded={isExpanded} />
    </div>
  );
};

export default SidebarAdvancedMain;
