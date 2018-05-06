//@flow
import { containerTemplate } from "src/crud";
import businessUnitsActions from "src/businessUnits/actions";
import { fetchRoles } from "src/roles/actions";
import Users from "./Users";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import userActions from "./actions";

const fetchBusinessUnits = businessUnitsActions.fetchAll;

const {
  filter,
  fetchAll,
  fetchOne,
  save
} = userActions;

const {
  mainTemplate,
  formTemplate,
  detailTemplate
} = containerTemplate("users");

export const Main = mainTemplate(
  ({ businessUnits }) => ({ businessUnits }),
  dispatch => ({
    loader: () => dispatch(fetchBusinessUnits()) && dispatch(fetchAll()),
    filter: params => dispatch(filter(params))
  })
)(Users);

const mapState = ({ businessUnits, roles }) => ({ businessUnits, roles });

export const Form = formTemplate(mapState, dispatch => ({
  loader: id => (
    dispatch(fetchBusinessUnits()) && dispatch(fetchRoles()) && id && dispatch(fetchOne(id))
  ),
  save: user => dispatch(save(user)),
}))(UserForm);

export const Detail = detailTemplate({ loader: fetchOne })(UserDetails);
