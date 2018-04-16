//@flow
import React from "react";
import { compose, withHandlers } from "recompose";
import serialize from "form-serialize";
import InsitutionsCashInChart from "./containers/InstitutionsCashInChartContainer";
import TrendsAmountChart from "./containers/TrendsAmountChartContainer";
import Errors from "./containers/ErrorsContainer";
import Summary from "./containers/SummaryContainer";

type Props = {
  onSubmit: (Event) => void,
};

const Dashboard = ({ onSubmit }: Props) => (
  <div id="dashboard">
    <div id="search-pnl" className="dash-search-pnl text-left">
      <div id="filter-row">
        <form onSubmit={onSubmit} className="row">
          <div className="col-md-3 col-sm-3">
            <span>Date from</span>
            <input
              name="dateFrom"
              className="form-control"
              placeholder="Date From"
              style={{ maxWidth: 120 }}
            />
          </div>
          <div className="col-md-3 col-sm-3">
            <span>Date to</span>
            <input
              name="dateTo"
              className="form-control"
              placeholder="Date To"
              style={{ maxWidth: 120 }}
            />
          </div>
          <div className="col-md-5 col-sm-5" />
          <div className="col-md-1 col-sm-1">
            <button className="btn filter-btn" type="submit">G0</button>
          </div>
        </form>
      </div>

      <a href="/" className="toggle-filter">
        <i className="fa fa-chevron-up" />
      </a>
    </div>

    <div className="tnx-flex">
      <Summary />

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
                <TrendsAmountChart />
                <div id="trendAmountChartLegend" className="tnx-footer" />
              </div>
            </div>
            <div id="trend-count" className="tab-pane fade">
              <div className="tnx">
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
                  <InsitutionsCashInChart />
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
                      <Errors />
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
    const params = serialize(event.target, { hash: true });
    props.fetchSummary(params);
    props.fetchTrendsByDate(params);
    props.fetchTrendsByInstitution(params);
    props.fetchErrors(params);
  }
}))(Dashboard);
