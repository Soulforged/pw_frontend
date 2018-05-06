//@flow
import { actionsTemplate } from "src/crud";
import { businessUnit } from "./schemas";

export default actionsTemplate("businessUnit", "/user/businessunit", businessUnit, {
  queryCreator: ({ name }) => `?companyId=1&companyType=Merchant&name=${name}`,
  baseQuery: () => "?companyId=1&companyType=Merchant",
  mock: true
});
