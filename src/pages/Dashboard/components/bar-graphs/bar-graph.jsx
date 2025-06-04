import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales in 2023 (in 1000s)",
        data: [65, 59, 80, 81, 56, 55, 40], // Example data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          // Custom callback to format values in 'k' for thousands
          callback: function (value) {
            if (value >= 1000) {
              return value / 1000 + "k"; // Convert 123000 to '123k'
            }
            return value; // Return the value as is if it's less than 1000
          },
          font: {
            size: 14,
            family: "Arial",
          },
          color: "#a3a3a3",
        },
        title: {
          display: true,
          //   text: "Y-axis Label",
          color: "red",
          font: {
            size: 16,
            family: "Arial",
            weight: "normal",
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        // text: "Line Chart with Custom Y-axis Label Formatting",
      },
    },
  };

  return (
    <div className="h-full w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
