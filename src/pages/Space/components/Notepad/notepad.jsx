import React, { useState, useEffect, useContext, useRef } from "react";
import "./notepad.css";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

// Imports
import eventControllers from "./event-controllers";
import componentControllers from "./component-controllers";
import assetControllers from "./asset-controllers/index";
import contextController from "./context-controller";
import axios from "axios";
import useUserId from "../../../../global-custom-hooks/useUserId";
import DisplayHistory from "../DisplayHistoryComponent/DisplayHistory";

// Phospher icons

/**
 * @component
 * @name Notepad
 * @description A React component for displaying and managing a single todo item with interactive features.
 *
 * The `Notepad` component represents a todo item with capabilities for collapsing/expanding content, editing the header, deleting the item, and managing tags. It utilizes various controllers and context for state management and interacts with different assets for UI components.
 *
 * @param {Object} props - The properties for configuring the Notepad component.
 * @param {Object} props.details - Details of the todo item (currently not used directly in the component).
 * @param {number} props.todoIndex - The index of the todo item in the context's todos array.
 * @param {Function} props.handleResize - Function to handle resizing of the todo item.
 *
 * @returns {JSX.Element} The rendered Notepad component.
 */

const Notepad = ({ details, todoIndex, handleResize }) => {
  const { todos, setTodos } = useContext(contextController.TodoContext);

  //console.log(todos);

  // useState
  // const [content, setContent] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isHashTagOpen, setIsHashTagOpen] = useState(false);
  const [isHeaderClicked, setIsHeaderClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [headerInputValue, setHeaderInputValue] = useState("");
  const [showBasicBlock, setShowBasicBlock] = useState(false);
  const pages = ["currentPage", "history"];
  const [index, setIndex] = useState(0);
  const [showPage, setShowpage] = useState(pages[index]);
  const userId = useUserId();
  const [historyData, setHistoryData] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [todayVersion, setTodayVersion] = useState(null);

  // timer ref
  const [timer, setTimer] = useState(null);

  // useRef
  const headerInputRef = useRef(null);
  const deleteRef = useRef(null);

  useEffect(() => {
    setHeaderInputValue(todos[todoIndex].header);
  }, [todos]);

  useEffect(() => {
    console.log(loadingProgress);
  }, [loadingProgress]);

  useEffect(() => {
    console.log(todos[todoIndex]);
  }, [todos]);

  // Get the current version
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

  // useEffect(() => {
  //   if (isHeaderClicked) {
  //     let newTodos = [...todos];
  //     newTodos[todoIndex].header = headerInputValue;
  //     setTodos(newTodos);
  //   }
  // }, [headerInputValue]);

  useEffect(() => {
    console.log(historyData);
  }, [historyData]);

  useEffect(() => {
    let response = [];
    let historyResponse = [];
    const fetchWordpadHistory = async () => {
      try {
        response = await axios.get(
          `https://meseer.com/dog/get-versions/wordpads/${todos[todoIndex].wordpad_id}/${userId}/5`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        historyResponse = response.data;
        // const modifiedData = eventControllers.fetchWordpadHistory(
        //   historyResponse,
        //   todayVersion
        // );

        // setHistoryData(modifiedData);
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

  // Hovering button to detect the mouse properly

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
    return () => {
      clearTimeout(timer); // Cleanup timer on unmount
    };
  }, [timer]);

  // useEffect(() => {
  //   console.log(historyData);
  // }, [historyData]);

  return (
    <div
      id="portal-component"
      className={`${
        !isOpen ? `h-12` : `h-96`
      } relative border-t shadow-lg shadow-[#3737375f] rounded mt-2 mb-2 rounded-tl-lg rounded-tr-md rounded-br-lg border-b-2 border-b-black border-r-2 border-r-black w-5/6 flex flex-col`}
    >
      {/* <div className="bg-[#b7b7b72b] text-black flex items-center rounded-sm absolute -top-4 text-xs left-6 w-[35%] h-[6%] border-t border-r border-l border-black p-2">
        <img
          src={assetControllers.check}
          alt="check-fat"
          className="h-4 mr-1"
        />
        <div>{todos[todoIndex].refresh_type}</div>
        <div>{todos[todoIndex].wordpad_id}</div>
      </div> */}

      {showBasicBlock && (
        <div className="absolute z-10 left-3/4">
          <componentControllers.BasicBlock
            todoIndex={todoIndex}
            setShowBasicBlock={setShowBasicBlock}
          />
        </div>
      )}
      {isHovered && (
        <div
          ref={deleteRef}
          style={{ fontFamily: "var(--primary-font-family)" }}
          className="text-[#575757] p-1 cursor-pointer rounded-sm text-sm absolute left-[95%]  bg-black border-2 border-black flex justify-center items-center"
          onClick={() =>
            eventControllers.handleDeleteTodo(todos, todoIndex, setTodos)
          }
        >
          {/* Bin is here */}

          {/* <div className="mb-[2%] font-semibold">x</div> */}
          <RiDeleteBinLine color="white" size={20} />
        </div>
      )}
      <div className="border p-[2px] flex w-full items-center justify-between ">
        <div
          className="w-1/3 flex justify-center items-center"
          onClick={() => {
            eventControllers.handleToggleCollapse(isOpen, setIsOpen);
          }}
        >
          {isOpen ? (
            <IoIosArrowDown className="cursor-pointer" size={20} />
          ) : (
            <IoIosArrowUp className="cursor-pointer" size={20} />
          )}
          {/* <img
            src={isOpen ? assetControllers.uparrow : assetControllers.downarrow}
            alt="arrow"
            className="h-2 w-6"
          /> */}
        </div>
        {isHeaderClicked ? (
          <input
            ref={headerInputRef}
            className="text-xs font-semibold flex w-full justify-center h-12 items-center"
            value={headerInputValue}
            autoFocus
            onChange={(e) =>
              eventControllers.handleHeaderInputValue(
                e,
                setHeaderInputValue,
                todos,
                todoIndex,
                setTodos
              )
            }
          />
        ) : (
          <div
            onClick={() =>
              eventControllers.handleHeaderClicked(setIsHeaderClicked)
            }
            style={{ fontFamily: "var(--primary-font-family" }}
            className="text-xs font-semibold flex w-full justify-center h-12 items-center"
          >
            {todos[todoIndex]?.header
              ? todos[todoIndex].header.toUpperCase()
              : "No Title"}
            {todos[todoIndex].wordpad_id}
          </div>
        )}

        <div
          style={{ fontFamily: "var(--primary-font-family)" }}
          className="font-semibold flex h-4 w-6 mb-8 items-center ml-2 text-xs bg-[#ffa0a043]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>
      </div>
      {isOpen ? (
        <div className="h-full flex justify-center rounded-br-md ">
          <div className="w-[95%] h-full border-t-2 border-t-black mb-2 flex flex-col justify-between">
            <div
              onClick={(e) =>
                eventControllers.handleNotepadBodyClick(
                  e,
                  todos,
                  todoIndex,
                  setTodos
                )
              }
              className={`${
                isHashTagOpen ? `h-52` : `h-72`
              } overflow-auto mt-1 flex flex-col rounded-br-md scroll-container`}
            >
              {showPage === "currentPage" ? (
                todos[todoIndex] &&
                todos[todoIndex].sections &&
                todos[todoIndex].contents &&
                todos[todoIndex].sections.length > 0 ? (
                  todos[todoIndex].sections.map((item, index) => {
                    return (
                      <componentControllers.NotepadItem
                        key={item.id}
                        item={item}
                        todoIndex={todoIndex}
                        noteItemIndex={index}
                        setShowBasicBlock={setShowBasicBlock}
                        version={
                          todos?.[todoIndex]?.contents?.[index]?.version ??
                          "No Version"
                        }
                        todayVersion={todayVersion ?? "No Today Version"}
                      />
                    );
                  })
                ) : (
                  <div>No items..</div>
                )
              ) : historyData && historyData.length > 0 ? (
                <DisplayHistory history={historyData} />
              ) : (
                <div>
                  <img
                    src={assetControllers.noHistoryDoodle}
                    alt="no-history"
                  />
                </div>
              )}
            </div>
            <div className="items-center flex flex-col mb-3">
              <div className="w-full flex justify-between">
                <div className="text-[10px] p-1 font-semibold text-white bg-[#000000] ml-2 rounded-sm">
                  {todos[todoIndex]?.refresh_type
                    ? todos[todoIndex].refresh_type.toUpperCase()
                    : "No Refresh Type"}
                </div>
                <div className="flex justify-end items-center">
                  <div className="h-4 mr-1">
                    <componentControllers.SpeechToText todoIndex={todoIndex} />
                  </div>
                  <img
                    className="h-4 mr-1"
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
                    className="h-4 mr-1"
                    src={assetControllers.back}
                    alt="back-img"
                    onClick={() => {
                      setIndex(0);
                      setShowpage(pages[0]);
                    }}
                  />
                  <img
                    className="h-4 mr-1"
                    src={assetControllers.forward}
                    alt="forward-img"
                    onClick={() => {
                      setIndex(0);
                      setShowpage(pages[1]);
                    }}
                  />
                  <img
                    className="h-3 mr-1"
                    src={assetControllers.resize}
                    alt="resize-img"
                    onClick={() => handleResize(todoIndex)}
                  />
                </div>
              </div>

              {isHashTagOpen && (
                <div className="grid grid-cols-3 h-14 overflow-auto">
                  {todos[todoIndex].hastags.map((hashtag) => {
                    return (
                      <div
                        className="w-18 p-2 flex justify-center items-center text-xs text-white rounded-sm m-1"
                        style={{
                          minWidth: "30px",
                          background: eventControllers.getRandomColor(
                            todos[todoIndex].highlightColors
                          ),
                        }}
                      >
                        {hashtag}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notepad;
