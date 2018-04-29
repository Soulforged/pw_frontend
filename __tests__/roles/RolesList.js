//@flow
import React from "react";
import RolesList from "src/roles/RolesList";
import renderer from "react-test-renderer";

it("list matches snapshot", () => {
  const rendered = renderer.create(<RolesList fetchRoles={jest.fn()} roles={{}} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("list matches snapshot with data", () => {
  const component = <RolesList fetchRoles={jest.fn()} roles={{ fetching: false }} />;
  const rendered = renderer.create(component).toJSON();
  expect(rendered).toMatchSnapshot();
});
