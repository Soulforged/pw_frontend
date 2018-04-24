//@flow
import React from "react";
import { compose, branch, renderComponent } from "recompose";
import { Line as LineChart } from "react-chartjs";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

const options = {
  responsive: true,
  maintainAspectRatio: true,
  title: {
    display: true,
    text: "Cash in",
    fontColor: "#fff",
    fontFamily: "robotolight"
  },
  scales: {
    xAxes: [{ gridLines: { display: false, drawBorder: false } }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      },
      gridLines: { borderDash: [2, 8], drawBorder: false }
    }]
  }
};
const defDatasets = [
  {
    backgroundColor: "#707ed3",
    borderColor: "#707ed3",
    data: [],
    label: "Cash-In",
    fill: false
  }, {
    backgroundColor: "#4bd1b4",
    borderColor: "#4bd1b4",
    data: [],
    label: "Cash-Out",
    fill: false
  }
];

const SpecLoading = () => <Loading style={{ height: "398px" }} loading />;

const Chart = ({ trendsByDate }: { trendsByDate: Array<Object> }) => {
  const chartData = trendsByDate.reduce(({ labels, datasets }, trend) => (
    {
      labels: [...labels, trend.date],
      datasets: [{
        ...datasets[0],
        data: [...datasets[0].data, trend.cashInAmount]
      }, {
        ...datasets[1],
        data: [...datasets[1].data, trend.cashOutAmount]
      }]
    }
  ), { labels: [], datasets: defDatasets });
  return <LineChart data={chartData} options={options} height="90px" />;
};

export default compose(
  boundLifecycle({ didMount: ({ fetchTrendsByDate }) => fetchTrendsByDate() }),
  branch(({ trendsByDate: { fetching } }) => fetching, renderComponent(SpecLoading))
)(Chart);
