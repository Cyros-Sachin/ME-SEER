import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

//images
import notepad from "../assets/sidebar/spaces-sub-menu/Notebook.png";
import work from "../assets/sidebar/spaces-sub-menu/Printer.png";

// images
import meals from "../assets/sidebar/activity-sub-menu/Coffee.png";
import goalsImg from "../assets/sidebar/activity-sub-menu/ArchiveBox.png";
import { nanoid } from "nanoid";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [spaceSubMenu, setSpaceSubMenu] = useState({
    name: "space",
    data: [
      {
        id: nanoid(),
        title: "Work",
        img: work,
        alt: "work-img",
        route: "/spaces/work",
      },
      {
        id: nanoid(),
        title: "Notes",
        img: notepad,
        alt: "notes-img",
        route: "/spaces/notes",
      },
    ],
  });

  const [editOpen, setEditOpen] = useState(false);

  // Get the sidebar options
  // Get the options which comes after clicking on each activity
  // Get the options , which each of the option has after clicking
  // Get the collective Id with names on the right part
  // Use the id on the 3 point and 4th point to get data in the bigger menu

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const response = await axios.get("https://meseer.com/dog/spaces");
        setSpaceSubMenu(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Response Error:", error.response.data);
          console.error("Response Status:", error.response.status);
        } else if (error.request) {
          console.error("Request Error, no response received:", error.request);
        } else {
          console.error("Error in request setup:", error.message);
        }
      }
    };

    getSpaces();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        spaceSubMenu,
        setSpaceSubMenu,
        editOpen,
        setEditOpen,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuProvider };
