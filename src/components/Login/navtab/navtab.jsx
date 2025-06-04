import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navtab = ({ title, route }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  console.log(pathname);

  return (
    <div
      className={`${
        route === pathname ? "bg-[#000000] text-white" : ""
      } hover:bg-[#3e3e3e33] p-2 text-[14px] rounded-sm cursor-pointer`}
      onClick={() => navigate(route)}
    >
      {title}
    </div>
  );
};

export default Navtab;
