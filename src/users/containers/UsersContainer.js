//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchUserByCriteria, fetchUsers } from "../actions";
import Users from "../Users";

const mapStateToProps = ({ entities: { users } }) => ({ users });

const showDetails = id => push(`/users/${id}`);
const openForm = () => push("/new/users");

const mapDispatchToProps = {
  fetchUserByCriteria, openForm, fetchUsers, showDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
