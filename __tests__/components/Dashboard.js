//@flow
import React from "react";
import { Loading } from "src/components";
import renderer from "react-test-renderer";

it("matches loading snapshot", () => {
  const render = renderer.create(<Loading />).toJSON();
  expect(render).toMatchSnapshot();
});

it("matches not loading snapshot", () => {
  const render = renderer.create(<Loading loading={false} />).toJSON();
  expect(render).toMatchSnapshot();
});
