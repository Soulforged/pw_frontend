//@flow
import { push } from "react-router-redux";
import { CALL_API } from "src/constants";
import actions from "src/actions";
import { user, list, error } from "./schemas";
import type { User } from "./types";

type Params = {
  criteria: string,
  filter: string
};

const { fetchEntitiesTypes, saveTypes } = actions;

const USER = "USER";
const USERS = "USERS";

const restPath = body => (body.id ? `/${body.id}` : "");

export const saveUser = (body: User) => ({
  [CALL_API]: {
    types: saveTypes(USER),
    endpoint: `/user/backofficeuser${restPath(body)}`,
    body,
    update: body.id != null,
    key: "users",
    errorSchema: error,
    after: dispatch => dispatch(push("/users"))
  }
});

export const fetchUser = (id: number) => ({
  [CALL_API]: {
    types: fetchEntitiesTypes(USER),
    endpoint: `/user/backofficeuser/${id}`,
    schema: user,
    errorSchema: error,
    key: "users"
  }
});

export const fetchUsers = () => ({
  [CALL_API]: {
    types: fetchEntitiesTypes(USERS),
    endpoint: "/user/backofficeuser",
    schema: list(user),
    errorSchema: error,
    key: "users"
  }
});

export const fetchUserByCriteria = ({ criteria, filter }: Params) => {
  if (!filter) {
    return fetchUsers();
  }
  return {
    [CALL_API]: {
      types: fetchEntitiesTypes("USERS_FILTER"),
      endpoint: `/user/backofficeuser/${criteria}/${filter}`,
      schema: user,
      errorSchema: error,
      key: "users"
    }
  };
};
