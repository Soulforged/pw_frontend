//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchRoles } from "../actions";
import RolesList from "../RolesList";

const mapStateToProps = ({ entities: { roles } }) => ({ roles });

const showDetails = id => push(`/roles/${id}`);

const mapDispatchToProps = { fetchRoles, showDetails };

export default connect(mapStateToProps, mapDispatchToProps)(RolesList);
