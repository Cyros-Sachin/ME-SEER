import React, { useContext, useEffect, useState } from "react";
import "./navigation-tabs.css";
import { useLocation, useNavigate } from "react-router-dom";

import { MenuContext } from "../../../../common-components/sidebar/contexts/menu-context";
import { UserClickTracingContext } from "../../../../common-components/sidebar/contexts/user-click-tracing-context";
import { AcitivitySideBarDropDownContext } from "../../../../pages/Activity/contexts/ActivitySideBarDropdownOption/ActivitySideBarDropDownOptionContext";
import { ActivityUserClickTracingContext } from "../../../../pages/Activity/contexts/ActivityUserClickTracing";

import { CaretUp, CaretDown } from "@phosphor-icons/react";

/**
 * @component
 * @name NavigationTabs
 * @description A React component for displaying navigation tabs with optional submenus.
 *
 * This component provides a navigation tab that can include an image, title, and optional submenu items. The submenu can be toggled open or closed on click. Depending on the `name` prop, clicking the tab navigates to a specified route using React Router's `useNavigate` hook.
 *
 * @param {Object} props - The properties for configuring the navigation tab.
 * @param {string} props.tabImage - The source URL for the tab's main image.
 * @param {string} props.tabAlternate - The alternate text for the tab's main image.
 * @param {string} props.tabTitle - The title text displayed on the tab.
 * @param {Array} props.subTabArray - An array of submenu items to be displayed when the tab is clicked.
 * @param {boolean} [props.isHover=false] - Determines if the tab should respond to hover events (not currently used in this component).
 * @param {boolean} [props.isClick=true] - Determines if the tab should respond to click events.
 * @param {boolean} [props.isButton=false] - Determines if the tab should be styled as a button (not currently used in this component).
 * @param {string} [props.arrowImage] - The source URL for an optional arrow image (currently commented out).
 * @param {string} [props.uparrowImage] - The source URL for an optional up arrow image (currently not used).
 * @param {string} [props.name="space"] - The identifier used for navigation routing.
 *
 * @returns {JSX.Element} The rendered NavigationTabs component.
 */

const NavigationTabs = ({
  tabImage,
  tabAlternate,
  tabTitle,
  subTabArray,
  name = "space",
  subMenuShouldOpen = false,
}) => {
  const { setActiveSubMenu } = useContext(MenuContext);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const pathname = useLocation().pathname;

  const { sidebarDropDownActivity } = useContext(
    AcitivitySideBarDropDownContext
  );

  const { setActivitySelected } = useContext(ActivityUserClickTracingContext);

  // important for user information tracing
  const { setSpaceIdSelected, spaceIdName, setSpaceIdName } = useContext(
    UserClickTracingContext
  );

  const { trigger, setTrigger } = useContext(AcitivitySideBarDropDownContext);

  const navigate = useNavigate();

  // When user clicks on the sidebar menu
  const handleSubMenuOpen = (e) => {
    e.preventDefault();

    // If the name passed is similar to the tab name then it will do neccessary functions
    if (name === "space")
      if (subMenuShouldOpen) {
        navigate("/spaces/notes");
        setIsSubMenuOpen(!isSubMenuOpen);
      }

    if (name === "activity") {
      navigate("/activity/meals");
      setIsSubMenuOpen(!isSubMenuOpen);
    }

    if (name === "dashboard") {
      navigate("/dashboard/overall");
    }
  };

  // When the user is clicking on any spaces
  const handleSubTabClick = async (
    event,
    passedSpaceId,
    tabname,
    description
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (pathname === "/spaces/notes") {
      console.log("Run");
      setSpaceIdSelected(passedSpaceId);
    }

    if (pathname === "/activity/meals") {
      setActivitySelected(passedSpaceId);
    }

    setSpaceIdName(tabname);

    console.log("Chala");
    if (description) {
      console.log("Description is : ", description);

      setTrigger(description);
    }
  };

  return (
    <div
      onClick={handleSubMenuOpen}
      className="cursor-pointer flex items-center mt-4 flex-col w-full"
    >
      <div className="w-full flex items-center ml-2">
        <img className="h-4 w-[15px]" src={tabImage} alt={tabAlternate} />

        <div className="text-xs items-center ml-2 font-semibold flex justify-between w-full">
          <div>{tabTitle}</div>
          <div className="mr-1">
            {isSubMenuOpen ? (
              <CaretUp size={15} color="black" />
            ) : (
              <CaretDown size={15} color="black" />
            )}
          </div>
        </div>
      </div>
      {isSubMenuOpen && (
        <div className="scrollbar w-full mt-2 flex flex-col bg-white p-2 rounded-lg shadow-md shadow-[#00000061] h-40 overflow-auto">
          {subTabArray && subTabArray.length > 0
            ? subTabArray.map((subTab) => {
                console.log(subTab);

                let id =
                  pathname === "/spaces/notes"
                    ? subTab.space_id
                    : pathname === "/activity/meals"
                    ? subTab.at_id
                    : "";
                return (
                  <div
                    key={id}
                    onClick={(e) =>
                      handleSubTabClick(e, id, subTab.name, subTab.description)
                    }
                    className={`mt-2 text-xs font-medium pl-4 w-full ${
                      spaceIdName === subTab.name
                        ? `bg-[#000000] text-white p-2 rounded-xs  font-semibold`
                        : ""
                    } `}
                  >
                    {subTab.name}
                  </div>
                );
              })
            : ""}
        </div>
      )}
    </div>
  );
};

export default NavigationTabs;
