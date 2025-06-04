import { nanoid } from "nanoid";
import notepad from "../assets/hashtag.png";

// Function to handle sub-space addition
const handleSubSpaceAdd = (
  activeSubMenu,
  spaceSubMenu,
  activitySubMenu,
  setSpaceSubMenu,
  setActivitySubMenu,
  setActiveSubMenu
) => {
  if (activeSubMenu.name === "space") {
    // add to the space sub menu
    let newSpaceMenu = { ...spaceSubMenu };
    let newobj = {
      id: nanoid(),
      title: "Dummy",
      img: notepad,
      alt: "notes-img",
      route: "/spaces/notes",
    };

    newSpaceMenu.data.unshift(newobj);
    setSpaceSubMenu(newSpaceMenu);
    setActiveSubMenu(newSpaceMenu);
  } else if (activeSubMenu.name === "activity") {
    // add to the activity submenu
  }
};

export default handleSubSpaceAdd;
