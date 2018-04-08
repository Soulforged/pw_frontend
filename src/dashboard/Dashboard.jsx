//@flow
import React from "react";
import { compose, withHandlers } from "recompose";
import { boundLifecycle } from "src/recompose-ext";
import serialize from "form-serialize";
import { Doughnut as DoughnutChart } from "react-chartjs";

type Props = {
  onSubmit: (Event) => void,
  summary: Object,
  errors: Object,
  trendsByInstitution: Array<Object>
};

const ErrorRow = ({ error, count, rate }: { error: Object, count: integer, rate: float }) => (
  <tr>
    <td><span>{error.status}</span></td>
    <td><span>{error.statusSource}</span></td>
    <td>{count}</td>
    <td className="theme bold">{rate}</td>
  </tr>
);

const allColors = ["#602715", "#b04f32", "#d5694a", "#ffb59f", "#fb4d3d",
  "#403f4c", "#fa7921", "#1b998b", "#eac435", "#345995", "#e40066", "#03cea4",
  "#6eb1ff", "#acd2ff", "#4d4d4e", "#e47b47", "#393f63", "#f39b70"];

const InsitutionsCashInChart = ({ data }: { data: Array<Object> }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };
  const chartData = data.reduce((acc, trend) => (
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

const Dashboard = ({
  summary,
  errors,
  trendsByInstitution,
  onSubmit
}: Props) => (
  <div id="dashboard">

    <div id="search-pnl" className="dash-search-pnl text-left">

      <div id="filter-row">
        <form onSubmit={onSubmit} className="row">
          <div className="col-md-3 col-sm-6">
            <span>Date from</span>
            <input
              name="dateFrom"
              className="form-control"
              placeholder="Date From"
              style={{ maxWidth: 120 }}
            />
          </div>
          <div className="col-md-3 col-sm-6">
            <span>Date to</span>
            <input
              name="dateTo"
              className="form-control"
              placeholder="Date To"
              style={{ maxWidth: 120 }}
            />
          </div>
          <div className="col-md-6 col-sm-6 text-right">
            <button className="btn filter-btn" type="submit">G0</button>
          </div>
        </form>
      </div>

      <a href="/" className="toggle-filter">
        <i className="fa fa-chevron-up" />
      </a>
    </div>

    <div className="tnx-flex">
      <div id="tnx-avg" className="tnx text-center col-md-3 col-sm-4 tnx-abs">
        <p className="bold">SUMMARY</p>
        <div className="tnx-sm cash-in">
          <p id="cashin-amount">{summary.cashInAmount}</p>
          <span />
          <p>
            <span>Cash-In Total Value</span>
          </p>
        </div>
        <div className="tnx-sm cash-in">
          <p id="cashin-count">{summary.cashInCount}</p>
          <span />
          <p>
            <span>Cash-In Total Count</span>
          </p>
        </div>
        <div className="tnx-sm cash-in">
          <p id="cashin-uniq">{summary.cashInUnique}</p>
          <span />
          <p>
            <span>Cash-In Unique Customers</span>
          </p>
        </div>

        <div className="tnx-sm cash-out">
          <p id="cashout-amount">{summary.cashOutAmount}</p>
          <span />
          <p>
            <span>Cash-Out Total Value</span>
          </p>
        </div>
        <div className="tnx-sm cash-out">
          <p id="cashout-count">{summary.cashOutCount}</p>
          <span />
          <p>
            <span>Cash-Out Total Count</span>
          </p>
        </div>
        <div className="tnx-sm cash-out">
          <p id="cashout-uniq">{summary.cashOutUnique}</p>
          <span />
          <p>
            <span>Cash-Out Unique customers</span>
          </p>
        </div>

        <div className="clearfix" />
        <div className="tnx-footer" />
      </div>

      <div id="tnx-graph" className="text-center col-md-9 col-sm-8">
        <div className="tnx-ema">
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="/">Transaction Amount</a>
            </li>
            <li>
              <a href="/">Transaction Count</a>
            </li>
          </ul>
          <div className="tab-content">
            <div id="trend-amount" className="tab-pane fade in active">
              <div className="tnx">
                <canvas id="trendAmountChart" />
                <div id="trendAmountChartLegend" className="tnx-footer" />
              </div>
            </div>
            <div id="trend-count" className="tab-pane fade">
              <div className="tnx">
                <canvas id="trendCountChart" />
                <div id="trendCountChartLegend" className="tnx-footer" />
              </div>
            </div>
          </div>
        </div>
        <div className="tnx-flex tnx-max">
          <div className="tnx-lg">
            <ul className="nav nav-tabs">
              <li className="active">Cash-In</li>
              <li>Cash-Out</li>
            </ul>
            <div className="tab-content">
              <div id="institutions-in" className="tab-pane active">
                <div className="tnx">
                  {/*<canvas id="cashinChart" />*/}
                  <InsitutionsCashInChart data={trendsByInstitution} />
                  <div id="cashinChartLegend" className="tnx-footer" />
                </div>
              </div>
              <div id="institutions-out" className="tab-pane fade">
                <div className="tnx">
                  <canvas id="cashoutChart" />
                  <div id="cashoutChartLegend" className="tnx-footer" />
                </div>
              </div>
            </div>
          </div>
          <div className="tnx-lg last">
            <ul className="nav nav-tabs">
              <li className="active">Exceptions</li>
            </ul>
            <div className="tab-content">
              <div id="exceptions" className="tab-pane active">
                <div className="tnx">
                  <p className="bold">EXCEPTIONS</p>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>INSTRUMENT</th>
                        <th>TXN</th>
                        <th>EXCEPTION COUNT</th>
                        <th>EXCEPTION RATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {errors.results.map((error) => {
                        const count = summary.cashInCount + summary.cashOutCount;
                        const rate = count / (errors.total * 100);
                        return (
                          <ErrorRow
                            key={error.statusSource}
                            error={error}
                            count={count}
                            rate={rate}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="tnx-footer" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix" />
      </div>
    </div>
    <div className="clearfix" />
  </div>
);

export default compose(withHandlers({
  onSubmit: props => (event) => {
    event.preventDefault();
    const params = serialize(event.target);
    props.fetchSummary(params);
  }
}), boundLifecycle({
  didMount: (props) => {
    props.fetchSummary();
    props.fetchTrendsByDate();
    props.fetchTrendsByInstitution();
    props.fetchErrors();
  }
}))(Dashboard);
