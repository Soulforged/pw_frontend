//@flow
import { createActions } from "redux-actions";
import { CALL_API } from "src/constants";
import type { UserInfo, AppError } from "src/types";

const ENTITIES = "@@entities";
const SAVE = "SAVE";
const REQ = "REQUEST";
const SUCCESS = "SUCCESS";
const FAIL = "FAILURE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const saveTypes = actionName => [
  `${ENTITIES}/${SAVE}_${actionName}_${REQ}`,
  `${ENTITIES}/${SAVE}_${actionName}_${SUCCESS}`,
  `${ENTITIES}/${SAVE}_${actionName}_${FAIL}`
];

const fetchTypes = actionName => [
  `${ENTITIES}/${actionName}_${REQ}`,
  `${ENTITIES}/${actionName}_${SUCCESS}`,
  `${ENTITIES}/${actionName}_${FAIL}`
];

const login = ({ username, password }: UserInfo) => ({ // eslint-disable-line
  [CALL_API]: {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    endpoint: "/authenticate/generate-token",
    body: { user: username, password },
  }
});

const syncActions = createActions({
  SET_ERROR: (error: AppError) => error,
  LOGOUT: () => ({}),
  SET_LOADING: (loading: boolean) => loading,
  TOGGLE_THEME: () => ({}),
  TOGGLE_MENU: () => ({}),
  TOGGLE_USER_MENU: () => ({}),
  SET_SELECTED: item => item,
});

export default {
  ENTITIES,
  SAVE,
  REQ,
  SUCCESS,
  FAIL,
  saveTypes,
  fetchTypes,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  login,
  ...syncActions
};
