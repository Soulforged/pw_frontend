//@flow
import React from "react";
import { shallow } from "enzyme";
import BusinessUnits from "src/businessUnits/BusinessUnits";

it("filters and opens new form", () => {
  const props = {
    fetchBusinessUnits: jest.fn(),
    openForm: jest.fn()
  };
  const wrapper = shallow(<BusinessUnits {...props} />);
  const wrapperProps = wrapper.props();
  wrapperProps.filter({ preventDefault: jest.fn() });
  expect(props.fetchBusinessUnits).toHaveBeenCalledTimes(1);
  const addNewButton = wrapper.dive().find("button.add-new-btn");
  addNewButton.props().onClick();
  expect(props.openForm).toHaveBeenCalledTimes(1);
});
