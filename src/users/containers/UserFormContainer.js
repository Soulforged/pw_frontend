//@flow
import { connect } from "react-redux";
import { matchPath } from "react-router";
import { push } from "react-router-redux";
import { fetchUser, saveUser } from "../actions";
import UserForm from "../UserForm";

const mapStateToProps = ({ routing: { location: { pathname } }, entities: { users } }) => {
  const match = matchPath(pathname, { path: "/(edit|new)/users/:id?" });
  const params = match ? match.params : null;
  const id = params ? params.id : null;
  const item = id ? users.byId && users.byId[id] : {};
  return {
    id,
    item,
    fetching: users.fetching,
    saving: users.saving
  };
};

const returnToList = () => push("/users");

const mapDispatchToProps = { fetchUser, saveUser, returnToList };

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
