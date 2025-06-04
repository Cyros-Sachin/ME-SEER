import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import {
  House,
  PersonSimpleRun,
  ChartLine,
  Question,
} from "@phosphor-icons/react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useSidebarTracing } from "../../contexts/SidebarTracing";

const SidebarAdvancedOption = ({ isExpanded }) => {
  const navigate = useNavigate();
  const [spaceOptions, setSpaceOptions] = useState([
    {
      id: nanoid(),
      icon: <House size={20} />,
      title: "Space",
      url: "/spaces/notes",
      sidebarUrl: "/spaces/notes",
    },
    {
      id: nanoid(),
      icon: <PersonSimpleRun size={20} />,
      title: "Activity",
      url: "/activity/meals",
      sidebarUrl: "/activity/meals",
    },
    {
      id: nanoid(),
      icon: <ChartLine size={20} />,
      title: "Dashboard",
      url: "/dashboard/overall",
      sidebarUrl: "/dashboard",
    },
    {
      id: nanoid(),
      icon: <Question size={20} />,
      title: "Help and Support",
      url: "/blogs",
      sidebarUrl: "/blogs",
    },
    {
      id: nanoid(),
      icon: <Question size={20} />,
      title: "Goals",
      url: "/goals",
      sidebarUrl: "/goals",
    },
  ]);

  const { updateSidebarUrl } = useSidebarTracing();

  const navigateToRoute = (url, sidebarurl) => {
    navigate(url);
    updateSidebarUrl(url);
  };

  return (
    <div className="mt-8 text-xs w-full flex flex-col items-center">
      {spaceOptions.map((option, index) => (
        <div
          key={option.id}
          onClick={() => navigateToRoute(option.url, option.sidebarUrl)}
          className={`w-full items-center flex justify-between ${
            index === 0 ? "" : "mt-2"
          }  p-2 font-semibold`}
        >
          <div
            className={`flex items-center ${
              isExpanded ? "justify-center" : "ml-2"
            }`}
          >
            <div onClick={() => navigateToRoute(option.url, option.sidebarUrl)}>
              {option.icon}
            </div>
            {isExpanded && (
              <div className="ml-2">
                {(option && option.title?.toUpperCase()) || ""}
              </div>
            )}
          </div>
          {isExpanded && (
            <div
              onClick={() => navigateToRoute(option.url, option.sidebarUrl)}
              className="bg-gray-200 h-5 w-5 flex justify-center items-center cursor-pointer"
            >
              <IoIosArrowForward color="black" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarAdvancedOption;
