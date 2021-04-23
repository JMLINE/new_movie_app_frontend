import React from "react";
import { Doughnut } from "@reactchartjs/react-chart.js";

function WatchedGraph(props) {
  const data = {
    labels: ["Great", "Good", "Bad"],
    datasets: [
      {
        label: "n/a",
        data: [props.goodData, props.okData, props.badData],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="graph">
        <h4 style={{ textAlign: "center" }}>Overall</h4>
        <Doughnut data={data} />
      </div>
    </>
  );
}

export default WatchedGraph;
