//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchBusinessUnits } from "../actions";
import BusinessUnitsList from "../BusinessUnitList";

const mapStateToProps = ({ entities: { businessUnits } }) => ({ businessUnits });

const showDetails = id => push(`/business_units/${id}`);

const mapDispatchToProps = { fetchBusinessUnits, showDetails };

export default connect(mapStateToProps, mapDispatchToProps)(BusinessUnitsList);
