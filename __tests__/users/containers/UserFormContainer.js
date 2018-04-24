//@flow
import React from "react";
import { shallow } from "enzyme";
import mockStore from "test/setupStoreMock";
import { UserForm } from "src/users";
import actions from "src/actions";

const { saveTypes, fetchEntitiesTypes } = actions;

describe("user details container tests", () => {
  it("receives null id if the URI doesn't match pattern", () => {
    const store = mockStore({ routing: { location: { pathname: "/users" } }, entities: { users: {} } });
    const wrapper = shallow(<UserForm store={store} />);
    const props = wrapper.props();
    expect(props.id).toBe(null);
    expect(props.item).toEqual({});
  });

  it("uses matched id to fetch from store", () => {
    const user = { desc: "", id: 1 };
    const store = mockStore({ routing: { location: { pathname: "/edit/users/1" } }, entities: { users: { byId: { [user.id]: user } } } });
    const wrapper = shallow(<UserForm store={store} />);
    const props = wrapper.props();
    expect(props.id).toEqual("1");
    expect(props.item).toEqual(user);
    props.fetchUser(1);
    props.saveUser({ id: 1 });
    const [userReq] = fetchEntitiesTypes("USER");
    const [saveReq] = saveTypes("USER");
    expect(store.getActions().map(a => a.type)).toEqual([userReq, saveReq]);
  });
});
