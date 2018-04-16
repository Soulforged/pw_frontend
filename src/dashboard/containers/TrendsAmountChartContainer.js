//@flow

import { connect } from "react-redux";
import type { Dispatch } from "src/types";

import { fetchTrendsByDate } from "../actions";

import TrendsAmountChart from "../TrendsAmountChart";

const mapStateToProps = ({ dashboard: { trendsByDate } }) => ({ trendsByDate });

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchTrendsByDate: params => dispatch(fetchTrendsByDate(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendsAmountChart);
