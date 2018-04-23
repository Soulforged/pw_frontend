//@flow

import { connect } from "react-redux";
import type { DispatchAPI } from "src/types";

import { fetchErrors } from "../actions";

import Errors from "../Errors";

const mapStateToProps = ({ dashboard: { errors, summary } }) => ({ errors, summary });

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
  fetchErrors: params => dispatch(fetchErrors(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
