//@flow
import React from "react";
import { Doughnut as DoughnutChart } from "react-chartjs";
import { boundLifecycle } from "recompose-ext";

const allColors = ["#602715", "#b04f32", "#d5694a", "#ffb59f", "#fb4d3d",
  "#403f4c", "#fa7921", "#1b998b", "#eac435", "#345995", "#e40066", "#03cea4",
  "#6eb1ff", "#acd2ff", "#4d4d4e", "#e47b47", "#393f63", "#f39b70"];

const Chart = ({ trendsByInstitution }: { trendsByInstitution: Array<Object> }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };
  const chartData = trendsByInstitution.reduce((acc, trend) => (
    [
      ...acc,
      {
        value: trend.cashInCount,
        color: allColors[acc.length],
        highlight: "#FF5A5E",
        label: trend.institutionName
      }
    ]
  ), []);
  return <DoughnutChart data={chartData} options={options} />;
};

export default boundLifecycle({
  didMount: ({ fetchTrendsByInstitution }) => fetchTrendsByInstitution()
})(Chart);
