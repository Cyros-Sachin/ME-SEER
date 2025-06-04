import { defaults } from "chart.js";
import React from "react";
import { MdOutlinePaid } from "react-icons/md";

const SidebarAdvancedPayment = ({ isExpanded }) => {
  return (
    <div
      className={`shadow-md shadow-[#9090906e] mt-4 p-2 bg-[#bbbbbb61] ${
        isExpanded ? "rounded-3xl w-full" : "rounded-full h-10 w-10"
      }`}
    >
      {isExpanded ? (
        <div className="bg-white rounded-2xl text-sm p-1 flex justify-center items-center tracking-widest">
          Free
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <MdOutlinePaid size={27} color="#000000" />
        </div>
      )}
    </div>
  );
};

export default SidebarAdvancedPayment;
