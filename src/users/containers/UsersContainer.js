//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchBusinessUnits } from "src/businessUnits/actions";
import { fetchUserByCriteria, fetchUsers } from "../actions";
import Users from "../Users";

const mapStateToProps = ({ entities: { users, businessUnits } }) => ({ users, businessUnits });

const showDetails = id => push(`/users/${id}`);
const openForm = () => push("/new/users");

const mapDispatchToProps = {
  fetchUserByCriteria, openForm, fetchUsers, showDetails, fetchBusinessUnits
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
