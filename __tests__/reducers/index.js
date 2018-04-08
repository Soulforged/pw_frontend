//@flow

import actions from "src/actions";
import { error as errorReducer } from "src/reducers";

const { setError } = actions;

it("enters error state", () => {
  const error = new Error("message");
  const newState = errorReducer({ error: false }, setError(error));
  expect(newState).toEqual({ error });
});

it("restores from error", () => {
  const newState = errorReducer({ error: { message: "some", status: "some" } }, setError());
  expect(newState).toEqual({ error: undefined });
});
