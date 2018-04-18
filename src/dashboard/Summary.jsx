//@flow
import React from "react";
import { boundLifecycle } from "src/recompose-ext";
import { Loading } from "src/components";

const withLoader = (component, loading) => (
  loading ? <Loading loading /> : component
);

const Component = ({ summary }: { summary: Object }) => (
  <div id="tnx-avg" className="tnx text-center col-md-3 col-sm-4 tnx-abs">
    <p className="bold">SUMMARY</p>
    <div className="tnx-sm cash-in">
      {withLoader(<p>{summary.cashInAmount}</p>, summary.fetching)}
      <span />
      <p>
        <span>Cash-In Total Value</span>
      </p>
    </div>
    <div className="tnx-sm cash-in">
      {withLoader(<p>{summary.cashInCount}</p>, summary.fetching)}
      <span />
      <p>
        <span>Cash-In Total Count</span>
      </p>
    </div>
    <div className="tnx-sm cash-in">
      {withLoader(<p>{summary.cashInUnique}</p>, summary.fetching)}
      <span />
      <p>
        <span>Cash-In Unique Customers</span>
      </p>
    </div>
    <div className="tnx-sm cash-out">
      {withLoader(<p>{summary.cashOutAmount}</p>, summary.fetching)}
      <span />
      <p>
        <span>Cash-Out Total Value</span>
      </p>
    </div>
    <div className="tnx-sm cash-out">
      {withLoader(<p>{summary.cashOutCount}</p>, summary.fetching)}
      <span />
      <p>
        <span>Cash-Out Total Count</span>
      </p>
    </div>
    <div className="tnx-sm cash-out">
      {withLoader(<p>{summary.cashOutUnique}</p>, summary.fetching)}
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
