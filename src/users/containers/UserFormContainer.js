//@flow
import { connect } from "react-redux";
import { matchPath } from "react-router";
import { push } from "react-router-redux";
import { fetchBusinessUnits } from "src/businessUnits/actions";
import { fetchRoles } from "src/roles/actions";
import { fetchUser, saveUser } from "../actions";
import UserForm from "../UserForm";

const mapStateToProps = ({ routing: { location: { pathname } }, entities }) => {
  const { users, roles, businessUnits } = entities;
  const match = matchPath(pathname, { path: "/(edit|new)/users/:id?" });
  const params = match ? match.params : null;
  const id = params ? params.id : null;
  const item = id ? users.byId && users.byId[id] : {};
  return {
    id,
    item,
    fetching: users.fetching,
    saving: users.saving,
    roles,
    businessUnits
  };
};

const returnToList = () => push("/users");

const mapDispatchToProps = {
  fetchUser,
  saveUser,
  returnToList,
  fetchRoles,
  fetchBusinessUnits
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
