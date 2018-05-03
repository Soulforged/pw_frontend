//@flow
import { actionsTemplate } from "src/crud";
import { user } from "./schemas";

type Params = {
  criteria: string,
  filter: string
};

export default actionsTemplate("user", "/user/backofficeuser", user, {
  mock: true,
  queryCreator: ({ criteria, filter }: Params) => `/${criteria}/${filter}`
});
