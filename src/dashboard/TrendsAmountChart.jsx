//@flow
import React from "react";
import { boundLifecycle } from "recompose-ext";
import { Line as LineChart } from "react-chartjs";

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
        beginAtZero: true,
        callback: (label) => {
          const ranges = [{ divider: 1e6, suffix: "M" }, { divider: 1e3, suffix: "K" }];
          const formatNumber = (n) => {
            if (n <= 1 && n > 0) {
              return parseFloat(n).toFixed(1);
            }
            for (let i = 0; i < ranges.length; i++) { //eslint-disable-line
              if (n >= ranges[i].divider) {
                return (n / ranges[i].divider).toString() + ranges[i].suffix;
              }
            }
            return n;
          };
          return formatNumber(label);
        }
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

export default boundLifecycle({
  didMount: ({ fetchTrendsByDate }) => fetchTrendsByDate()
})(Chart);
