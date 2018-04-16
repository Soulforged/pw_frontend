//@flow
import { connect } from "react-redux";
import type { Dispatch } from "src/types";

import { fetchSummary } from "../actions";

import Summary from "../Summary";

const mapStateToProps = ({ dashboard: { summary } }) => ({ summary });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSummary: params => dispatch(fetchSummary(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
