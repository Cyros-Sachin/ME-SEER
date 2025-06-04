import React, { useContext, useEffect, useRef } from "react";
import "./resize.css";
import ReactDOM from "react-dom";

import contextController from "./context-controller";
import assetController from "./asset-controller";
import componentController from "./component-controller";
import { SidebarContext } from "../sidebar/contexts/sidebar-context";
import MealResize from "../../pages/Activity/components/meal-resize/meal-resize";

/**
 * ResizeComponent
 *
 * A React component designed to manage the resizing and display of to-do or notepad items.
 * It handles events such as clicks outside the component to close it and integrates with
 * context to manage global state.
 *
 * @component
 * @param {Object} props - The properties to configure the ResizeComponent.
 * @param {number} props.todoItem - The index of the to-do item to be displayed in the resize component.
 * @param {boolean} props.isResize - A flag indicating whether the component should be in a resized (expanded) state.
 * @param {function} props.onClose - A callback function to close the component when clicking outside of it.
 *
 * @returns {JSX.Element} The rendered ResizeComponent.
 */

const ResizeComponent = ({ todoItem, isResize, onClose }) => {
  const resizeRef = useRef(null);
  const { todos, setTodos } = useContext(contextController.TodoContext);

  // Activity
  const { isMealOpen, setIsMealOpen } = useContext(SidebarContext);
  const handleResizeClose = () => {
    setIsMealOpen(false);
  };

  useEffect(() => {
    // Function to handle click outside of the component
    const handleClickOutside = (event) => {
      if (resizeRef.current && !resizeRef.current.contains(event.target)) {
        const newTodos = [...todos];
        setTodos(newTodos);
        onClose(); // Close the component if the click is outside
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      ref={resizeRef}
      className={`resize-main ${isResize ? "openMain" : "closeMain"}`}
    >
      <div className="resize-header-control-container">
        <div>
          <img src={assetController.collapse} alt="collapse" />
          <img src={assetController.up} alt="up" />
          <img src={assetController.down} alt="down" />
        </div>
        <div>
          <img src={assetController.settings} alt="settings" />
        </div>
      </div>
      <div className="resize-component-content-display-container">
        {todos[todoItem].type === "todo" ? (
          <componentController.TodoResizeComponent todoItem={todoItem} />
        ) : (
          <componentController.NotepadResizeComponent todoItem={todoItem} />
        )}
      </div>
    </div>,
    document.getElementById("resize")
  );
};

export default ResizeComponent;
