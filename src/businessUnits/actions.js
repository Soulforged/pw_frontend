//@flow
import { push } from "react-router-redux";
import { CALL_API } from "src/constants";
import actions from "src/actions";
import { businessUnit, list, error } from "./schemas";

const { fetchEntitiesTypes, saveTypes } = actions;

const BUSINESSUNIT = "BUSINESSUNIT";
const BUSINESSUNITS = "BUSINESSUNITS";

const restPath = body => (body.id ? `/${body.id}` : "");

export const saveBusinessUnit = (body: Object) => ({
  [CALL_API]: {
    types: saveTypes(BUSINESSUNIT),
    endpoint: `/user/businessunit${restPath(body)}`,
    body,
    update: body.id != null,
    key: "businessUnits",
    errorSchema: error,
    after: dispatch => dispatch(push("/business_units"))
  }
});

const fetchAllBusinessUnits = () => ({
  [CALL_API]: {
    types: fetchEntitiesTypes(BUSINESSUNITS),
    endpoint: `/user/businessunit?companyId=1&companyType=Merchant`,
    schema: list(businessUnit),
    errorSchema: error,
    key: "businessUnits",
    invalidatesCache: true
  }
});

export const fetchBusinessUnits = ({ name }: { name: string } = {}) => {
  if (!name) {
    return fetchAllBusinessUnits();
  }
  return ({
    [CALL_API]: {
      types: fetchEntitiesTypes(BUSINESSUNITS),
      endpoint: `/user/businessunit?companyId=1&companyType=Merchant&name=${name}`,
      schema: list(businessUnit),
      errorSchema: error,
      key: "businessUnits",
      invalidatesCache: true
    }
  });
};

export const getBusinessUnit = (id: number) => ({
  [CALL_API]: {
    types: fetchEntitiesTypes(BUSINESSUNIT),
    endpoint: `/user/businessunit/${id}`,
    schema: businessUnit,
    errorSchema: error,
    key: "businessUnits"
  }
});
