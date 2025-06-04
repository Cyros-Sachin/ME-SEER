/**
 * Appview Component
 *
 * The main application view component that manages and displays different types of content blocks, such as To-Do items and Notepad entries.
 * It supports resizing of components through a state management system and dynamically renders content based on the type of data received.
 *
 * @component
 * @example
 * return (
 *   <Appview />
 * )
 *
 * @returns {JSX.Element} The main application view containing various dynamically loaded components.
 */

// Importing necessary libraries and components
import React, { useContext, useEffect, useState } from "react";
import "./app-view.css";

// Importing controllers
import contextController from "./context-controller";
import componentController from "./component-controller";
import assetController from "./asset-controller";

// Appview component definition
const Appview = () => {
  const [isResize, setIsResize] = useState(false); // State to track whether a component is in resize mode
  const [resizeItem, setResizeItem] = useState(); // State to hold the item being resized
  const { todos } = useContext(contextController.TodoContext); // Retrieve todos from context
  const { editOpen, setEditOpen } = useContext(contextController.MenuContext);
  const { spaceIdName, subSpaceIdName } = useContext(
    contextController.UserClickTracingContext
  );
  // sda
  // Handles the start of the resizing operation
  const handleResize = (index) => {
    setIsResize(true);
    setResizeItem(index);
  };

  // Handles the closure of the resizing operation
  const handleCloseResize = () => {
    setIsResize(false);
  };

  // Main return block rendering the components conditionally
  return (
    <div className={`appview-container-main`}>
      {isResize && (
        <contextController.ResizeProvider>
          <componentController.ResizeComponent
            todoItem={resizeItem}
            isResize={isResize}
            onClose={handleCloseResize}
          />
        </contextController.ResizeProvider>
      )}
      {/* <div
        style={{ fontFamily: "var(--primary-font-family)" }}
        className="text-xs font-semibold flex text-white p-2 tracking-wider "
      >
        <div className={`bg-[#000000] p-2 rounded-sm ml-6`}>
          {spaceIdName}
          {"  "}
          {">"}
          {"  "}

          {subSpaceIdName}
        </div>
      </div> */}
      <div
        className={`${
          todos.length > 0
            ? `lg:w-full md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 md:gap-10 lg:gap-10 xl:grid-cols-4 p-8`
            : "h-full w-full flex justify-center items-center"
        }`}
      >
        {todos && todos.length > 0 ? (
          todos.map((todo, index) => {
            return (
              <div
                className="md:w-72 relative flex justify-center w-full"
                key={todo.id}
              >
                {todo.type === "todo" ? (
                  <componentController.TodoComponent
                    id={todo.todo_id}
                    details={todo}
                    todoIndex={index}
                    handleResize={handleResize}
                  />
                ) : (
                  <componentController.Notepad
                    details={todo}
                    todoIndex={index}
                    handleResize={handleResize}
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="h-[35%] w-[35%] flex justify-center items-center mt-[10%] ">
            <img
              className="h-full w-full"
              src={assetController.emptyTodos}
              alt="notodos"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Appview;
