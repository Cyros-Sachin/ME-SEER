import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSidebarTracing } from "../../../contexts/SidebarTracing";
import { ModalContext } from "../../../../ModalComponent/context/ModalContext";
import {
  setSelectedColor,
  setSelectedTask,
} from "../../../../../pages/Goals/Redux/selectedTaskSlice";
import axios from "axios";

// Helper to assign random colors to goals
const getRandomColor = () => {
  const colors = ["red", "blue", "green", "purple", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const SidebarAdvancedGoals = ({ isExpanded }) => {
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [isTaskPopulated, setIsTaskPopulated] = useState(false);
  const [isItemsPopulated, setIsItemPopulated] = useState(false);

  const { updateSidebarUrl } = useSidebarTracing();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCombinedGoalsAndTasks = async () => {
      try {
        const response = await axios.get(
          `https://meseer.com/dog/get_all_goals_tasks/${localStorage.getItem(
            "userId"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = response.data;

        const transformedGoals = Object.entries(data)
          .map(([key, taskArray]) => {
            try {
              const cleanKey = key.replace(/^\[|\]$/g, ""); // removes [ and ]
              const [idStr, ...titleParts] = cleanKey.split(",");
              const goal_id = parseInt(idStr.trim());
              const title = titleParts.join(",").trim(); // Handles titles with commas too

              return {
                id: goal_id,
                title,
                color: getRandomColor(),
                tasks: taskArray.map((task) => ({
                  id: task.task_id,
                  title: task.task_name,
                  goal_id: task.goal_id,
                })),
                items: [],
              };
            } catch (err) {
              console.error("Error parsing key:", key, err);
              return null;
            }
          })
          .filter(Boolean);

        setGoals(transformedGoals);
      } catch (error) {
        console.error("Error fetching goals and tasks:", error);
      }
    };

    getCombinedGoalsAndTasks();
  }, []);

  const populateTask = (goalId) => {
    setIsTaskPopulated(true);
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;

    const newTasks = goal.tasks.map((task) => ({
      color: goal.color,
      ...task,
    }));
    setTasks(newTasks);
  };

  const populateItems = (goalId) => {
    setIsItemPopulated(true);
    const goal = goals.find((g) => g.id === goalId);
    if (!goal || !goal.items) return;

    const newItems = goal.items.map((item) => ({
      color: goal.color,
      ...item,
    }));
    setItems(newItems);
  };

  return (
    <div
      className={`text-xs z-40 fixed h-screen shadow-md p-2 ${
        isExpanded ? "w-[220px]" : "w-[70px] items-center"
      }`}
    >
      <div className="flex w-full items-center justify-between mt-4">
        <div
          onClick={() => updateSidebarUrl("/")}
          className="bg-black p-1 cursor-pointer ml-2"
        >
          <IoIosArrowBack size={15} color="white" />
        </div>
        {isExpanded && <div className="mr-16 text-lg">Goals</div>}
      </div>

      {/* Goals Section */}
      <div className="mt-4 p-2">
        <div className="text-gray-400 text-sm pb-2 border-b border-b-gray-300">
          Goals
        </div>
        <div className="mt-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex justify-between items-center mt-4"
            >
              <div>{goal.title}</div>
              <div
                onClick={() => populateTask(goal.id)}
                style={{
                  backgroundColor: goal.color,
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                <IoIosArrowForward size={10} color="white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      {/* Tasks Section */}
      <div className="mt-4 p-2">
        <div className="text-gray-400 text-sm pb-2 border-b border-b-gray-300">
          Tasks
        </div>
        <div className="mt-2 max-h-40 overflow-auto scrollbar">
          <div className="mt-2 max-h-40 overflow-auto scrollbar">
            {isTaskPopulated &&
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center mt-4"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", JSON.stringify(task));
                    // setDraggedTask(task); // <-- this line is important
                  }}
                >
                  <div>{task.title}</div>
                  <div
                    onClick={() => {
                      populateItems(task.goal_id);
                      dispatch(setSelectedTask(task.title));
                      dispatch(setSelectedColor(task.color));
                    }}
                    style={{
                      backgroundColor: task.color,
                      padding: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <IoIosArrowForward size={10} color="white" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="mt-4 p-2">
        <div className="text-gray-400 text-sm pb-2 border-b border-b-gray-300">
          Items
        </div>
        <div className="mt-2 max-h-40 overflow-auto scrollbar">
          {isItemsPopulated &&
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mt-4"
              >
                <div>{item.title}</div>
                <div
                  style={{
                    backgroundColor: item.color,
                    padding: "5px",
                    cursor: "pointer",
                  }}
                >
                  <IoIosArrowForward size={10} color="white" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarAdvancedGoals;
