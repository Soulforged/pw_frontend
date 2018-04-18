//@flow
import { merge } from "lodash";

import { Action } from "src/types";

type State = {
  users: Object
};

type EntityResponse = {
  entities?: Object
};

type EntityAction = {
  ...Action,
  response?: EntityResponse
};

const initialState: State = {
  users: {}
};

const entitiesRegex = /^@@entities\/([\w_]+)_.*$/;
const failureRegex = /^@@entities\/([\w_]+)_(FAILURE|ERROR)$/;
const requestRegex = /^@@entities\/([\w_]+)_REQUEST$/;

const getIds = ({ entities, result }, key) => (
  entities.results ? entities.results[key].results : result
);

export default (state: State = initialState, action: EntityAction) => {
  if (entitiesRegex.test(action.type)) {
    const entityName = action.key;
    if (requestRegex.test(action.type)){
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          fetching: true
        }
      };
    }
    if (failureRegex.test(action.type)){
      return {
        ...state,
        [entityName]: {
          ...state[entityName],
          fetching: false,
          error: action.error
        }
      };
    }
    if (action.response && action.response.entities) {
      const byId = action.response.entities[entityName];
      const ids = getIds(action.response, entityName);
      const ids1 = typeof ids === "string" ? [ids] : ids;
      const newState = { [entityName]: { byId, ids, fetching: false } };
      const merged = merge({}, state, newState);
      const merged1 = {
        ...merged,
        [entityName]: {
          ...merged[entityName],
          lastResultIds: ids1,
          error: false
        }
      };
      return merged1;
    }
  }

  return state;
};
