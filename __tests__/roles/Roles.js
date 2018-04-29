//@flow
import React from "react";
import { shallow } from "enzyme";
import Roles from "src/roles/Roles";
import RolesList from "src/roles/RolesList";

it("matches crud structure", () => {
  const props = {
    openForm: jest.fn()
  };
  const wrapper = shallow(<Roles {...props} />);
  expect(wrapper.find(RolesList)).not.toBe(null);
  const wrapperProps = wrapper.props();
  wrapperProps.create();
  expect(props.openForm).toHaveBeenCalledTimes(1);
});
