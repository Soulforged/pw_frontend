//@flow
import { CALL_API } from "src/constants";
import { usersSchema } from "./schemas";

export const fetchUsers = prms => ({ // eslint-disable-line
  [CALL_API]: {
    types: ["USERS_REQUEST", "USERS_SUCCESS", "USERS_FAILURE"],
    endpoint: "/user/backofficeuser",
    schema: usersSchema
  }
});
