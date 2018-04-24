//@flow
import { connect } from "react-redux";

import {
  fetchSummary,
  fetchTrendsByDate,
  fetchTrendsByInstitution,
  fetchErrors
} from "../actions";

import Dashboard from "../Dashboard";

const mapStateToProps = ({ dashboard }) => dashboard;

const mapDispatchToProps = {
  fetchSummary,
  fetchTrendsByDate,
  fetchTrendsByInstitution,
  fetchErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
