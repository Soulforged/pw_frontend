//@flow
import React from "react";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

const withLoader = (component, loading) => (
  loading ? <Loading /> : component
);

const Component = ({ summary }: { summary: Object }) => (
  <div id="tnx-avg" className="tnx text-center col-md-3 col-sm-4 tnx-abs">
    <p className="bold">SUMMARY</p>
    <div className="tnx-sm cash-in">
      <p id="cashin-amount">{withLoader(summary.cashInAmount, summary.fetching)}</p>
      <span />
      <p>
        <span>Cash-In Total Value</span>
      </p>
    </div>
    <div className="tnx-sm cash-in">
      <p id="cashin-count">{withLoader(summary.cashInCount, summary.fetching)}</p>
      <span />
      <p>
        <span>Cash-In Total Count</span>
      </p>
    </div>
    <div className="tnx-sm cash-in">
      <p id="cashin-uniq">{withLoader(summary.cashInUnique, summary.fetching)}</p>
      <span />
      <p>
        <span>Cash-In Unique Customers</span>
      </p>
    </div>
    <div className="tnx-sm cash-out">
      <p id="cashout-amount">{withLoader(summary.cashOutAmount, summary.fetching)}</p>
      <span />
      <p>
        <span>Cash-Out Total Value</span>
      </p>
    </div>
    <div className="tnx-sm cash-out">
      <p id="cashout-count">{withLoader(summary.cashOutCount, summary.fetching)}</p>
      <span />
      <p>
        <span>Cash-Out Total Count</span>
      </p>
    </div>
    <div className="tnx-sm cash-out">
      <p id="cashout-uniq">{withLoader(summary.cashOutUnique, summary.fetching)}</p>
      <span />
      <p>
        <span>Cash-Out Unique customers</span>
      </p>
    </div>

    <div className="clearfix" />
    <div className="tnx-footer" />
  </div>
);

export default boundLifecycle({
  didMount: ({ fetchSummary }) => fetchSummary()
})(Component);
