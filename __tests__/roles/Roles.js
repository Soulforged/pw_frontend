//@flow
import React from "react";
import { shallow } from "enzyme";
import Roles from "src/roles/Roles";

it("matches snapshot", () => {
  const render = shallow(<Roles />).dive();
  expect(render).toMatchSnapshot();
});
