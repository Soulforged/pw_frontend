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

const saveTypes = (actionName) => {
  const normActionName = actionName.toUpperCase();
  return [
    `${ENTITIES}/${SAVE}_${normActionName}_${REQ}`,
    `${ENTITIES}/${SAVE}_${normActionName}_${SUCCESS}`,
    `${ENTITIES}/${SAVE}_${normActionName}_${FAIL}`
  ];
};

const fetchTypes = actionName => [
  `${actionName}_${REQ}`,
  `${actionName}_${SUCCESS}`,
  `${actionName}_${FAIL}`
];

const fetchEntitiesTypes = actionName => fetchTypes(`${ENTITIES}/${actionName.toUpperCase()}`);

const login = ({ username, password }: UserInfo) => ({
  [CALL_API]: {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    endpoint: "/authenticate/generate-token",
    body: { user: username, password }
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
