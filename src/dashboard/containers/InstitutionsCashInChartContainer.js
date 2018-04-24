//@flow

import { connect } from "react-redux";

import { fetchTrendsByInstitution } from "../actions";

import InstitutionsCashInChart from "../InstitutionsCashInChart";

const mapStateToProps = ({ dashboard: { trendsByInstitution } }) => ({ trendsByInstitution });

const mapDispatchToProps = { fetchTrendsByInstitution };

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionsCashInChart);
