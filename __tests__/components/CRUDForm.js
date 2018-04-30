//@flow
import React from "react";
import { Text } from "react-form";
import { CRUDForm } from "src/components";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

it("bahaves as expected", () => {
  const props = {
    onClose: jest.fn(),
    loader: jest.fn(),
    item: { id: 1, text: "asasd" },
    save: jest.fn(),
    validate: jest.fn(),
    preValidate: jest.fn()
  };
  const wrapper = mount((
    <CRUDForm {...props}>
      <Text id="text" field="text" />
    </CRUDForm>
  ));
  wrapper.find("button.add-new").props().onClick();
  expect(props.onClose).toHaveBeenCalledTimes(1);
  console.log(wrapper.find("form").props());
  wrapper.find("form").props().onSubmit();
  expect(props.save).toHaveBeenCalledTimes(1);
  // expect(props.validate).toHaveBeenCalledTimes(1);
  // expect(props.preValidate).toHaveBeenCalledTimes(1);
});

it("matches new item snapshot", () => {
  const props = {
    onClose: jest.fn(),
    loader: jest.fn(),
    item: {}
  };
  const render = renderer.create(<CRUDForm {...props} />).toJSON();
  expect(render).toMatchSnapshot();
});

it("matches edit item snapshot", () => {
  const props = {
    onClose: jest.fn(),
    loader: jest.fn(),
    item: { id: 1 }
  };
  const render = renderer.create(<CRUDForm {...props} />).toJSON();
  expect(render).toMatchSnapshot();
});
