//@flow
import React from "react";
import BusinessUnitList from "src/businessUnits/BusinessUnitList";
import renderer from "react-test-renderer";

it("list matches snapshot", () => {
  const rendered = renderer.create((
    <BusinessUnitList fetchBusinessUnits={jest.fn()} businessUnits={{}} />
  )).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("list matches snapshot with data", () => {
  const component = (
    <BusinessUnitList fetchBusinessUnits={jest.fn()} businessUnits={{ fetching: false }} />
  );
  const rendered = renderer.create(component).toJSON();
  expect(rendered).toMatchSnapshot();
});
