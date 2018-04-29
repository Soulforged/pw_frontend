//@flow
import fetchMock from "fetch-mock";
import mockStore from "test/setupStoreMock";
import actions from "src/actions";
import {
  saveRole,
  fetchRole,
  fetchRoles
} from "src/roles/actions";
import mocks from "src/mocks";

const { fetchEntitiesTypes, saveTypes } = actions;

describe("roles actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("supports fetchRoles action", () => {
    fetchMock.getOnce(
      `end:/user/role`,
      { body: mocks.summary, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchEntitiesTypes("ROLES").slice(0, 2);
    const store = mockStore({ entities: { roles: {} } });
    return store.dispatch(fetchRoles()).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports fetchRole action", () => {
    fetchMock.getOnce(
      `end:/user/role/1`,
      { body: mocks.summary, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchEntitiesTypes("ROLE").slice(0, 2);
    const store = mockStore({ entities: { roles: {} } });
    return store.dispatch(fetchRole(1)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports saveRole action with update", () => {
    fetchMock.putOnce(
      `end:/user/role/1`,
      { body: "ok" }
    );
    const expectedActions = saveTypes("ROLE").slice(0, 2);
    const store = mockStore({ entities: { roles: {} } });
    return store.dispatch(saveRole(mocks.role)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports save a New Role action", () => {
    fetchMock.postOnce(
      `end:/user/role`,
      { body: { id: 1 }, headers: { "content-type": "application/json" } }
    );
    const expectedActions = saveTypes("ROLE").slice(0, 2);
    const store = mockStore({ entities: { roles: {} } });
    const newRole = { ...mocks.role, id: null };
    return store.dispatch(saveRole(newRole)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });
});
