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

const BarChart = () => {
  const labels = [
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

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total",
        data: [81, 75, 60, 85, 90, 78, 88, 95, 80, 72, 70, 76],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Expenses",
        data: [102, 95, 78, 120, 110, 100, 115, 130, 125, 140, 150, 160],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Value",
        data: [104, 90, 95, 110, 115, 120, 125, 130, 135, 140, 145, 150],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "A",
        data: [90, 85, 80, 95, 100, 105, 110, 115, 120, 125, 130, 135],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: false, // Change to true for stacked bars
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Data Overview",
      },
    },
  };

  return (
    <div className="h-full w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
