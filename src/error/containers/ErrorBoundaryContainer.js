//@flow

import { connect } from "react-redux";
import actions from "src/actions";
import ErrorBoundary from "../ErrorBoundary";

const { setError } = actions;

const mapStateToProps = ({ error }) => (error);

const mapDispatchToProps = { setError };

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
