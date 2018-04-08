//@flow

import actions from "src/actions";

const { setError } = actions;

it("supports a setError action that", () => {
  const example = {
    type: "SET_ERROR",
    payload: false
  };
  expect(setError(false)).toEqual(example);
  const error = { message: "error" };
  expect(setError(error)).toEqual({ ...example, payload: error });
});
