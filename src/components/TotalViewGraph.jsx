import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";

function TotalViewGraph(props) {
  const data = {
    labels: ["Movies"],
    datasets: [
      {
        label: "Total Movies",
        data: [props.totalMovies],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <div className="header">
        <h4 style={{ textAlign: "center" }}>Total Views</h4>
      </div>

      <Bar data={data} options={options} />
    </>
  );
}

export default TotalViewGraph;
