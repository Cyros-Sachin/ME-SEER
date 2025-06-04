import React, { useState, useEffect, useContext, useRef } from "react";
import "./notepad-resize-component.css";
import axios from "axios";

// Providers and Context

// Imports
import eventControllers from "./../Notepad/event-controllers/index";
import componentControllers from "./../Notepad/component-controllers/index";
import assetControllers from "./../Notepad/asset-controllers/index";
import contextController from "./context-controller";
import DisplayHistory from "../DisplayHistoryComponent/DisplayHistory";

/**
 * @component
 * @name NotepadResizeComponent
 * @description A React component designed to handle resizing and managing a todo item within a notepad. It includes features such as editing the header, showing hashtags, and rendering the content of the todo item.
 *
 * The `NotepadResizeComponent` is responsible for managing the layout and content of a todo item, including interactive features like resizing, editing, and displaying additional options. It provides functionality to toggle hashtags, handle outside clicks, and render notepad items.
 *
 * @param {Object} props - The properties for configuring the NotepadResizeComponent.
 * @param {number} props.todoItem - The index of the todo item to manage.
 *
 * @returns {JSX.Element} The rendered NotepadResizeComponent.
 */

const NotepadResizeComponent = ({ todoItem }) => {
  // todoItem is actually the todoItem index only , so we can use it in place of todoitem index

  const { todos, setTodos } = useContext(contextController.TodoContext);

  // useState
  const [isOpen, setIsOpen] = useState(true);
  const [isHashTagOpen, setIsHashTagOpen] = useState(false);
  const [isHeaderClicked, setIsHeaderClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [headerInputValue, setHeaderInputValue] = useState("");
  const [showBasicBlock, setShowBasicBlock] = useState(false);

  const pages = ["currentPage", "history"];
  const [index, setIndex] = useState(0);
  const [showPage, setShowpage] = useState(pages[index]);
  const [historyData, setHistoryData] = useState([]);
  const [todayVersion, setTodayVersion] = useState(null);
  const userId = localStorage.getItem("userId");

  // useRef
  const headerInputRef = useRef(null);
  const deleteRef = useRef(null);

  useEffect(() => {
    let daily, weekly, monthly;

    // Get the current version i.e. today.
    let refreshType = todos[todoItem].refresh_type;

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
  }, [todos, todoItem]);

  useEffect(() => {
    let response = [];
    let historyResponse = [];
    const fetchWordpadHistory = async () => {
      try {
        response = await axios.get(
          `https://meseer.com/dog/get-versions/wordpads/${todos[todoItem].wordpad_id}/${userId}/5`
        );
        historyResponse = response.data;
        // const modifiedData = eventControllers.fetchWordpadHistory(
        //   historyResponse,
        //   todayVersion
        // );
        setHistoryData(historyResponse);
      } catch (err) {
        setHistoryData([]);
      }
    };

    if (showPage === "history") {
      fetchWordpadHistory();
    }
  }, [showPage]);

  useEffect(() => {
    setHeaderInputValue(todos[todoItem].header);
    console.log(todoItem);
  }, todoItem);

  // useEffect(() => {
  //   if (isHeaderClicked) {
  //     let newTodos = [...todos];
  //     newTodos[todoItem].header = headerInputValue;
  //     setTodos(newTodos);
  //   }
  // }, [headerInputValue, isHeaderClicked, todos, todoItem]); // Added necessary dependencies

  useEffect(() => {
    const handleOutsideClick = (e) => {
      eventControllers.handleClickOutside(
        e,
        headerInputRef,
        deleteRef,
        setIsHeaderClicked,
        setIsHovered
      );
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [headerInputRef, deleteRef]);

  return (
    <div className="notepad-resize-component-container">
      {showBasicBlock && (
        <contextController.BasicBlockProvider>
          <div className="notepad-basic-block">
            <componentControllers.BasicBlock
              todoIndex={todoItem}
              setShowBasicBlock={setShowBasicBlock}
            />
          </div>
        </contextController.BasicBlockProvider>
      )}
      <div className="notepad-resize-page-control">
        <div></div>
        <div>
          <componentControllers.SpeechToText todoIndex={todoItem} />
          <img
            src={assetControllers.hastag}
            alt="add-item"
            onClick={() =>
              eventControllers.handleHashTagControllers(
                setIsHashTagOpen,
                isHashTagOpen
              )
            }
          />
          <img
            src={assetControllers.back}
            onClick={() => {
              setIndex(0);
              setShowpage(pages[0]);
            }}
            alt="back-img"
          />
          <img
            src={assetControllers.forward}
            onClick={() => {
              setIndex(0);
              setShowpage(pages[1]);
            }}
            alt="forward-img"
          />
          <img src={assetControllers.resize} alt="resize-img" />
        </div>
      </div>
      {isHashTagOpen && (
        <div className="hashtag-container notepad-resize-hashtag-container">
          {todos[todoItem].hastags.map((hashtag) => {
            return (
              <div
                className="hashtag-item"
                style={{
                  minWidth: "30px",
                  background: eventControllers.getRandomColor(
                    todos[todoItem].highlightColors
                  ),
                }}
              >
                {hashtag}
              </div>
            );
          })}
        </div>
      )}
      <div className="todo-control-handlers">
        {isHeaderClicked ? (
          <input
            ref={headerInputRef}
            className="notepad-resize-header-content"
            value={headerInputValue}
            onChange={(e) =>
              eventControllers.handleHeaderInputValue(
                e,
                setHeaderInputValue,
                todos,
                todoItem,
                setTodos
              )
            }
          />
        ) : (
          <div
            onClick={() =>
              eventControllers.handleHeaderClicked(setIsHeaderClicked)
            }
            className="notepad-resize-todo-title"
          >
            {todos[todoItem].header}
          </div>
        )}
        <div className="todo-setting" onMouseEnter={() => setIsHovered(true)}>
          {/* Optionally, add more settings content here */}
        </div>
      </div>

      <div
        onClick={(e) =>
          eventControllers.handleNotepadBodyClick(e, todos, todoItem, setTodos)
        }
        className="notepad-resize-component-items"
      >
        {showPage === "currentPage" ? (
          todos[todoItem].sections && todos[todoItem].sections.length > 0 ? (
            // todos[todoIndex].contents[0].version === todayVersion ? (
            todos[todoItem].sections.map((item, index) => (
              <componentControllers.NotepadItem
                key={item.id}
                item={item}
                todoIndex={todoItem}
                noteItemIndex={index}
                setShowBasicBlock={setShowBasicBlock}
              />
            ))
          ) : (
            <div>No items..</div>
          )
        ) : historyData && historyData.length > 0 ? (
          <DisplayHistory history={historyData} />
        ) : (
          <div>
            <img src={assetControllers.noHistoryDoodle} alt="no-history" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotepadResizeComponent;
