//@flow
import React from "react";
import UserDetails from "src/users/UserDetails";
import renderer from "react-test-renderer";

it("details matches snapshot", () => {
  const rendered = renderer.create(<UserDetails fetchUser={jest.fn()} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("details matches snapshot with data", () => {
  const rendered = renderer.create(<UserDetails fetchUser={jest.fn()} item={{ id: 1 }} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
