//@flow
import React from "react";
import RoleForm from "src/roles/RoleForm";
import renderer from "react-test-renderer";
import mocks from "src/mocks";

it("matches snapshot while fetching", () => {
  const rendered = renderer.create(<RoleForm fetchRole={jest.fn()} fetching />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("matches snapshot no data", () => {
  const rendered = renderer.create(<RoleForm fetchRole={jest.fn()} />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("matches snapshot while saving", () => {
  const rendered = renderer.create((
    <RoleForm fetchRole={jest.fn()} saving item={mocks.role} />
  )).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("matches snapshot while not saving", () => {
  const rendered = renderer.create(<RoleForm fetchRole={jest.fn()} item={mocks.role} />).toJSON();
  expect(rendered).toMatchSnapshot();
});
