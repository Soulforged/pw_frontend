//@flow
import { normalize } from "normalizr";
import { camelizeKeys } from "humps";
import { CALL_API } from "src/constants";

import type { DispatchAPI } from "src/types";

type Config = {
  root: string
};

const sleep = (timeout = 500) => new Promise(resolve => setTimeout(resolve, timeout));

async function emulate(mock) {
  await sleep();
  return mock;
}

const callApi = (endpoint, dispatch, optParams) => {
  const {
    schema,
    body,
    mock,
    errorSchema,
    update,
  } = optParams;
  const updateMethod = update ? "PUT" : "POST";
  const options = {
    credentials: "include",
    body: body && JSON.stringify(body),
    method: body ? updateMethod : "GET",
    cache: "no-cache",
    headers: {
      accept: "application/json",
      "content-type": body ? "application/json" : "text/plain"
    }
  };
  const jsonError = (json, { status }) => {
    if (errorSchema) {
      return errorSchema(json, status);
    }
    return json;
  };
  const checkStatus = (response) => {
    if (!response.ok) {
      return response.json()
        .then(error => jsonError(error, response))
        .catch(Promise.reject)
        .then(json => Promise.reject(json));
    }
    return response.json();
  };
  const doNormalize = json => (
    schema ? normalize(camelizeKeys(json), schema) : camelizeKeys(json)
  );
  if (mock){
    return emulate(doNormalize(mock));
  }
  return fetch(endpoint, options)
    .then(checkStatus)
    .then(doNormalize)
    .catch(error => Promise.reject(error));
};

export default (config: Config) => (
  (/*store: MiddlewareAPI<*, *>*/) => (next: DispatchAPI<*>) => (action: Object) => {
    const callAPI = action[CALL_API];
    if (!callAPI) {
      return next(action);
    }

    const { endpoint } = callAPI; // eslint-disable-line immutable/no-let
    const { types, key, after } = callAPI;

    if (typeof endpoint !== "string") {
      throw new Error("'endpoint' should be a URL string.");
    }

    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error("Expected an array of three action types.");
    }

    if (!types.every(type => typeof type === "string")) {
      throw new Error("Expected action types to be strings.");
    }

    const actionWith = (data) => {
      const finalAction = { ...action, ...data, key };
      delete finalAction[CALL_API];
      return finalAction;
    };

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    return (callApi(config.root + endpoint, next, callAPI).then(
      (response: Object) => {
        const n = next(actionWith({ response, type: successType }));
        if (after){
          return after(next, response);
        }
        return n;
      },
      (error: Object) => next(actionWith({
        type: failureType,
        error: error || new Error("Unexpected error")
      }))
    ): Object);
  }
);
