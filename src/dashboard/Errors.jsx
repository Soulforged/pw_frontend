//@flow
import React from "react";
import { boundLifecycle } from "recompose-ext";
import { Loading } from "src/components";

type Props = {
  errors: Array<Object> | { fetching: boolean },
  summary: Object
};

const ErrorRow = ({ error, count, rate }: { error: Object, count: integer, rate: float }) => (
  <tr>
    <td><span>{error.status}</span></td>
    <td><span>{error.statusSource}</span></td>
    <td>{count}</td>
    <td className="theme bold">{rate}</td>
  </tr>
);

const List = ({ errors, summary }) => {
  const total = summary.cashInCount + summary.cashOutCount || 1;
  return errors.results.map((error) => {
    const count = error.cashInCount + error.cashOutCount;
    const rate = ((count * 100) / (total * count)) || 0.0;
    return (
      <ErrorRow
        key={`${error.statusSource}_${error.statusDetail}`}
        error={error}
        count={count}
        rate={rate}
      />
    );
  });
};

const Component = ({ errors, summary }: Props) => {
  if (errors.fetching || summary.fetching) {
    return <Loading loading />;
  }
  return (
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
        <List errors={errors} summary={summary} />
      </tbody>
    </table>
  );
};

export default boundLifecycle({
  didMount: ({ fetchErrors }) => fetchErrors()
})(Component);
