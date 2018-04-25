//@flow
import mocks from "src/mocks";
import reducer from "src/reducers/entitiesReducer";
import actions from "src/actions";

const { fetchTypes, fetchEntitiesTypes, saveTypes } = actions;

it("ignores things that are not entities actions", () => {
  const [req] = fetchTypes("DASHBOARD");
  const newState = reducer({ entities: {} }, { type: req, key: "dash" });
  expect(newState).toEqual({ entities: {} });
});

it("handles full flow for anything that's a fetch entities action", () => {
  const [req, success, failure] = fetchEntitiesTypes("DASHBOARD");
  const fetchingState = reducer({}, { type: req, key: "dash" });
  expect(fetchingState).toEqual({ dash: { fetching: true } });
  const error = {
    message: "error",
    status: "error",
    expected: true
  };
  const errorAction = {
    type: failure,
    key: "dash",
    error
  };
  const errorState = reducer(fetchingState, errorAction);
  expect(errorState).toEqual({ dash: { fetching: false, error } });
  const { users } = mocks;
  const ids = users.results.map(u => u.id);
  const successAction = {
    type: success,
    key: "dash",
    response: {
      entities: { users },
      result: ids
    }
  };
  const successState = reducer(errorState, successAction);
  expect(successState).toEqual({
    dash: {
      fetching: false, lastResultIds: ids, ids, error: false, valid: true
    }
  });
});

it("handles full flow for anything that's a save entities action", () => {
  const [req, success, failure] = saveTypes("DASHBOARD");
  const savingState = reducer({}, { type: req, key: "dash" });
  expect(savingState).toEqual({ dash: { saving: true } });
  const saveError = {
    message: "error",
    status: "error",
    expected: true
  };
  const errorAction = {
    type: failure,
    key: "dash",
    error: saveError
  };
  const errorState = reducer(savingState, errorAction);
  expect(errorState).toEqual({ dash: { saving: false, saveError } });
  const successAction = { type: success, response: { id: 1 }, key: "dash" };
  const successState = reducer(errorState, successAction);
  expect(successState).toEqual({
    dash: {
      saving: false, saveError: false, savedId: 1, valid: false
    }
  });
});
