//@flow
import { createActions } from "redux-actions";
import { CALL_API } from "src/constants";
import { User } from "src/schemas";
import type { UserInfo, AppError } from "src/types";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";

const login = ({ username, password }: UserInfo) => ({ // eslint-disable-line
  [CALL_API]: {
    types: ["LOGIN_REQUEST", LOGIN_SUCCESS, "LOGIN_FAILURE"],
    endpoint: "/authenticate/generate-token",
    body: { user: username, password },
    schema: User
  }
});

const syncActions = createActions({
  SET_ERROR: (error: AppError) => error,
  LOGOUT: () => ({}),
  SET_LOADING: (loading: boolean) => loading,
  TOGGLE_THEME: () => ({})
});

export default { LOGIN_SUCCESS, login, ...syncActions };
