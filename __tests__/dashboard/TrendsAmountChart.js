//@flow
import React from "react";
import TrendsAmountChart from "src/dashboard/TrendsAmountChart";
import renderer from "react-test-renderer";
import mocks from "src/mocks";

it("matches loading snapshot", () => {
  const component = (
    <TrendsAmountChart
      fetchTrendsByDate={jest.fn()}
      trendsByDate={{ fetching: true }}
    />
  );
  const rendered = renderer.create(component).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("matches snapshot with data", () => {
  const trendsByDate = mocks.trendsByDate.results;
  const component = <TrendsAmountChart fetchTrendsByDate={jest.fn()} trendsByDate={trendsByDate} />;
  const rendered = renderer.create(component).toJSON();
  expect(rendered).toMatchSnapshot();
});
