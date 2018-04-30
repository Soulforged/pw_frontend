//@flow
import React from "react";
import BusinessUnitForm from "src/businessUnits/BusinessUnitForm";
import renderer from "react-test-renderer";
import mocks from "src/mocks";

it("matches snapshot while fetching", () => {
  const rendered = renderer.create((
    <BusinessUnitForm getBusinessUnit={jest.fn()} fetching />
  )).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("matches snapshot no data", () => {
  const rendered = renderer.create(<BusinessUnitForm getBusinessUnit={jest.fn()} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("matches snapshot while saving", () => {
  const rendered = renderer.create((
    <BusinessUnitForm getBusinessUnit={jest.fn()} saving item={mocks.BunitCreate} />
  )).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("matches snapshot while not saving", () => {
  const rendered = renderer.create((
    <BusinessUnitForm getBusinessUnit={jest.fn()} item={mocks.BunitCreate} />
  )).toJSON();
  expect(rendered).toMatchSnapshot();
});
