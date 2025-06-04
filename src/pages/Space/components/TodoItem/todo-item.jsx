import React, { useEffect, useState, useRef, useContext } from "react";
import "./todo-item.css";

import eventControllers from "./event-controllers";
import contextController from "./context-controller";
import useTypingStatus from "../../custom-hooks/useTypingStatus";

const TodoItem = ({
  itemdetail,
  isImportant,
  isUrgent,
  todoIndex,
  arrayIndex,
  checkBox,
  detail,
  selectedPart,
  todoContent_id,
  version,
  todayVersion,
  index,
}) => {
  // Local state management
  const { todos, setTodos } = useContext(contextController.TodoContext);
  const [isUrgentCheck, setIsUrgent] = useState(isUrgent);
  const [isImportantCheck, setIsImportant] = useState(isImportant);
  const [isChecked, setIsChecked] = useState(checkBox);
  const [isEditable, setIsEditable] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState(itemdetail);
  const [todoContentId, setTodoContentId] = useState(todoContent_id);

  const inputRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    setInputValue(itemdetail);
  }, [itemdetail]);

  useEffect(() => {
    setTodoContentId(todoContent_id);
  }, [todoContent_id]);

  useEffect(() => {
    setIsChecked(checkBox);
  }, [checkBox]);

  useEffect(() => {
    console.log("Running");
    inputRef.current?.focus();
  }, []);

  const handleClickOutside = (e) => {
    if (itemRef.current && !itemRef.current.contains(e.target)) {
      setIsEditable(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (version !== todayVersion && selectedPart !== "history") return null;

  return (
    <div
      ref={itemRef}
      className={`flex min-h-8 items-center text-xs tracking-wide ${
        index === 0 ? "mt-4" : "mt-1"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-[10px] flex flex-col items-center">
        <div
          className={`option ${
            isUrgentCheck ? `text-black font-bold` : "text-[#6c6c6c]"
          } cursor-pointer`}
          onClick={() =>
            eventControllers.handleUrgentClick(
              setIsUrgent,
              isUrgentCheck,
              todoContentId
            )
          }
        >
          U
        </div>
        <div
          className={`option ${
            isImportantCheck ? `text-black font-bold` : "text-[#6c6c6c]"
          } cursor-pointer`}
          onClick={(e) =>
            eventControllers.handleImportantClick(
              setIsImportant,
              isImportantCheck,
              todoContentId
            )
          }
        >
          I
        </div>
      </div>
      <div className="checkbox-controller">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) =>
            eventControllers.handleCheckBox(
              e,
              setIsChecked,
              isChecked,
              todos,
              todoIndex,
              arrayIndex,
              setTodos,
              detail
            )
          }
        />
      </div>
      {isEditable || inputValue === "" ? (
        <input
          ref={inputRef}
          className="todo-item-input"
          type="text"
          value={inputValue}
          onBlur={() => setIsEditable(false)}
          onKeyDown={(e) =>
            eventControllers.handleEnterButton(
              e,
              todoIndex,
              todos,
              setTodos,
              "S"
            )
          }
          onChange={(e) =>
            eventControllers.handleInputItemTodoChange(
              e,
              setInputValue,
              todos,
              todoIndex,
              arrayIndex,
              setTodos,
              detail,
              isEditable,
              setIsEditable,
              isChecked
            )
          }
        />
      ) : (
        inputValue !== "" && (
          <div className="todo-name" onClick={() => setIsEditable(true)}>
            <div className="w-[80%]">{itemdetail}</div>
            {isHovered && (
              <span
                className="delete-icon mr-4"
                onClick={(e) =>
                  eventControllers.handleDeleteItem(
                    e,
                    todos,
                    todoIndex,
                    arrayIndex,
                    setTodos,
                    isChecked,
                    detail
                  )
                }
              >
                &times;
              </span>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default TodoItem;
