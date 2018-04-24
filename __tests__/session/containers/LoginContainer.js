//@flow
import React from "react";
import { shallow } from "enzyme";
import mockStore from "test/setupStoreMock";
import { UserDetails } from "src/users";

describe("user details container tests", () => {
  it("receives null id if the URI doesn't match pattern", () => {
    const store = mockStore({ routing: { location: { pathname: "/users" } }, entities: { users: {} } });
    const wrapper = shallow(<UserDetails store={store} />);
    const props = wrapper.props();
    expect(props.id).toBe(null);
    expect(props.item).toEqual({});
  });

  it("uses matched id to fetch from store", () => {
    const user = { desc: "", id: 1 };
    const store = mockStore({ routing: { location: { pathname: "/users/1" } }, entities: { users: { byId: { [user.id]: user } } } });
    const wrapper = shallow(<UserDetails store={store} />);
    const props = wrapper.props();
    expect(props.id).toBe("1");
    expect(props.item).toEqual(user);
  });
});
