//@flow
import apiFactory from "src/reduxconf/middlewares/apiFactory";
import mockStore from "test/setupStoreMock";
import { CALL_API } from "src/constants";
import fetchMock from "fetch-mock";
import { schema } from "normalizr"
import { error } from "src/schemas";

describe("api factory tests", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  const apiAdapter = apiFactory({ root: "http://localhost:5001" });
  const store = mockStore({});
  const boundAdapter = apiAdapter(store)(store.dispatch);
  const validAction = { [CALL_API]: { endpoint: "", types: ["A", "B", "C"], key: "s" } };

  it("does nothing if action is not CALL_API", () => {
    const action = { type: "SOMETHING" };
    const store1 = mockStore({});
    const boundAdapter1 = apiAdapter(store1)(store1.dispatch);
    expect(boundAdapter1(action)).toBe(action);
  });

  it("throws an error if endpoint is not a string", () => {
    const action = { [CALL_API]: { endpoint: [] } };
    expect(() => boundAdapter(action)).toThrow();
  });

  it("throws an error if action types is not exactly an array with 3 elements", () => {
    const action = { [CALL_API]: { endpoint: "", types: [] } };
    expect(() => boundAdapter(action)).toThrow();
  });

  it("throws an error if action types are not strings", () => {
    const action = { [CALL_API]: { endpoint: "", types: [1, "A", true] } };
    expect(() => boundAdapter(action)).toThrow();
  });

  it("throws an error if action types are not strings", () => {
    const action = { [CALL_API]: { endpoint: "", types: [1, "A", true] } };
    expect(() => boundAdapter(action)).toThrow();
  });

  it("dispatches REQUEST and then simply throws if the promise fails unexpectedly", () => {
    fetchMock.getOnce("*", { throws: new Error("error") });
    const store1 = mockStore({});
    const boundAdapter1 = apiAdapter(store1)(store1.dispatch);
    expect(() => boundAdapter1(validAction)).toThrow();
    expect(store1.getActions()).toEqual([{ type: "A", key: "s" }]);
  });

  it("dispatches REQUEST and then FAILURE if promise is rejected", () => {
    fetchMock.getOnce("*", { status: 404, body: { description: "error" } });
    const store1 = mockStore({});
    const boundAdapter1 = apiAdapter(store1)(store1.dispatch);
    boundAdapter1(validAction).then(() => (
      expect(store1.getActions()).toEqual([
        { type: "A", key: "s" },
        { type: "C", key: "s", error: { description: "error" }}
      ])
    ));
  });

  it("dispatches REQUEST and then SUCCESS if promise succeeds", () => {
    fetchMock.getOnce("*", { body: { description: "something" } });
    const store1 = mockStore({});
    const boundAdapter1 = apiAdapter(store1)(store1.dispatch);
    boundAdapter1(validAction).then(() => (
      expect(store1.getActions()).toEqual([
        { type: "A", key: "s" },
        { type: "B", key: "s", response: { description: "something" }}
      ])
    ));
  });

  it("uses schema to normalize if available", () => {
    const dummySchema = new schema.Entity("some");
    const action = { ...validAction, [CALL_API]: { ...validAction[CALL_API], schema: dummySchema } };
    fetchMock.getOnce("*", { body: { id: 1, desc_ription: "some" } });
    const store1 = mockStore({});
    const boundAdapter1 = apiAdapter(store1)(store1.dispatch);
    boundAdapter1(action).then(() => (
      expect(store1.getActions()).toEqual([
        { type: "A", key: "s" },
        {
          type: "B",
          key: "s",
          response: {
            entities: {
              "some": { 1: { descRiption: "some", id: 1 } }
            },
            result: 1
          }
        }
      ])
    ));
  });

  it("uses errorSchema to normalize error if available", () => {
    const action = { ...validAction, [CALL_API]: { ...validAction[CALL_API], errorSchema: error } };
    fetchMock.getOnce("*", { status: 404, body: { description: "error" } });
    const store1 = mockStore({});
    const boundAdapter1 = apiAdapter(store1)(store1.dispatch);
    boundAdapter1(action).then(() => (
      expect(store1.getActions()).toEqual([
        { type: "A", key: "s" },
        { type: "C", key: "s", error: { message: "error", expected: true }}
      ])
    ));
  });

  it("executes any success post hooks that are available", () => {
    const action = { ...validAction, [CALL_API]: {
      ...validAction[CALL_API],
      after: (dispatch, r) => dispatch({ type: "D", body: r })
    }};
    fetchMock.getOnce("*", { body: { description: "some" } });
    const store1 = mockStore({});
    const boundAdapter1 = apiAdapter(store1)(store1.dispatch);
    boundAdapter1(action).then(() => (
      expect(store1.getActions()).toEqual([
        { type: "A", key: "s" },
        { type: "B", key: "s", response: { description: "some" }},
        { type: "D", body: { description: "some" }}
      ])
    ));
  });
});
