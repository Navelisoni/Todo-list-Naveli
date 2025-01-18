import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const DoughnutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const dataDoughnut = {
      labels: ["padding", "Done"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 100],
          backgroundColor: [
            "#3F9142",
            "#142E15",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configDoughnut = {
      type: "doughnut",
      data: dataDoughnut,
      options: {},
    };

    const chartInstance = new Chart(chartRef.current, configDoughnut);

    // Cleanup to destroy the chart instance on component unmount
    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <canvas ref={chartRef} className="p-10"></canvas>
    </div>
  );
};

export default DoughnutChart;
