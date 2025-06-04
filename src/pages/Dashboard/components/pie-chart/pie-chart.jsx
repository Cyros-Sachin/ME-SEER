import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  layouts,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const data = {
    labels: [
      "Bills",
      "Insurance",
      "Shopping",
      "Food",
      "Broadband Bill",
      "Clothing",
      "Entertainment",
    ],
    datasets: [
      {
        label: "Expenses",
        data: [30.8, 15, 20, 10, 8, 12, 4], // Modify according to the image percentages
        backgroundColor: [
          "#FF6384", // Red for Bills
          "#FFCE56", // Yellow for Insurance
          "#36A2EB", // Blue for Shopping
          "#4BC0C0", // Green for Food
          "#9966FF", // Purple for Broadband
          "#FF9F40", // Orange for Clothing
          "#8DD1E1", // Light Blue for Entertainment
        ],
        borderColor: [
          "#FF6384",
          "#FFCE56",
          "#36A2EB",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8DD1E1",
        ],
        borderWidth: 1,
        cutout: "50%", // Creates the donut chart effect
        hoverOffset: 10, // This will make the section larger on hover
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", // Adjust legend to the right
        margin: {
          left: 70,
        },
      },
      title: {
        display: true,
        // text: "Expenses Distribution",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `${value}%`; // Display the percentage in the tooltip
          },
        },
        padding: {
          top: 2,
          right: 30,
          bottom: 2,
          left: 10, // Adjusting padding for tooltip width
        },
        backgroundColor: "rgba(1, 0, 0, 0.4)", // Customize the background color
        titleColor: "#fff", // Title text color
        bodyColor: "#fff", // Body text color
        borderColor: "rgba(255, 255, 255, 0.3)", // Add a border color
        borderWidth: 1, // Border width
        cornerRadius: 5, // Rounded corners
        titleFont: {
          size: 12, // Title font size
          family: "Arial", // Title font family
          weight: "bold", // Title font weight
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },

    layout: {
      padding: {
        left: 10,
      },
    },
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
