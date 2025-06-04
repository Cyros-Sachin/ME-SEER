/**
 * ControlTabs Component
 *
 * A reusable component representing a clickable tab with a customizable title.
 * This component displays a tab with a "+" sign and a title, and triggers a click handler function when clicked.
 *
 * @component
 * @example
 * const handleClick = () => console.log('Tab clicked');
 * const title = "My Tab";
 *
 * return (
 *   <ControlTabs clickHandler={handleClick} tabTitle={title} />
 * )
 *
 * @param {Object} props - Component props.
 * @param {Function} props.clickHandler - The function to handle the click event on the tab.
 * @param {string} props.tabTitle - The title displayed on the tab.
 *
 * @returns {JSX.Element} A clickable tab element with a title.
 */

// Importing React library for creating the component       adsa
import React, { useState } from "react";

// Importing CSS file for styling the component
import "./control-tabs.css";

// Defining the ControlTabs functional component
const ControlTabs = ({
  clickHandler,
  tabTitle,
  setRefreshTypeSelected,
  activationType,
  setActivation,
}) => {
  const [openControlTab, setOpenControlTab] = useState(false);
  const states = ["Daily", "Weekly", "Monthly"];

  return (
    <div
      onClick={() => setOpenControlTab(!openControlTab)}
      className="control-tab-container"
    >
      <div className="control-tab-container-main">
        <div>+</div>
        <div className="control-tab-title-container">{tabTitle}</div>
      </div>
      {openControlTab ? (
        <div className="flex justify-around">
          {states.map((state, index) => {
            return (
              <div
                key={index}
                className={`m-2 text-xs hover:bg-[#000000] hover:text-white p-2 rounded-sm border`}
                onClick={() => {
                  setRefreshTypeSelected(state);
                  setActivation(activationType);
                }}
              >
                {state}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ControlTabs;
