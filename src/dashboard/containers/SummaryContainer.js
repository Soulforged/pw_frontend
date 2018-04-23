//@flow
import { connect } from "react-redux";
import type { DispatchAPI } from "src/types";

import { fetchSummary } from "../actions";

import Summary from "../Summary";

const mapStateToProps = ({ dashboard: { summary } }) => ({ summary });

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
  fetchSummary: params => dispatch(fetchSummary(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
