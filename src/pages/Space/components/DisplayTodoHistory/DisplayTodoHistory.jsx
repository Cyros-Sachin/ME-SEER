import React, { useEffect, useState } from "react";
import "./DisplayTodoHistory.css";

function calculateWeekly(version) {
  // Get the current year
  let year = new Date().getFullYear();

  // Set the base date to January 4th to find week 1
  const week1 = new Date(year, 0, 4);

  // Calculate the first Monday of the year
  let monday = new Date(week1);
  monday.setDate(week1.getDate() - ((week1.getDay() + 6) % 7)); // Adjust to the first Monday of the year

  // Calculate the Monday of the desired week
  let mondayOfWeek = new Date(monday);
  mondayOfWeek.setDate(monday.getDate() + (version - 1) * 7); // Correctly reference monday.getDate()

  const day = "" + mondayOfWeek.getDay();
  const date = "" + mondayOfWeek.getDate();
  const month =
    mondayOfWeek.getMonth() + 1 <= 12
      ? "" + (mondayOfWeek.getMonth() + 1)
      : "" + 1;
  const years = mondayOfWeek.getFullYear();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    days[day] +
    " " +
    (date.length < 2 ? "0" + date : date) +
    "/" +
    (month.length < 2 ? "0" + month : month) +
    "/" +
    years
  );
}

function transformData(data) {
  const result = {};
  let months = [
    "0",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  data.forEach((item) => {
    console.log(item);
    let refresh_type = item.refresh_type;
    const date = new Date(item.last_updated);
    let version = item.version;
    let calculatedMonth = months[version];
    let calculatedWeeklyDate = calculateWeekly(version);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    // calculate the weekname first day and its date using version i.e week number and refresh_type

    if (refresh_type === "daily") {
      if (!result[formattedDate]) {
        result[formattedDate] = {
          date: formattedDate,
          content: [item],
        };
      } else {
        result[formattedDate].content.push(item);
      }
    } else if (refresh_type === "weekly") {
      if (!result[calculatedWeeklyDate]) {
        result[calculatedWeeklyDate] = {
          date: calculatedWeeklyDate,
          content: [item],
        };
      } else {
        result[calculatedWeeklyDate].content.push(item);
      }
    } else if (refresh_type === "monthly") {
      if (!result[calculatedMonth]) {
        result[calculatedMonth] = {
          date: calculatedMonth,
          content: [item],
        };
      } else {
        result[calculatedMonth].content.push(item);
      }
    }
  });
  return result;
}

// Example usage:
const DisplayTodoHistory = ({ historyElement }) => {
  const [historyShowcase, setHistoryShowcase] = useState([]);

  // Only if the version is not same , show the data

  useEffect(() => {
    // parse the history element according to the data
    const transformedData = transformData(historyElement);
    setHistoryShowcase(transformedData);
  }, [historyElement]);

  useEffect(() => {
    console.log(historyShowcase);
  }, [historyShowcase]);

  if (historyElement === "None") {
    return <div>No History</div>;
  }

  let Keys = Object.keys(historyShowcase);
  return (
    <div className="mt-2 p-1 overflow-auto">
      {Object.keys(historyShowcase).length === 0 ? (
        <div>No History</div>
      ) : (
        Object.entries(historyShowcase).map(([date, { content }]) => (
          <div key={date} className="w-full">
            <div className="font-semibold flex justify-center items-center bg-[#c4c4c452] text-black rounded-sm text-xs p-[2px]">
              {date.split("T")[0]}
            </div>
            <div className="content">
              {content.map((item) => (
                <div key={item.tc_id} className="flex p-1">
                  {" "}
                  {/* Use a unique key based on tc_id */}
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    className="checkbox"
                  />
                  <div className="ml-2 text-xs">{item.content}</div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayTodoHistory;
