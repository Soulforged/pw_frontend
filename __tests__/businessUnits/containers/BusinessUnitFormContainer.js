//@flow
import React from "react";
import { shallow } from "enzyme";
import mockStore from "test/setupStoreMock";
import { BusinessUnitForm } from "src/businessUnits";
import actions from "src/actions";

const { saveTypes, fetchEntitiesTypes } = actions;

describe("user details container tests", () => {
  it("receives null id if the URI doesn't match pattern", () => {
    const store = mockStore({ routing: { location: { pathname: "/business_units" } }, entities: { businessUnits: {} } });
    const wrapper = shallow(<BusinessUnitForm store={store} />);
    const props = wrapper.props();
    expect(props.id).toBe(null);
    expect(props.item).toEqual({});
  });

  it("uses matched id to fetch from store", () => {
    const user = { desc: "", id: 1 };
    const store = mockStore({ routing: { location: { pathname: "/edit/business_units/1" } }, entities: { businessUnits: { byId: { [user.id]: user } } } });
    const wrapper = shallow(<BusinessUnitForm store={store} />);
    const props = wrapper.props();
    expect(props.id).toEqual("1");
    expect(props.item).toEqual(user);
    props.getBusinessUnit(1);
    props.saveBusinessUnit({ id: 1 });
    const [userReq] = fetchEntitiesTypes("BUSINESSUNIT");
    const [saveReq] = saveTypes("BUSINESSUNIT");
    expect(store.getActions().map(a => a.type)).toEqual([userReq, saveReq]);
  });
});
