//@flow
import React from "react";
import { shallow } from "enzyme";
import mockStore from "test/setupStoreMock";
import { RoleForm } from "src/roles";
import actions from "src/actions";

const { saveTypes, fetchEntitiesTypes } = actions;

describe("role details container tests", () => {
  it("receives null id if the URI doesn't match pattern", () => {
    const store = mockStore({ routing: { location: { pathname: "/roles" } }, entities: { roles: {} } });
    const wrapper = shallow(<RoleForm store={store} />);
    const props = wrapper.props();
    expect(props.id).toBe(null);
    expect(props.item).toEqual({});
  });

  it("uses matched id to fetch from store", () => {
    const role = { desc: "", id: 1 };
    const store = mockStore({ routing: { location: { pathname: "/edit/roles/1" } }, entities: { roles: { byId: { [role.id]: role } } } });
    const wrapper = shallow(<RoleForm store={store} />);
    const props = wrapper.props();
    expect(props.id).toEqual("1");
    expect(props.item).toEqual(role);
    props.fetchRole(1);
    props.saveRole({ id: 1 });
    const [roleReq] = fetchEntitiesTypes("ROLE");
    const [saveReq] = saveTypes("ROLE");
    expect(store.getActions().map(a => a.type)).toEqual([roleReq, saveReq]);
  });
});
