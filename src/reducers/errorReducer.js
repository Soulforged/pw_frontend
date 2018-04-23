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

export default (state: State = initialState, action: Object) => {
  if (action.type === setError().type) {
    const error = action.payload;
    return error ? { ...state, error } : { ...state, error: false };
  }
  return state;
};
