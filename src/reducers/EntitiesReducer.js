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

export default (state: State = initialState, action: EntityAction) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};
