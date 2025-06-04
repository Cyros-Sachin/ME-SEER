import React from "react";
import "./ControlPuck.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ControlPuck = ({ toggleSidebar, isExpanded }) => {
  return (
    <div
      onClick={() => toggleSidebar()}
      className="container cursor-pointer absolute top-20 -right-[30px] bg-white w-8 h-8 flex justify-center items-center"
    >
      {!isExpanded ? (
        <IoIosArrowForward className="cursor-pointer" />
      ) : (
        <IoIosArrowBack className="cursor-pointer" />
      )}
    </div>
  );
};

export default ControlPuck;
