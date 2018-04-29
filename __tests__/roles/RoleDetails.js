//@flow
import React from "react";
import RoleDetails from "src/roles/RoleDetails";
import renderer from "react-test-renderer";

it("details matches snapshot", () => {
  const rendered = renderer.create(<RoleDetails fetchRole={jest.fn()} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("details matches snapshot with data", () => {
  const rendered = renderer.create(<RoleDetails fetchRole={jest.fn()} item={{ id: 1 }} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
