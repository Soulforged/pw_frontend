//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";
import type { DispatchAPI } from "src/types";
import { fetchUsers } from "../actions";
import UsersList from "../UsersList";

const mapStateToProps = ({ entities: { users } }) => ({ users });

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  showDetails: id => dispatch(push(`/users/${id}`))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
