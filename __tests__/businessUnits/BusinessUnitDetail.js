//@flow
import React from "react";
import BusinessUserDetail from "src/businessUnits/BusinessUnitDetail";
import renderer from "react-test-renderer";

it("details matches snapshot", () => {
  const rendered = renderer.create(<BusinessUserDetail getBusinessUnit={jest.fn()} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("details matches snapshot with data", () => {
  const rendered = renderer.create(<BusinessUserDetail getBusinessUnit={jest.fn()} item={{ id: 1 }} />).toJSON();
  expect(rendered).toMatchSnapshot();
});