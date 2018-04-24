//@flow
import React from "react";
import UsersList from "src/users/UsersList";
import renderer from "react-test-renderer";

it("list matches snapshot", () => {
  const rendered = renderer.create(<UsersList fetchUsers={jest.fn()} users={{}} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("list matches snapshot with data", () => {
  const component = <UsersList fetchUsers={jest.fn()} users={{ fetching: false }} />;
  const rendered = renderer.create(component).toJSON();
  expect(rendered).toMatchSnapshot();
});
