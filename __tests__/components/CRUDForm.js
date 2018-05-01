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
    save: jest.fn()
  };
  const wrapper = mount((
    <CRUDForm {...props}>
      <Text id="text" field="text" />
    </CRUDForm>
  ));
  wrapper.find("button.add-new").props().onClick();
  expect(props.onClose).toHaveBeenCalledTimes(1);
  wrapper.find("Form").props().onSubmit();
  expect(props.save).toHaveBeenCalledTimes(1);
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
