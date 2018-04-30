//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { fetchBusinessUnits } from "../actions";
import BusinessUnitsList from "../BusinessUnits";

const openForm = () => push(`/new/business_units`);

const mapStateToProps = ({ entities: { businessUnits } }) => ({ businessUnits });

const mapDispatchToProps = { fetchBusinessUnits, openForm };

export default connect(mapStateToProps, mapDispatchToProps)(BusinessUnitsList);
