import React, { useEffect, useState, useRef } from "react";
import "./todo-component.css";
import axios from "axios";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

// Controllers
import componentControllers from "./component-controllers/index";
import eventController from "./event-controllers/index";
import assetControllers from "./asset-controllers/index";
import contextController from "./context-controller";
import { useContext } from "react";
import useUserId from "../../../../global-custom-hooks/useUserId";
import DisplayTodoHistory from "../DisplayTodoHistory/DisplayTodoHistory";

const TodoComponent = ({ details, todoIndex, handleResize, id }) => {
  const { todos, setTodos } = useContext(contextController.TodoContext);
  const { spaceIdSelected, subSpaceClicked } = useContext(
    contextController.UserClickTracingContext
  );

  const [isOpen, setIsOpen] = useState(true);
  const [isUrgent, setIsUrgent] = useState(todos[todoIndex].urgent);
  const [isImportant, setIsImportant] = useState(todos[todoIndex].important);

  const [content, setContent] = useState([]);
  const userId = useUserId();
  const [todoDetails, setTodoDetails] = useState([]);

  const [isEditing, setIsEditing] = useState(false); // State to track if the name is being edited
  const [newName, setNewName] = useState(content.name); // State to store the new name

  const indexes = ["unchecked", "checked", "history"];
  const [index, setIndex] = useState(0); // Start with unchecked by default
  const [selectedPart, setSelectedPart] = useState(indexes[index]);
  const [timer, setTimer] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const deleteRef = useRef(null);

  const [todayVersion, setTodayVersion] = useState(null);

  useEffect(() => {
    let daily, weekly, monthly;

    // Get the current version i.e. today.
    let refreshType = todos[todoIndex].refresh_type;

    const now = new Date();

    if (refreshType === "daily") {
      // Get the current day of the year (1 to 365/366)
      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now - startOfYear;
      const oneDay = 1000 * 60 * 60 * 24;
      daily = Math.floor(diff / oneDay);
      console.log("Current Day of the Year:", daily);
      setTodayVersion(daily);
    }

    if (refreshType === "weekly") {
      // Get the current week number (ISO week: Monday as the first day)
      const startOfISOYear = new Date(now.getFullYear(), 0, 4); // Jan 4 is always in week 1
      const diffInDays = Math.floor(
        (now - startOfISOYear) / (1000 * 60 * 60 * 24)
      );
      weekly = Math.ceil((diffInDays + startOfISOYear.getDay() + 1) / 7);
      console.log("Current Week of the Year:", weekly);
      setTodayVersion(weekly);
    }

    if (refreshType === "monthly") {
      // Get the current month of the year (1 to 12)
      monthly = now.getMonth() + 1;
      console.log("Current Month of the Year:", monthly);
      setTodayVersion(monthly);
    }
  }, [todos, todoIndex]);

  const handleMouseEnter = () => {
    setTimer(
      setTimeout(() => {
        setIsHovered(true);
      }, 600)
    ); // Hover for 5 seconds
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    // setIsHovered(false);
  };

  useEffect(() => {
    setContent(details);
    setTodoDetails(details[indexes[index]]);
  }, [details, index]);

  console.log(todoDetails);

  useEffect(() => {
    const fetchHistory = async () => {
      console.log(
        "To check wheather history is there or not :",
        todos[todoIndex]
      );
      try {
        if (!todos[todoIndex]) {
          console.error(`Todo at index ${todoIndex} is undefined.`);
          return;
        }

        const fetchedTodosHistory = await eventController.fetchTodoHistory(
          userId,
          subSpaceClicked,
          setTodoDetails,
          todos[todoIndex].todo_id
        );

        let newTodos = [...todos];
        let copyOfTodo = { ...newTodos[todoIndex] };

        if (!copyOfTodo.history) {
          copyOfTodo.history = [];
        }

        copyOfTodo.history = fetchedTodosHistory;
        newTodos[todoIndex] = copyOfTodo;

        console.log(newTodos);
        setTodos(newTodos);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    if (selectedPart === "history" && todos[todoIndex]) {
      fetchHistory();
    }
  }, [selectedPart]);

  // When the tododetails will come up
  useEffect(() => {
    console.log(todoDetails);
  }, [todoDetails]);

  // Method to handle name change
  const handleNameChange = (e) => {
    setNewName(e.target.value); // Update the name as the user types
  };

  const handleBlur = async () => {
    setIsEditing(false); // Stop editing when the user clicks outside
    let data = {
      space_id: spaceIdSelected,
      subspace_id: todos[todoIndex].subspace_id,
      user_id: userId,
      refresh_type: todos[todoIndex].refresh_type,
      name: newName,
      last_state: true,
    };

    console.log(todos[todoIndex].subspace_id);

    try {
      // Make the API call to update the name in the database
      const response = await axios.put(
        `https://meseer.com/dog/todos/${todos[todoIndex].todo_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update the content with the new name
      todos[todoIndex].name = newName;
      setTodos([...todos]);
    } catch (error) {
      console.error("Error updating the name:", error);
    }
  };

  const handleFocus = () => {
    setIsEditing(true); // Start editing when the user clicks on the name
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      eventController.handleClickOutside(e, deleteRef, setIsHovered);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [deleteRef]);

  return (
    <div
      className={`${
        !isOpen ? `h-12` : `h-96`
      } shadow-lg shadow-[#3737375f] border-t mt-2 mb-2 rounded rounded-tl-lg rounded-tr-md rounded-br-lg border-b-2 items-center justify-between border-b-black border-r-2 border-r-black  w-5/6 flex flex-col`}
    >
      {isHovered && (
        <div
          ref={deleteRef}
          style={{ fontFamily: "var(--primary-font-family)" }}
          className="text-[#575757] p-1 cursor-pointer rounded-sm text-sm absolute left-[88%] top-[2%]  bg-black border-2 border-black flex justify-center items-center"
          onClick={() =>
            // eventControllers.handleDeleteTodo(todos, todoIndex, setTodos)

            // Delete Todo
            eventController.handleDeleteTodoComponent(
              todos,
              todoIndex,
              setTodos
            )
          }
        >
          {/* Bin is here */}

          {/* <div className="mb-[2%] font-semibold">x</div> */}
          <RiDeleteBinLine color="white" size={20} />
        </div>
      )}

      {/* <div className="bg-[#b7b7b72b] text-black flex items-center rounded-sm absolute -top-2 text-xs left-6 w-[35%] h-[6%] border-t border-r border-l border-black p-2">
        <img
          src={assetControllers.notepadAssetController.check}
          alt="check-fat"
          className="h-4 mr-1"
        />
        <div>{todos[todoIndex].refresh_type}</div>
        <div>{todos[todoIndex].todo_id}</div>
      </div> */}

      <div className="flex w-full h-12 items-center justify-center ">
        <div
          onClick={() => eventController.handleTodoCollapse(isOpen, setIsOpen)}
          className="w-1/3 flex justify-center items-center"
        >
          {isOpen ? (
            <IoIosArrowDown className="cursor-pointer" size={20} />
          ) : (
            <IoIosArrowUp className="cursor-pointer" size={20} />
          )}
          {/* <img
            className="w-4"
            src={isOpen ? assetControllers.uparrow : assetControllers.downarrow}
            alt="arrow"
          /> */}
        </div>

        {/* Name Section */}
        <div className="font-semibold flex w-2/3 h-12 items-center ml-2">
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              onBlur={handleBlur} // Trigger blur to save changes
              autoFocus
              className="text-md font-semibold flex w-full h-12 justify-start items-center ml-2 pl-2"
            />
          ) : (
            <div
              onClick={handleFocus} // Enable editing on click
              style={{ fontFamily: "var(--primary-font-family)" }}
              className="text-xs text-wrap font-semibold flex w-full justify-start h-12 items-center ml-2"
            >
              {content.name}
              {content.todo_id}
            </div>
          )}
        </div>

        <div
          style={{ fontFamily: "var(--primary-font-family)" }}
          className="font-semibold flex h-4 w-5 mr-1 mb-6 items-center ml-2 text-xs bg-[#ffa0a043]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>

        <div className="todo-setting">
          {/* <img src={assetControllers.settings} alt="todo-settings" /> */}
        </div>
      </div>
      {isOpen ? (
        <div className="w-full h-[90%] flex justify-center rounded-br-md">
          <div className="w-[95%] h-full border-t-2 border-t-black mb-2 flex flex-col justify-between ">
            <div className="todo-list-items h-[100%] overflow-auto">
              <div className="text-xs p-1 w-full mt-2 bg-[#000000] text-white font-semibold rounded-sm">
                {indexes[index][0].toUpperCase() + indexes[index].slice(1)}
              </div>
              {selectedPart === "checked" ||
              (selectedPart === "unchecked" && todoDetails?.length > 0) ? (
                todoDetails.map((item, i) => (
                  <componentControllers.TodoItem
                    key={i}
                    itemdetail={item.content}
                    isUrgent={item.urgent}
                    isImportant={item.important}
                    todoIndex={todoIndex}
                    arrayIndex={i}
                    checkBox={item.checked} // Reflecting checked status
                    detail={item}
                    selectedPart={selectedPart}
                    todoContent_id={item.tc_id}
                    version={item.version}
                    todayVersion={todayVersion}
                    index={i}
                  />
                ))
              ) : selectedPart === "history" &&
                todos?.[todoIndex]?.history?.length > 0 ? (
                <DisplayTodoHistory
                  historyElement={todos[todoIndex].history || "None"}
                />
              ) : null}
            </div>

            <div className="flex justify-between items-center mb-3">
              <div className="text-[10px] p-1 font-semibold text-white bg-[#000000] ml-2 rounded-sm">
                {todos[todoIndex].refresh_type.toUpperCase()}
              </div>
              <div className="flex w-1/3 justify-between items-center h-full">
                <img
                  className="h-4 cursor-pointer mr-1"
                  src={assetControllers.add}
                  alt="add-item"
                  onClick={() =>
                    eventController.handleAddTodoListItem(
                      todoIndex,
                      todos,
                      setTodos,
                      details
                    )
                  }
                />
                <img
                  className="h-4 mr-1 cursor-pointer"
                  onClick={() =>
                    eventController.handlePagesController(
                      index - 1,
                      setIndex,
                      indexes,
                      index,
                      setSelectedPart
                    )
                  }
                  src={assetControllers.back}
                  alt="back-img"
                />
                <img
                  className="h-4 mr-1 cursor-pointer"
                  onClick={() =>
                    eventController.handlePagesController(
                      index + 1,
                      setIndex,
                      indexes,
                      index,
                      setSelectedPart
                    )
                  }
                  src={assetControllers.forward}
                  alt="forward-img"
                />
                <img
                  className="h-3 mr-1 cursor-pointer"
                  src={assetControllers.resize}
                  alt="resize-img"
                  onClick={() => handleResize(todoIndex)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TodoComponent;
