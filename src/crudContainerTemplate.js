//@flow
import { connect } from "react-redux";
import { push } from "react-router-redux";

export const mainTemplate = (resource, entityName, dispatches) => {
  const openForm = () => push(`/new/${resource}`);
  const showDetails = id => push(`/${resource}/${id}`);
  const mapStateToProps = ({ entities }) => ({ [entityName]: entities[entityName] });
  const mapDispatchToProps = dispatch => { openForm, showDetails, ...dispatches(dispatch) };
  return connect(mapStateToProps, mapDispatchToProps);
};

export const detailTemplate = (resource, states, dispatches) => {
  const mapStateToProps = ({ routing: { location: { pathname } }, entities }) => {
    const match = matchPath(pathname, { path: `/${resource}/:id`, exact: true, strict: true });
    const params = match ? match.params : null;
    const id = params ? params.id : null;
    const entity = entities[entityName];
    const item = id ? entity.byId && entity.byId[id] : {};
    return {
      id,
      item,
      fetching: entity.fetching
    };
  };
  const openForm = id => push(`/edit/${resource}/${id}`);
  const mapDispatchToProps = { openForm, ...dispatches };
  return connect(mapStateToProps, mapDispatchToProps);
};

export const formTemplate = (resource, mapState, dispatches) => {
  const mapStateToProps = ({ routing: { location: { pathname } }, entities }) => {
    const entity = entities[entityName];
    const match = matchPath(pathname, { path: `/(edit|new)/${resource}/:id?` });
    const params = match ? match.params : null;
    const id = params ? params.id : null;
    const item = id ? entity.byId && entity.byId[id] : {};
    return {
      id,
      item,
      fetching: entity.fetching,
      saving: entity.saving
    };
  };
  const closeForm = () => push(`/${resource}`);
  const mapDispatchToProps = { closeForm, ...dispatches };
  return connect(mapStateToProps, mapDispatchToProps);
};
