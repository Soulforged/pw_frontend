//@flow
import { connect } from "react-redux";
import { matchPath } from "react-router";
import { push } from "react-router-redux";
import { getBusinessUnit, saveBusinessUnit } from "../actions";
import BusinessUnitForm from "../BusinessUnitForm";

const mapStateToProps = ({ routing: { location: { pathname } }, entities: { businessUnits } }) => {
  const match = matchPath(pathname, { path: "/(edit|new)/business_units/:id?" });
  const params = match ? match.params : null;
  const id = params ? params.id : null;
  const item = id ? businessUnits.byId && businessUnits.byId[id] : {};
  return {
    id,
    item,
    fetching: businessUnits.fetching,
    saving: businessUnits.saving
  };
};

const closeForm = () => push(`/business_units`);

const mapDispatchToProps = { getBusinessUnit, saveBusinessUnit, closeForm };

export default connect(mapStateToProps, mapDispatchToProps)(BusinessUnitForm);
