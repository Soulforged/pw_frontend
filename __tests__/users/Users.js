//@flow
import React from "react";
import { shallow } from "enzyme";
import Users from "src/users/Users";

it("matches snapshot", () => {
  const render = shallow(<Users />).dive();
  expect(render).toMatchSnapshot();
});
