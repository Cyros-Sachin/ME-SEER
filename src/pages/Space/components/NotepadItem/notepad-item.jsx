import React, { useContext, useEffect, useState, useRef } from "react";
import useWindowSize from "../../custom-hooks/useWindowSize";

import "./notepad-item.css";
import eventController from "./event-controller";
import assetControllers from "./asset-controller/index";
import contextController from "./context-controller";

const NotepadItem = ({
  item,
  noteItemIndex,
  todoIndex,
  setShowBasicBlock,
  version,
  todayVersion,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { todos, setTodos } = useContext(contextController.TodoContext);
  const [notepadInputItem, setNotePadInputItem] = useState(
    todos[todoIndex].sections[noteItemIndex].content
  );
  const [isNotePadItemClicked, setIsNotePadItemClicked] = useState(true);

  const notepadRef = useRef(null);
  const notepadInputRef = useRef(null); // Ref for autofocus

  const { width } = useWindowSize();

  useEffect(() => {
    setNotePadInputItem(todos[todoIndex].sections[noteItemIndex].content);
  }, [todos]);

  useEffect(() => {
    const newTodos = [...todos];
    newTodos[todoIndex].sections[noteItemIndex].content = notepadInputItem;
    setTodos(newTodos);
  }, [notepadInputItem]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      eventController.handleClickOutside(
        e,
        notepadRef,
        setIsNotePadItemClicked,
        setShowBasicBlock
      );
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [todos, setTodos, todoIndex, noteItemIndex, notepadInputItem]);

  // Automatically focus input on first render
  useEffect(() => {
    if (notepadInputRef.current) {
      notepadInputRef.current.focus();
    }
  }, []);

  const handleMouseEnter = () => {
    if (width >= 1024) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (width >= 1024) {
      setIsHovered(false);
    }
  };

  const shouldShowControls = width < 1024 || isHovered;

  return (
    <div
      className="items-center flex mt-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Notepad item"
      ref={notepadRef}
      draggable
      onDragStart={(e) =>
        eventController.handleDragStart(e, todoIndex, noteItemIndex)
      }
      onDragOver={(e) => eventController.handleDragOver(e)}
      onDrop={(e) =>
        eventController.handleDrop(e, todos, setTodos, todoIndex, noteItemIndex)
      }
    >
      {shouldShowControls ? (
        <div className="h-4 w-8 flex items-center">
          <img
            className="h-full"
            onClick={(e) =>
              eventController.handleAddItemBasicBlock(e, setShowBasicBlock)
            }
            src={assetControllers.plus}
            alt="Add new item"
            aria-label="Add new item"
            role="button"
          />
          <img
            className="h-full"
            onClick={(e) => e.stopPropagation()}
            src={assetControllers.drag}
            alt="Drag item"
            aria-label="Drag item"
            role="button"
          />
        </div>
      ) : null}
      <div className="notepad-item-container">
        {item.type === "numbered" ? (
          eventController.renderedNumberedList(noteItemIndex, todos, todoIndex)
        ) : item.type === "bullet" ? (
          <div className="dot-container-main">
            <img src={assetControllers.dot} alt="bullet-points-img" />
          </div>
        ) : null}
        <input
          ref={notepadInputRef} // AutoFocus on first render
          onKeyDown={(e) =>
            eventController.handleBackSpaceChannel(
              e,
              notepadInputItem,
              todos,
              setTodos,
              todoIndex,
              noteItemIndex,
              setShowBasicBlock
            )
          }
          onClick={(e) =>
            eventController.handleNotePadItemClicked(e, setIsNotePadItemClicked)
          }
          type="text"
          id="tab-input"
          value={notepadInputItem}
          onChange={(e) =>
            eventController.handleNotePadInputItem(
              e,
              setNotePadInputItem,
              todos,
              todoIndex,
              noteItemIndex
            )
          }
          className="w-full outline-none"
          style={{
            fontSize: item.type === "header" ? "24px" : "14px",
            fontFamily: "var(--primary-font-family)",
          }}
          placeholder={
            item.type === "header"
              ? "Heading"
              : item.type === "numbered"
              ? "List"
              : item.type === "bullet"
              ? "List"
              : "Text"
          }
        />
      </div>
    </div>
  );
};

export default NotepadItem;
