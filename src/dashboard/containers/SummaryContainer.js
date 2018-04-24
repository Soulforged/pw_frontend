//@flow
import { connect } from "react-redux";

import { fetchSummary } from "../actions";

import Summary from "../Summary";

const mapStateToProps = ({ dashboard: { summary } }) => ({ summary });

const mapDispatchToProps = { fetchSummary };

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
