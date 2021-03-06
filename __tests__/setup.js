//@flow
Date.now = jest.fn(() => 1482363367071);

jest.mock("react-chartjs", () => {
  const React = require.requireActual("react");
  const Line = (props: Object) => (
    React.createElement("Line", props, props.children)
  );
  const Doughnut = (props: Object) => (
    React.createElement("Doughnut", props, props.children)
  );
  return { Line, Doughnut };
});
