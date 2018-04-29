//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchUserByCriteria } from "../actions";

import Users from "../Users";

const mapStateToProps = () => ({});

const openForm = () => push("/new/users");

const mapDispatchToProps = { fetchUserByCriteria, openForm };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
