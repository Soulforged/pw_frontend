//@flow
import { push } from "react-router-redux";
import { CALL_API } from "src/constants";
import mocks from "src/mocks";
import actions from "src/actions";
import { user, list, error } from "./schemas";

const { fetchTypes, saveTypes } = actions;

const USER = "USER";
const USERS = "USER";

const restPath = body => (body.id ? `/${body.id}` : "");

export const saveUser = body => ({
  [CALL_API]: {
    types: saveTypes(USER),
    endpoint: `/user/backofficeuser${restPath(body)}`,
    body,
    update: body.id != null,
    key: "users",
    errorSchema: error,
    mock: mocks.userCreate,
    after: dispatch => dispatch(push("/users"))
  }
});

export const fetchUser = id => ({
  [CALL_API]: {
    types: fetchTypes(USER),
    endpoint: `/user/backofficeuser/${id}`,
    schema: user,
    errorSchema: error,
    key: "users",
    mock: mocks.user
  }
});

export const fetchUsers = () => ({
  [CALL_API]: {
    types: fetchTypes(USERS),
    endpoint: "/user/backofficeuser",
    schema: list(user),
    errorSchema: error,
    key: "users",
    mock: mocks.users
  }
});

export const fetchUserByCriteria = ({ criteria, filter }) => {
  if (!filter) {
    return fetchUsers();
  }
  return {
    [CALL_API]: {
      types: fetchTypes("USERS_FILTER"),
      endpoint: `/user/backofficeuser/${criteria}/${filter}`,
      schema: user,
      errorSchema: error,
      key: "users",
      mock: mocks.users
    }
  };
};
