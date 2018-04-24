//@flow

import { connect } from "react-redux";

import { fetchErrors } from "../actions";

import Errors from "../Errors";

const mapStateToProps = ({ dashboard: { errors, summary } }) => ({ errors, summary });

const mapDispatchToProps = { fetchErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
