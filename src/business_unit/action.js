//@flow
import { push } from "react-router-redux";
import { CALL_API } from "src/constants";
import mocks from "src/mocks";
import actions from "src/actions";
import { business_unit, list, error } from "./schemas";

const { fetchEntitiesTypes, saveTypes } = actions;

const BUSINESSUNIT = "BUSINESSUNIT";
const BUSINESSUNITS = "BUSINESSUNIT";

const restPath = body => (body.id ? `/${body.id}` : "");

export const saveBusinessUnit = body => ({
  [CALL_API]: {
    types: saveTypes(BUSINESSUNIT),
    endpoint: `/user/businessunit${restPath(body)}`,
    body,
    update: body.id != null,
    key: "businessunits",
    errorSchema: error,
    mock: mocks.BunitCreate,
    after: dispatch => dispatch(push("/businessunits"))
  }
});

export const fetchBusinessUnits = () => ({
    [CALL_API]: {
      types: fetchEntitiesTypes(BUSINESSUNITS),
      endpoint: "/user/businessunit",
      schema: list(business_unit),
      errorSchema: error,
      key: "businessunits",
      mock: mocks.
    }
  });