//@flow
import { push } from "react-router-redux";
import { CALL_API } from "src/constants";
import mocks from "src/mocks";
import actions from "src/actions";
import { role, list, error } from "./schemas";

const { fetchEntitiesTypes, saveTypes } = actions;

const ROLE = "ROLE";
const ROLES = "ROLE";

const restPath = body => (body.id ? `/${body.id}` : "");

export const saveRole = body => ({
  [CALL_API]: {
    types: saveTypes(ROLE),
    endpoint: `/user/role${restPath(body)}`,
    body,
    update: body.id != null,
    key: "roles",
    errorSchema: error,
    mock: mocks.roleCreate,
    after: dispatch => dispatch(push("/roles"))
  }
});

export const fetchRole = id => ({
  [CALL_API]: {
    types: fetchEntitiesTypes(ROLE),
    endpoint: `/user/role/${id}`,
    schema: role,
    errorSchema: error,
    key: "roles",
    mock: mocks.role
  }
});

export const fetchRoles = () => ({
  [CALL_API]: {
    types: fetchEntitiesTypes(ROLES),
    endpoint: "/user/role",
    schema: list(role),
    errorSchema: error,
    key: "roles",
    mock: mocks.roles
  }
});
