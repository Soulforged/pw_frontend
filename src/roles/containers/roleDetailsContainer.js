//@flow
import { connect } from "react-redux";
import { matchPath } from "react-router";
import type { Dispatch } from "src/types";
import { push } from "react-router-redux";
import RoleDetails from "../roleDetails";
import { fetchRole } from "../actions";

const mapStateToProps = ({ routing: { location: { pathname } }, entities: { roles } }) => {
  const match = matchPath(pathname, { path: "/roles/:id", exact: true, strict: true });
  const params = match ? match.params : null;
  const id = params ? params.id : null;
  const item = id ? roles.byId && roles.byId[id] : {};
  return {
    id,
    item,
    fetching: roles.fetching
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openForm: id => dispatch(push(`/edit/roles/${id}`)),
  fetchRole
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleDetails);
