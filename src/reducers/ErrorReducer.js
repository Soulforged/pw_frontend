//@flow
import type { AppError } from "src/types";

type State = {
  error: AppError
};

const initialState: State = {
  error: false
};

export default (state: State = initialState, { payload }) => {
  if (payload) {
    const { error } = payload;
    return { ...state, error };
  }
  return state;
};
