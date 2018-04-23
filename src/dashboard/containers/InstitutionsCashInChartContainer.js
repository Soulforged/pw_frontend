//@flow

import { connect } from "react-redux";
import type { DispatchAPI } from "src/types";

import { fetchTrendsByInstitution } from "../actions";

import InstitutionsCashInChart from "../InstitutionsCashInChart";

const mapStateToProps = ({ dashboard: { trendsByInstitution } }) => ({ trendsByInstitution });

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
  fetchTrendsByInstitution: params => dispatch(fetchTrendsByInstitution(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionsCashInChart);
