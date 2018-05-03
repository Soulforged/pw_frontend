//@flow
import { mainTemplate, detailTemplate, formTemplate } from "src/crudContainerTemplate";
import { fetchBusinessUnits } from "src/businessUnits/actions";
import { CRUD, ActiveCell } from "src/components";
import Users from "./Users";
import { fetchUserByCriteria, fetchUsers } from "./actions";

export const Main = mainTemplate("users", "users", dispatch => ({
  loader: id => dispatch(fetchBusinessUnits()) && dispatch(fetchUsers()),
  filter: params => dispatch(fetchUserByCriteria(params))
}))(Users);

export const UserForm = formTemplate("users", )
