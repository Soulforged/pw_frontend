//@flow
import React from "react";
import { shallow } from "enzyme";
import Users from "src/users/Users";
import UsersList from "src/users/UsersList";

it("matches crud structure", () => {
  const props = {
    fetchUserByCriteria: jest.fn(),
    openForm: jest.fn()
  };
  const wrapper = shallow(<Users {...props} />);
  expect(wrapper.find(UsersList)).not.toBe(null);
  const wrapperProps = wrapper.props();
  wrapperProps.filter({ preventDefault: jest.fn() });
  expect(props.fetchUserByCriteria).toHaveBeenCalledTimes(1);
  wrapperProps.create();
  expect(props.openForm).toHaveBeenCalledTimes(1);
});
