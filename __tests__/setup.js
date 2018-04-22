Date.now = jest.fn(() => 1482363367071);

jest.mock("react-chartjs", () => {
  const React = require.requireActual('react');
  const ReactChart = require.requireActual('react-chartjs');
  const Line = props => (
    React.createElement('Line', props, props.children)
  );
  const Doughnut = props => (
    React.createElement('Doughnut', props, props.children)
  );
  return { Line, Doughnut };
});
