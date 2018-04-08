//@flow
import React from "react";
import renderer from "react-test-renderer";

import ErrorBoundary from "src/error/ErrorBoundary";

const component = props => (
  <ErrorBoundary {...props}>
    <div style={1 / 0} />
  </ErrorBoundary>
);

it("renders without crashing", () => {
  const setError = jest.fn();
  const rendered = renderer.create(component({ setError })).toJSON();
  expect(rendered).toMatchSnapshot();
});
