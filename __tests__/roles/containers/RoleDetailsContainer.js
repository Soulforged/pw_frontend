//@flow
import React from "react";
import { shallow } from "enzyme";
import mockStore from "test/setupStoreMock";
import { RoleDetails } from "src/roles";

describe("role details container tests", () => {
  it("receives null id if the URI doesn't match pattern", () => {
    const store = mockStore({ routing: { location: { pathname: "/roles" } }, entities: { roles: {} } });
    const wrapper = shallow(<RoleDetails store={store} />);
    const props = wrapper.props();
    expect(props.id).toBe(null);
    expect(props.item).toEqual({});
  });

  it("uses matched id to fetch from store", () => {
    const role = { desc: "", id: 1 };
    const store = mockStore({ routing: { location: { pathname: "/roles/1" } }, entities: { roles: { byId: { [role.id]: role } } } });
    const wrapper = shallow(<RoleDetails store={store} />);
    const props = wrapper.props();
    expect(props.id).toBe("1");
    expect(props.item).toEqual(role);
  });
});
