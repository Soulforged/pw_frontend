//@flow
import { connect } from "react-redux";
import { matchPath } from "react-router";
import { push } from "react-router-redux";
import UserDetails from "../UserDetails";
import { fetchUser } from "../actions";

const mapStateToProps = ({ routing: { location: { pathname } }, entities: { users } }) => {
  const match = matchPath(pathname, { path: "/users/:id", exact: true, strict: true });
  const params = match ? match.params : null;
  const id = params ? params.id : null;
  const item = id ? users.byId && users.byId[id] : {};
  return {
    id,
    item,
    fetching: users.fetching
  };
};

const openForm = id => push(`/edit/users/${id}`);

const mapDispatchToProps = { openForm, fetchUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
