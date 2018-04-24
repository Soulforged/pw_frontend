//@flow
import { connect } from "react-redux";

import { fetchTrendsByDate } from "../actions";

import TrendsAmountChart from "../TrendsAmountChart";

const mapStateToProps = ({ dashboard: { trendsByDate } }) => ({ trendsByDate });

const mapDispatchToProps = { fetchTrendsByDate };

export default connect(mapStateToProps, mapDispatchToProps)(TrendsAmountChart);
