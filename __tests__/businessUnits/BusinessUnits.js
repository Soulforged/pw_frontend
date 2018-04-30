//@flow
import React from "react";
import BusinessUnits from "src/businessUnits/BusinessUnits";
import { shallow } from "enzyme";

it("matches snapshot", () => {
  const render = shallow(<BusinessUnits />).dive();
  expect(render).toMatchSnapshot();
});
