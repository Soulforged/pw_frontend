//@flow
import React from "react";
import { shallow } from "enzyme";
import mockStore from "test/setupStoreMock";
import { BusinessUnitDetail } from "src/businessUnits";

describe("business unit details container tests", () => {
  it("receives null id if the URI doesn't match pattern", () => {
    const store = mockStore({ routing: { location: { pathname: "/business_units" } }, entities: { businessUnits: {} } });
    const wrapper = shallow(<BusinessUnitDetail store={store} />);
    const props = wrapper.props();
    expect(props.id).toBe(null);
    expect(props.item).toEqual({});
  });

  it("uses matched id to fetch from store", () => {
    const bizUnit = { desc: "", id: 1 };
    const store = mockStore({ routing: { location: { pathname: "/business_units/1" } }, entities: { businessUnits: { byId: { [bizUnit.id]: bizUnit } } } });
    const wrapper = shallow(<BusinessUnitDetail store={store} />);
    const props = wrapper.props();
    expect(props.id).toBe("1");
    expect(props.item).toEqual(bizUnit);
  });
});
