//@flow
import React from "react";
import { CRUD } from "src/components";
import { shallow } from "enzyme";

it("calls openForm on new button click", () => {
  const props = {
    openForm: jest.fn()
  };
  const wrapper = shallow(<CRUD {...props} />);
  const addNewButton = wrapper.find("button.add-new-btn");
  addNewButton.props().onClick();
  expect(props.openForm).toHaveBeenCalledTimes(1);
});

it("renders a filter if it has one", () => {
  const Filter = <div id="test" />;
  const wrapper = shallow(<CRUD filter={Filter} />);
  const filter = wrapper.find("div#test");
  expect(filter).not.toBe(null);
});
