//@flow
import { CALL_API } from "src/constants";
import mocks from "src/mocks";
import { user, list, error } from "./schemas";

export const fetchUsers = () => ({
  [CALL_API]: {
    types: ["@@entities/USERS_REQUEST", "@@entities/USERS_SUCCESS", "@@entities/USERS_FAILURE"],
    endpoint: "/user/backofficeuser",
    schema: list(user),
    errorSchema: error,
    key: "users",
  }
});

export const fetchUserByCriteria = ({ criteria, filter }) => {
  if (!filter) {
    return fetchUsers();
  }
  return {
    [CALL_API]: {
      types: ["@@entities/USERS_FILTER_REQUEST", "@@entities/USERS_FILTER_SUCCESS", "@@entities/USERS_FILTER_FAILURE"],
      endpoint: `/user/backofficeuser/${criteria}/${filter}`,
      schema: user,
      errorSchema: error,
      key: "users",
      mock: mocks.users
    }
  };
};
