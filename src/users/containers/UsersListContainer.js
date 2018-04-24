//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchUsers } from "../actions";
import UsersList from "../UsersList";

const mapStateToProps = ({ entities: { users } }) => ({ users });

const showDetails = id => push(`/users/${id}`);

const mapDispatchToProps = { fetchUsers, showDetails };

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
