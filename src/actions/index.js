//@flow
import { createActions } from "redux-actions";
import { CALL_API } from "src/constants";
// import mocks from "src/mocks";
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
  `${actionName}_${REQ}`,
  `${actionName}_${SUCCESS}`,
  `${actionName}_${FAIL}`
];

const fetchEntitiesTypes = actionName => fetchTypes(`${ENTITIES}/${actionName}`);

const login = ({ username, password }: UserInfo) => ({ // eslint-disable-line
  [CALL_API]: {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    endpoint: "/authenticate/generate-token",
    body: { user: username, password },
    // mock: mocks.login
  }
});

const syncActions = createActions({
  SET_ERROR: (error: AppError) => error,
  LOGOUT: () => ({}),
  TOGGLE_THEME: () => ({}),
  TOGGLE_MENU: () => ({}),
  TOGGLE_USER_MENU: () => ({}),
});

export default {
  ENTITIES,
  SAVE,
  REQ,
  SUCCESS,
  FAIL,
  saveTypes,
  fetchTypes,
  fetchEntitiesTypes,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  login,
  ...syncActions
};
