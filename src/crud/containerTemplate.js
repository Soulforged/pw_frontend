//@flow
import { connect } from "react-redux";
import { matchPath } from "react-router";
import { push } from "react-router-redux";

export const mainTemplate = (resource, entityName, mapState, dispatches) => {
  const mapStateToProps = ({ entities }) => ({
    entities: entities[entityName],
    ...mapState(entities)
  });
  const mapDispatchToProps = dispatch => ({
    openForm: () => dispatch(push(`/new/${resource}`)),
    showDetails: id => dispatch(push(`/${resource}/${id}`)),
    ...dispatches(dispatch)
  }
  );
  return connect(mapStateToProps, mapDispatchToProps);
};

export const detailTemplate = (resource, entityName, dispatches) => {
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

export const formTemplate = (resource, entityName, mapState, dispatches) => {
  const mapStateToProps = ({ routing: { location: { pathname } }, entities }) => {
    const entity = entities[entityName];
    const match = matchPath(pathname, { path: `/(edit|new)/${resource}/:id?` });
    const params = match ? match.params : null;
    const id = params ? params.id : null;
    const item = id ? entity.byId && entity.byId[id] : {};
    const otherState = mapState(entities);
    return {
      id,
      item,
      fetching: entity.fetching,
      saving: entity.saving,
      ...otherState
    };
  };
  const mapDispatchToProps = dispatch => ({
    close: () => dispatch(push(`/${resource}`)),
    ...dispatches(dispatch)
  });
  return connect(mapStateToProps, mapDispatchToProps);
};
