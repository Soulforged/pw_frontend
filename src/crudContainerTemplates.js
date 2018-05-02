//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";

const List = (resource, entityName, fetchAction, Component) => {
  const openForm = () => push(`/new/${resource}`);
  const showDetails = id => push(`/${resource}/${id}`);
  const mapStateToProps = ({ entities }) => ({ [entityName]: entities[entityName] });
  const mapDispatchToProps = { fetchAction, openForm, showDetails };
  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

const Detail = (resource, entityName, fetchAction) => {
  const mapStateToProps = ({ routing: { location: { pathname } }, entities }) => {
    const match = matchPath(pathname, { path: `/${resource}/:id`, exact: true, strict: true });
    const params = match ? match.params : null;
    const id = params ? params.id : null;
    const item = id ? entities[entityName].byId && entities[entityName].byId[id] : {};
    return {
      id,
      item,
      fetching: businessUnits.fetching
    };
  };
  const openForm = id => push(`/edit/${resource}/${id}`);
  const mapDispatchToProps = { openForm, fetchAction };
  return connect(mapStateToProps, mapDispatchToProps)(BusinessUnitDetail);
};

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
