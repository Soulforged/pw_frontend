//@flow
import fetchMock from "fetch-mock";
import mockStore from "test/setupStoreMock";
import actions from "src/actions";
import {
  fetchSummary,
  fetchTrendsByDate,
  fetchTrendsByInstitution,
  fetchErrors
} from "src/dashboard/actions";
import mocks from "src/mocks";

const { fetchTypes } = actions;

describe("dashboard actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("supports fetchSummary action", () => {
    const params = { fromDate: "2017-01-01", toDate: "2018-01-01" };
    fetchMock.getOnce(
      `end:/bi/totals/transactions?date_from=${params.fromDate}&date_to=${params.toDate}&distinct=sender_account_number`,
      { body: mocks.summary, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchTypes("DASHBOARD_SUMMARY").slice(0, 2);
    const store = mockStore({ dashboard: {} });
    return store.dispatch(fetchSummary(params)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports fetchTrendsByDate action", () => {
    const params = { fromDate: "2017-01-01", toDate: "2018-01-01" };
    fetchMock.getOnce(
      `end:/bi/totals/transactions?date_from=${params.fromDate}&date_to=${params.toDate}&group_by=date`,
      { body: mocks.trendsByDate, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchTypes("DASHBOARD_TRENDS_BY_DATE").slice(0, 2);
    const store = mockStore({ dashboard: {} });
    return store.dispatch(fetchTrendsByDate(params)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports fetchTrendsByInstitution action", () => {
    const params = { fromDate: "2017-01-01", toDate: "2018-01-01" };
    fetchMock.getOnce(
      `end:/bi/totals/transactions?date_from=${params.fromDate}&date_to=${params.toDate}&group_by=institution_name`,
      { body: mocks.summary, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchTypes("DASHBOARD_TRENDS_BY_INSTITUTION").slice(0, 2);
    const store = mockStore({ dashboard: {} });
    return store.dispatch(fetchTrendsByInstitution(params)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });

  it("supports fetchErrors action", () => {
    const params = { fromDate: "2017-01-01", toDate: "2018-01-01" };
    fetchMock.getOnce(
      `end:/bi/totals/transactions?date_from=${params.fromDate}&date_to=${params.toDate}&group_by=status&status=ERROR`,
      { body: mocks.summary, headers: { "content-type": "application/json" } }
    );
    const expectedActions = fetchTypes("DASHBOARD_ERRORS").slice(0, 2);
    const store = mockStore({ dashboard: {} });
    return store.dispatch(fetchErrors(params)).then(() => (
      expect(store.getActions().map(a => a.type)).toEqual(expectedActions)
    ));
  });
});
