//@flow
import React from "react";
import { boundLifecycle } from "src/recompose-ext";

const Component = ({ summary }: { summary: Object }) => (
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
);

export default boundLifecycle({
  didMount: ({ fetchSummary }) => fetchSummary()
})(Component);
