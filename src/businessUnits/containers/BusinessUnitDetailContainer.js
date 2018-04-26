//@flow
import { connect } from "react-redux";
import { matchPath } from "react-router";
import { push } from "react-router-redux";
import BusinessUnitDetail from "../BusinessUnitDetail";
import { getBusinessUnit } from "../actions";

const mapStateToProps = ({ routing: { location: { pathname } }, entities: { businessUnits } }) => {
  const match = matchPath(pathname, { path: "/business_units/:id", exact: true, strict: true });
  const params = match ? match.params : null;
  const id = params ? params.id : null;
  const item = id ? businessUnits.byId && businessUnits.byId[id] : {};
  return {
    id,
    item,
    fetching: businessUnits.fetching
  };
};

const openForm = id => push(`/edit/business_units/${id}`);

const mapDispatchToProps = { openForm, getBusinessUnit };

export default connect(mapStateToProps, mapDispatchToProps)(BusinessUnitDetail);
