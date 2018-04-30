//@flow
import React from "react";
import { shallow } from "enzyme";
import { CRUDFilter } from "src/components";

it("filters and opens new form", () => {
  const props = {
    fetchSomething: jest.fn(),
  };
  const wrapper = shallow(<CRUDFilter filter={props.fetchSomething} />);
  wrapper.props().onFilter({ preventDefault: jest.fn() });
  expect(props.fetchSomething).toHaveBeenCalledTimes(1);
});
