import React, { useContext, useEffect, useRef, useState } from "react";
import "./sub-menu.css";
import { useLocation, useNavigate } from "react-router-dom";

import contextController from "./context-controller";

import axios from "axios";
import useUserId from "../../../../../../global-custom-hooks/useUserId";

const SubMenu = ({
  menuItem,
  routing = false,
  enableEdit = false,
  remove = false,
  id,
  background = false,
  openModal = false,
  clickHandler,
}) => {
  // Add space submenu and activity submenu and set those also

  const { activeSubMenu, setActiveSubMenu } = useContext(
    contextController.MenuContext
  );

  const {
    spaceIdSelected,
    subSpaceClicked,
    setSubSpaceClicked,

    subSpaceIdName,
    setSubSpaceIdName,

    activitySelected,
    setActivitySelected,
  } = useContext(contextController.UserClickTracingContext);

  const navigate = useNavigate();
  const [editSubMenu, setEditSubmenu] = useState(false);
  const [submenuInput, setSubmenuInput] = useState(menuItem.name);
  const inputRef = useRef(null); // Ref to track input field
  const userId = useUserId();
  const pathname = useLocation().pathname;

  const handleSubMenuChanges = (e) => {
    setSubmenuInput(e.target.value);
  };

  const handleRouting = (e, name) => {
    setSubSpaceIdName(name);
    console.log(pathname);

    if (pathname === "/spaces/notes") {
      setSubSpaceClicked(id);
    }

    if (enableEdit) {
      setEditSubmenu(!editSubMenu);
    }
  };

  const handleDeleteSubMenu = async (id) => {
    const response = await axios.delete(
      `https://meseer.com/dog/subspaces/${id}/${localStorage.getItem("userId")}`
    );

    // run the api for space id selected in the userSelectionContext so that the list updates in real time.
  };

  useEffect(() => {
    setSubmenuInput(menuItem.name); // Update input when menuItem changes
  }, [menuItem]);

  useEffect(() => {
    const handleClickOutside = async (e) => {
      // If click is outside the input field, close edit mode
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        // https://meseer.com/dog/subspaces/{uid}

        const response = await axios.put(
          `https://meseer.com/dog/subspaces/${userId}`,
          {
            space_id: spaceIdSelected,
            userId,
            name: submenuInput,
          }
        );

        console.log(response);

        setEditSubmenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [submenuInput, activeSubMenu, menuItem, setActiveSubMenu]);

  return (
    <div
      onClick={() => {
        if (openModal) {
          clickHandler(menuItem.name);
        }
      }}
      className={`${
        subSpaceIdName === menuItem.name && background
          ? `bg-[#000000] text-white p-1 w-full rounded-sm`
          : ""
      } mt-2 cursor-pointer flex justify-between border border-blue-900`}
    >
      {/* Render Phosphor icons or image depending on the type */}
      {React.isValidElement(menuItem.img) ? (
        menuItem.img // If it's a React component (like a Phosphor icon)
      ) : (
        <img className="h-full w-4" src={menuItem.img} alt={menuItem.alt} /> // If it's a string (image URL)
      )}

      {editSubMenu === true ? (
        <input
          ref={inputRef} // Attach the ref to the input field
          className="text-sm w-full"
          value={submenuInput}
          onChange={handleSubMenuChanges}
        />
      ) : (
        <div
          onClick={(e) => handleRouting(e, menuItem.name)}
          className="text-sm w-full"
        >
          {menuItem.name} {menuItem.subspace_id}
        </div>
      )}
      {remove ? (
        <div onClick={() => handleDeleteSubMenu(id)} className="ml-auto">
          x
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SubMenu;
