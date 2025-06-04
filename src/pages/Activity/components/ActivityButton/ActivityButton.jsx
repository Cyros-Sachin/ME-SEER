import React, { useState, useRef } from "react";
import { RiDeleteBinLine } from "react-icons/ri"; // Ensure this package is installed: `react-icons`
import mealPic from "../../assets/meal-pic.jpg";

const ActivityButton = ({ name, onClickHandler }) => {
  const [isHovered, setIsHovered] = useState(false);
  const deleteRef = useRef(null);

  return (
    <div
      onClick={onClickHandler}
      className="flex flex-col w-full p-1 h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          ref={deleteRef}
          style={{ fontFamily: "var(--primary-font-family)" }}
          className="text-[#575757] p-1 cursor-pointer rounded-sm text-sm absolute left-[95%] -top-8 bg-black border-2 border-black flex justify-center items-center"
        >
          <RiDeleteBinLine color="white" size={20} />
        </div>
      )}

      <div className="h-3/4">
        <img src={mealPic} className="rounded-sm w-full h-full" />
      </div>
      <div className="h-1/4 flex justify-center items-center text-md tracking-wider bg-gray-200 mt-1 rounded-md font-semibold">
        {name}
      </div>
    </div>
  );
};

export default ActivityButton;
