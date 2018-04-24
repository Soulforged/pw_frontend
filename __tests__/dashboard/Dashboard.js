//@flow
import React from "react";
import Dashboard from "src/dashboard/Dashboard";
import { shallow } from "enzyme";

it("calls appropriate loaders", () => {
  const props = {
    fetchSummary: jest.fn(),
    fetchTrendsByDate: jest.fn(),
    fetchTrendsByInstitution: jest.fn(),
    fetchErrors: jest.fn()
  };
  const wrapper = shallow(<Dashboard {...props} />);
  wrapper.props().onSubmit({ preventDefault: jest.fn() });
  expect(props.fetchSummary).toHaveBeenCalledTimes(1);
  expect(props.fetchTrendsByDate).toHaveBeenCalledTimes(1);
  expect(props.fetchTrendsByInstitution).toHaveBeenCalledTimes(1);
  expect(props.fetchErrors).toHaveBeenCalledTimes(1);
});
