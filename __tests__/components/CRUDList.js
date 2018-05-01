//@flow
import React from "react";
import { CRUDList } from "src/components";
import renderer from "react-test-renderer";

describe("crud list tests", () => {
  const columns = [];

  it("list matches snapshot", () => {
    const rendered = renderer.create((
      <CRUDList
        loader={jest.fn()}
        entities={{}}
        columns={columns}
      />
    )).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it("list matches snapshot with data", () => {
    const component = (
      <CRUDList
        loader={jest.fn()}
        entities={{ fetching: true }}
        columns={columns}
      />
    );
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
