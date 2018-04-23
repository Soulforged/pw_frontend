//@flow

import { connect } from "react-redux";
import type { DispatchAPI } from "src/types";

import { fetchTrendsByDate } from "../actions";

import TrendsAmountChart from "../TrendsAmountChart";

const mapStateToProps = ({ dashboard: { trendsByDate } }) => ({ trendsByDate });

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
  fetchTrendsByDate: params => dispatch(fetchTrendsByDate(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendsAmountChart);
