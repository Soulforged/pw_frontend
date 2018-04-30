//@flow
import fetchMock from "fetch-mock";
import mockStore from "test/setupStoreMock";
import actions from "src/actions";
import {
  saveBusinessUnit,
  getBusinessUnit,
  fetchBusinessUnits
} from "src/businessUnits/actions";
import mocks from "src/mocks";

const { fetchEntitiesTypes, saveTypes } = actions;

describe("business units actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("supports fetchBusinessUnits action", () => {
    fetchMock.getOnce(
      `end:/user/businessunit?companyId=1&companyType=Merchant`,
      { body: mocks.summary, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchEntitiesTypes("BUSINESSUNITS").slice(0, 2);
    const store = mockStore({ entities: { businessunits: {} } });
    return store.dispatch(fetchBusinessUnits()).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports fetchBusinessUnits action when filtered by business unit name", () => {
    fetchMock.getOnce(
      `end:/user/businessunit?companyId=1&companyType=Merchant&name=Finance`,
      { body: mocks.summary, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchEntitiesTypes("BUSINESSUNITS").slice(0, 2);
    const store = mockStore({ entities: { businessunits: {} } });
    return store.dispatch(fetchBusinessUnits({ name: "Finance" })).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports getBusinessUnit action", () => {
    fetchMock.getOnce(
      `end:/user/businessunit/1`,
      { body: mocks.summary, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchEntitiesTypes("BUSINESSUNIT").slice(0, 2);
    const store = mockStore({ entities: { businessunits: {} } });
    return store.dispatch(getBusinessUnit(1)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports saveBusinessUnit action", () => {
    fetchMock.postOnce(
      `end:/user/businessunit`, mocks.BunitCreate,
      { body: { id: 1 }, headers: { "content-type": "application/json" } }
    );
    const expectedActions = saveTypes("BUSINESSUNIT").slice(0, 2);
    const store = mockStore({ entities: { businessUnits: {} } });
    return store.dispatch(saveBusinessUnit(mocks.BunitCreate)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });
});
