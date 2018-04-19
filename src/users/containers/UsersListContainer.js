//@flow
import { connect } from "react-redux";
import type { Dispatch } from "src/types";
import actions from "src/actions";
import { fetchUsers } from "../actions";
import UsersList from "../UsersList";

const { setSelected } = actions;

const mapStateToProps = ({ entities: { users } }) => ({ users });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsers: params => dispatch(fetchUsers(params)),
  setSelected: row => dispatch(setSelected(row))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
