// UserStatistics.jsx
import React from "react";
import { Bar } from "react-chartjs-2";

const UserStatistics = () => {
  // Sample data for demonstration
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "User Activity",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear", // Use the linear scale for the x-axis
        position: "bottom",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3>User Statistics</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserStatistics;
