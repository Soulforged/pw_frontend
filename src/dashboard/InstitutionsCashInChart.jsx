//@flow
import React from "react";
import { Doughnut as DoughnutChart } from "react-chartjs";
import { compose, branch, renderComponent } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

const allColors = ["#602715", "#b04f32", "#d5694a", "#ffb59f", "#fb4d3d",
  "#403f4c", "#fa7921", "#1b998b", "#eac435", "#345995", "#e40066", "#03cea4",
  "#6eb1ff", "#acd2ff", "#4d4d4e", "#e47b47", "#393f63", "#f39b70"];

const SpecLoading = () => <Loading style={{ height: "289px" }} loading />;

const Chart = ({ trendsByInstitution }: { trendsByInstitution: Array<Object> }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    title: {
      display: true,
      text: "Cash-In Count By Institutions",
      fontColor: "#f7f7f7",
      fontFamily: "robotolight"
    },
  };
  const chartData = trendsByInstitution.reduce(({ labels, datasets }, trend) => (
    {
      labels: [...labels, trend.institutionName],
      datasets: [{
        ...datasets[0],
        data: [...datasets[0].data, trend.cashInCount],
        backgroundColor: allColors[datasets[0].data.length]
      }]
    }
  ), { labels: [], datasets: [{ data: [] }] });
  return <DoughnutChart data={chartData} options={options} />;
};

export default compose(
  boundLifecycle({ didMount: ({ fetchTrendsByInstitution }) => fetchTrendsByInstitution() }),
  branch(({ trendsByInstitution: { fetching } }) => fetching, renderComponent(SpecLoading))
)(Chart);
