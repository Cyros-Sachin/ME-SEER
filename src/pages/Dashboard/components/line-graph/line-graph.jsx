import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
  const labels = [
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            if (value >= 1000) {
              return value / 1000 + "k";
            }
            return value;
          },
          font: {
            size: 14,
            family: "Arial",
          },
          color: "#a3a3a3",
        },
        title: {
          display: true,
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
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My Dataset",
        data: [
          65000, 59000, 80000, 81000, 56000, 55000, 40000, 65000, 59000, 80000,
          81000,
        ],
        fill: true, // Enables fill under the line
        backgroundColor: "rgba(51, 84, 244, 0.2)", // Color under the line with transparency
        borderColor: "rgb(51, 84, 244)", // Line color
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="h-full w-full">
      <Line data={data} width={500} options={options} />
    </div>
  );
};

export default LineGraph;
