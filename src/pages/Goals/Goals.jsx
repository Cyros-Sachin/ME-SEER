import React, { useState, useEffect } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import axios from "axios";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import SidebarAdvanced from "../../common-components/SidebarAdvanced/SidebarAdvanced";

const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(BigCalendar);

const MyCalendar = ({ events, draggedTask, setDraggedTask }) => {
  const handleDropFromOutside = ({ start }) => {
    if (!draggedTask) return;

    const newEvent = {
      title: draggedTask.title,
      start: new Date(start),
      end: new Date(start.getTime() + 60 * 60 * 1000), // 1 hour
      color: draggedTask.color || "blue",
    };

    setDraggedTask(null);
  };

  const dragFromOutsideItem = () => draggedTask;

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color || "red",
      color: "white",
      borderRadius: "5px",
      padding: "5px",
      border: "none",
    },
  });

  return (
    <div className="h-[750px]">
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 750 }}
        selectable
        onDropFromOutside={handleDropFromOutside}
        dragFromOutsideItem={dragFromOutsideItem}
        eventPropGetter={eventStyleGetter}
        defaultView="week"
        views={["month", "week", "day"]}
      />
    </div>
  );
};

const Goals = () => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [todoIds, setTodoIds] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId || todoIds.length === 0) return;

      try {
        const allTasks = [];

        for (const todoId of todoIds) {
          const res = await axios.get(
            `https://meseer.com/dog/todos/${todoId}/${userId}`
          );

          const tasks = res.data.map((item) => ({
            title: item.title,
            start: new Date(item.start),
            end: new Date(item.end),
            color: item.color || "blue",
          }));

          allTasks.push(...tasks);
        }

        setEvents(allTasks);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, [todoIds]);

  return (
    <>
      <SidebarAdvanced
        setDraggedTask={setDraggedTask}
        setTodoIds={setTodoIds}
      />
      <div className="flex flex-col min-h-screen relative ml-[220px] bg-[#ffffff] p-2">
        <MyCalendar
          events={events}
          draggedTask={draggedTask}
          setDraggedTask={setDraggedTask}
        />
      </div>
    </>
  );
};

export default Goals;
