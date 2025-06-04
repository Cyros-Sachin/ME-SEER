import React from "react";
import "./space.css";

// controllers
import componentController from "./controllers/component-controller";
import contextController from "./controllers/context-controller";

const Space = () => {
  return (
    <>
      <componentController.SidebarAdvanced />
      {/* <componentController.Sidebar /> */}
      <contextController.NotepadProvider>
        <componentController.Appview />
      </contextController.NotepadProvider>
    </>
  );
};

export default Space;
