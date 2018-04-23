//@flow
import React from "react";
import UserForm from "src/users/UserForm";
import renderer from "react-test-renderer";

it("user form matches snapshot", () => {
  const rendered = renderer.create(<UserForm fetchUser={jest.fn()} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
