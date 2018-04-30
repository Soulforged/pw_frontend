//@flow
import React from "react";
import { shallow } from "enzyme";
import Roles from "src/roles/Roles";

it("matches crud structure", () => {
  const props = {
    openForm: jest.fn()
  };
  const wrapper = shallow(<Roles {...props} />);
  expect(wrapper.find("button")).not.toBe(null);
  const button = wrapper.find("button");
  const wrapperProps = button.props();
  wrapperProps.onClick();
  expect(props.openForm).toHaveBeenCalledTimes(1);
});
