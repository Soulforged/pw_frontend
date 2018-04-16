//@flow
import React from "react";
import { boundLifecycle } from "recompose-ext";

const ErrorRow = ({ error, count, rate }: { error: Object, count: integer, rate: float }) => (
  <tr>
    <td><span>{error.status}</span></td>
    <td><span>{error.statusSource}</span></td>
    <td>{count}</td>
    <td className="theme bold">{rate}</td>
  </tr>
);

const Component = ({ summary, errors }) => (
  errors.results.map((error) => {
    const count = (summary.cashInCount + summary.cashOutCount) || 0;
    const rate = (count / (errors.total * 100)) || 0.0;
    return (
      <ErrorRow
        key={error.statusSource}
        error={error}
        count={count}
        rate={rate}
      />
    );
  })
);

export default boundLifecycle({
  didMount: ({ fetchErrors }) => fetchErrors()
})(Component);
