//@flow
import type { AppError } from "src/types";
import actions from "src/actions";

const { setError } = actions;

type State = {
  error: AppError
};

const initialState: State = {
  error: false
};

export default (state: State = initialState, action) => {
  if (action.type.indexOf("FAILURE") || action.type === setError.type()) {
    const { error } = action;
    return { ...state, error };
  }
  return state;
};
