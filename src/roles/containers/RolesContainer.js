//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchRoles } from "../actions";
import Roles from "../Roles";

const mapStateToProps = ({ entities: { roles } }) => ({ roles });

const showDetails = id => push(`/roles/${id}`);
const openForm = () => push("/new/roles");

const mapDispatchToProps = { openForm, fetchRoles, showDetails };

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
