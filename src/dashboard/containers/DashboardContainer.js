//@flow

import { connect } from "react-redux";
import type { Dispatch } from "src/types";

import {
  fetchSummary,
  fetchTrendsByDate,
  fetchTrendsByInstitution,
  fetchErrors
} from "../actions";

import Dashboard from "../Dashboard";

const mapStateToProps = ({ dashboard }) => dashboard;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSummary: params => dispatch(fetchSummary(params)),
  fetchTrendsByDate: params => dispatch(fetchTrendsByDate(params)),
  fetchTrendsByInstitution: params => dispatch(fetchTrendsByInstitution(params)),
  fetchErrors: params => dispatch(fetchErrors(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
