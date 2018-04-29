//@flow
import fetchMock from "fetch-mock";
import mockStore from "test/setupStoreMock";
import actions from "src/actions";
import {
  saveUser,
  fetchUser,
  fetchUsers,
  fetchUserByCriteria
} from "src/users/actions";
import mocks from "src/mocks";

const { fetchEntitiesTypes, saveTypes } = actions;

describe("users actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("supports fetchUsers action", () => {
    fetchMock.getOnce(
      `end:/user/backofficeuser`,
      { body: mocks.users, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchEntitiesTypes("USERS").slice(0, 2);
    const store = mockStore({ entities: { users: {} } });
    return store.dispatch(fetchUsers()).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports fetchUser action", () => {
    fetchMock.getOnce(
      `end:/user/backofficeuser/1`,
      { body: mocks.user, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchEntitiesTypes("USER").slice(0, 2);
    const store = mockStore({ entities: { users: {} } });
    return store.dispatch(fetchUser(1)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports fetchUserByCriteria action", () => {
    const filter = {
      criteria: "username",
      filter: "filter"
    };
    fetchMock.getOnce(
      `end:/user/backofficeuser/${filter.criteria}/${filter.filter}`,
      { body: mocks.summary, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchEntitiesTypes("USERS_FILTER").slice(0, 2);
    const store = mockStore({ entities: { users: {} } });
    return store.dispatch(fetchUserByCriteria(filter)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("sends fetchUsers if creteria is empty", () => {
    fetchMock.getOnce(
      `end:/user/backofficeuser`,
      { body: mocks.summary, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchEntitiesTypes("USERS").slice(0, 2);
    const store = mockStore({ entities: { users: {} } });
    return store.dispatch(fetchUserByCriteria({})).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports saveUser action with update", () => {
    fetchMock.putOnce(
      `end:/user/backofficeuser/117`,
      { body: "ok" }
    );
    const expectedActions = saveTypes("USER").slice(0, 2);
    const store = mockStore({ entities: { users: {} } });
    return store.dispatch(saveUser(mocks.user)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports saveUser action", () => {
    fetchMock.postOnce(
      `end:/user/backofficeuser`,
      { body: { id: 1 }, headers: { "content-type": "application/json" } }
    );
    const expectedActions = saveTypes("USER").slice(0, 2);
    const store = mockStore({ entities: { users: {} } });
    const newUser = { ...mocks.user, id: null };
    return store.dispatch(saveUser(newUser)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });
});
