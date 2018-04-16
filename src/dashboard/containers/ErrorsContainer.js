//@flow

import { connect } from "react-redux";
import type { Dispatch } from "src/types";

import { fetchErrors } from "../actions";

import Errors from "../Errors";

const mapStateToProps = ({ dashboard: { errors, summary } }) => ({ errors, summary });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchErrors: params => dispatch(fetchErrors(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
