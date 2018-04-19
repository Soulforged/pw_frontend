//@flow
import { connect } from "react-redux";
import type { Dispatch } from "src/types";
import { fetchUser } from "../actions";
import UserForm from "../UserForm";

const mapStateToProps = ({ routing: { location: { id } }, entities }) => ({
  id,
  item: entities.users.byId[id]
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUser: id => dispatch(fetchUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
