//@flow
import { merge } from "lodash";
import { Action } from "src/types";
import actions from "src/actions";

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

const {
  ENTITIES,
  SAVE,
  FAIL,
  REQ
} = actions;

const initialState: State = {
  users: {}
};

const entitiesRegex = new RegExp(`^${ENTITIES}/([\\w_]+)_.*$`);
const failureRegex = new RegExp(`/[\\w_]+_${FAIL}$`);
const requestRegex = new RegExp(`/[\\w_]+_${REQ}$`);
const saveRegex = new RegExp(`/${SAVE}_[\\w_]+`);

const getIds = ({ entities, result }, key) => (
  entities.results ? entities.results[key].results : result
);

const handleFetch = (action, entityName, state) => {
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
  const byId = action.response.entities[entityName];
  const ids = getIds(action.response, entityName);
  const ids1 = (ids instanceof Array) ? ids : [ids];
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
};

const handleSave = (action, entityName, state) => {
  if (requestRegex.test(action.type)){
    return {
      ...state,
      [entityName]: {
        ...state[entityName],
        saving: true
      }
    };
  }
  if (failureRegex.test(action.type)){
    return {
      ...state,
      [entityName]: {
        ...state[entityName],
        saving: false,
        saveError: action.error
      }
    };
  }
  const { id } = action.response;
  return {
    ...state,
    [entityName]: {
      ...state[entityName],
      savedId: id,
      error: false,
      saving: false
    }
  };
};

export default (state: State = initialState, action: EntityAction) => {
  if (entitiesRegex.test(action.type)) {
    const entityName = action.key;

    if (saveRegex.test(action.type)) {
      return handleSave(action, entityName, state);
    }

    return handleFetch(action, entityName, state);
  }

  return state;
};
