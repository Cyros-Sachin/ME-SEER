import React, { useContext, useState, useEffect } from "react";
import "./todo-resize-component.css";
import contextController from "./context-controller";
import eventController from "../Todo/event-controllers/index";
import componentControllers from "../Todo/component-controllers/index";
import assetControllers from "../Todo/asset-controllers/index";
import useUserId from "../../../../global-custom-hooks/useUserId";
import DisplayTodoHistory from "../DisplayTodoHistory/DisplayTodoHistory";

const TodoResizeComponent = ({ todoItem }) => {
  const { todos, setTodos } = useContext(contextController.TodoContext);
  const { subSpaceClicked } = useContext(
    contextController.UserClickTracingContext
  );

  const [todayVersion, setTodayVersion] = useState(null);

  const userId = useUserId();
  const indexes = ["unchecked", "checked", "history"];
  const [index, setIndex] = useState(0);
  const [selectedPart, setSelectedPart] = useState(indexes[index]);
  const [content, setContent] = useState(todos[todoItem] || {});
  const [todoItems, setTodoItem] = useState(
    todos[todoItem]?.[indexes[index]] || []
  );

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
    if (todos[todoItem]) {
      setContent(todos[todoItem]);
      setTodoItem(todos[todoItem][selectedPart] || []);
    }
  }, [selectedPart, todos, todoItem]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!todos[todoItem]) {
          console.error(`Todo at index ${todoItem} is undefined.`);
          return;
        }

        const fetchedTodosHistory = await eventController.fetchTodoHistory(
          userId,
          subSpaceClicked,
          setTodoItem,
          todos[todoItem].todo_id
        );

        todos[todoItem].history = fetchedTodosHistory || [];
        setTodos([...todos]);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    if (selectedPart === "history" && todos[todoItem]) {
      fetchHistory();
    }
  }, [selectedPart, todos, todoItem, userId, subSpaceClicked, setTodos]);

  return (
    <div className="p-2">
      <div className="flex justify-between p-2">
        <div className="text-sm font-medium text-[#000000]">
          Refresh: {content.refresh_type}
        </div>
        <div className="flex items-center">
          <img
            onClick={() =>
              eventController.handleAddTodoListItem(todoItem, todos, setTodos)
            }
            src={assetControllers.add}
            className="h-4 mr-2 cursor-pointer"
            alt="add-item"
          />
          <img
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
            className="h-4 mr-2 cursor-pointer"
          />
          <img
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
            className="h-4 mr-2 cursor-pointer"
          />
        </div>
      </div>
      <div className="text-sm flex items-center w-[90%] p-2">
        <div className="resize-component-title text-xl">{content.name}</div>
      </div>
      <div className="resize-todo-component p-2">
        <div className="p-1 bg-black text-white rounded-sm">
          {selectedPart[0].toUpperCase() + selectedPart.slice(1)}
        </div>
        <div className="resize-todo-component-item-container">
          <div className="resize-todo-component-list-container">
            {selectedPart === "history" ? (
              <DisplayTodoHistory
                historyElement={todos[todoItem]?.history || "None"}
              />
            ) : todoItems && todoItems.length > 0 ? (
              todoItems.map((items, idx) => {
                console.log(items);
                return (
                  <componentControllers.TodoItem
                    key={idx}
                    itemdetail={items.content}
                    isUrgent={items.urgent}
                    isImportant={items.important}
                    todoIndex={todoItem}
                    arrayIndex={idx}
                    checkBox={items.checkbox}
                    todoContent_id={items.tc_id}
                    version={items.version}
                    todayVersion={todayVersion}
                  />
                );
              })
            ) : (
              <div className=""></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoResizeComponent;
