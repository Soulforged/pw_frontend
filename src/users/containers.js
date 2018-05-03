//@flow
import { mainTemplate, detailTemplate, formTemplate } from "src/crud";
import { fetchBusinessUnits } from "src/businessUnits/actions";
import { fetchRoles } from "src/roles/actions";
import Users from "./Users";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import userActions from "./actions";

const {
  filter,
  fetchAll,
  fetchOne,
  save
} = userActions;

export const Main = mainTemplate(
  "users", "users",
  ({ businessUnits }) => ({ businessUnits }),
  dispatch => ({
    loader: () => dispatch(fetchBusinessUnits()) && dispatch(fetchAll()),
    filter: params => dispatch(filter(params))
  })
)(Users);

const mapState = ({ businessUnits, roles }) => ({ businessUnits, roles });

export const Form = formTemplate("users", "users", mapState, dispatch => ({
  loader: id => (
    dispatch(fetchBusinessUnits()) && dispatch(fetchRoles()) && id && dispatch(fetchOne(id))
  ),
  save: user => dispatch(save(user)),
}))(UserForm);

export const Detail = detailTemplate("users", "users", { loader: fetchOne })(UserDetails);
