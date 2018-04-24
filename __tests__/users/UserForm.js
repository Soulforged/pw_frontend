//@flow
import React from "react";
import UserForm from "src/users/UserForm";
import renderer from "react-test-renderer";
import mocks from "src/mocks";

it("matches snapshot while fetching", () => {
  const rendered = renderer.create(<UserForm fetchUser={jest.fn()} fetching />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("matches snapshot no data", () => {
  const rendered = renderer.create(<UserForm fetchUser={jest.fn()} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("matches snapshot while saving", () => {
  const rendered = renderer.create((
    <UserForm fetchUser={jest.fn()} saving item={mocks.user} />
  )).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("matches snapshot while not saving", () => {
  const rendered = renderer.create(<UserForm fetchUser={jest.fn()} item={mocks.user} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
