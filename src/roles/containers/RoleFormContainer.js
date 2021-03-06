//@flow
import { connect } from "react-redux";
import { matchPath } from "react-router";
import { push } from "react-router-redux";
import { fetchRole, saveRole } from "../actions";
import RoleForm from "../RoleForm";

const mapStateToProps = ({ routing: { location: { pathname } }, entities: { roles } }) => {
  const match = matchPath(pathname, { path: "/(edit|new)/roles/:id?" });
  const params = match ? match.params : null;
  const id = params ? params.id : null;
  const item = id ? roles.byId && roles.byId[id] : {};
  return {
    id,
    item,
    fetching: roles.fetching,
    saving: roles.saving
  };
};

const returnToList = () => push("/roles");

const mapDispatchToProps = { fetchRole, saveRole, returnToList };

export default connect(mapStateToProps, mapDispatchToProps)(RoleForm);
