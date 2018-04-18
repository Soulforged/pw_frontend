//@flow
import { normalize } from "normalizr";
import { camelizeKeys } from "humps";
import { CALL_API } from "src/constants";

import type { MiddlewareAPI, Dispatch } from "src/types";

type Config = {
  root: string
};

const sleep = (timeout = 1500) => new Promise(resolve => setTimeout(resolve, timeout));

async function emulate(mock) {
  await sleep();
  return mock;
}

const callApi = (endpoint, optParams) => {
  const {
    schema,
    body,
    mock,
    errorSchema
  } = optParams;
  const options = {
    credentials: "include",
    body: body && JSON.stringify(body),
    method: body ? "POST" : "GET",
    cache: "no-cache",
    headers: {
      accept: "application/json",
      "content-type": body ? "application/json" : "text/plain"
    }
  };
  const jsonError = (json) => {
    if (errorSchema) {
      return errorSchema(json);
    }
    return json;
  };
  const checkStatus = (response) => {
    if (!response.ok) {
      return response.json()
        .then(jsonError)
        .then(Promise.reject)
        .catch((error) => {
          console.log(error);
          return Promise.reject(response);
        });
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
    .then(doNormalize);
};

export default (config: Config) => (
  (store: MiddlewareAPI<*, *>) => (next: Dispatch<*>) => (action: Object) => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === "undefined") {
      return next(action);
    }

    let { endpoint } = callAPI; // eslint-disable-line immutable/no-let
    const {
      types,
      key
    } = callAPI;

    if (typeof endpoint === "function") {
      endpoint = endpoint(store.getState());
    }

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

    return (callApi(config.root + endpoint, callAPI).then(
      (response: Object) => next(actionWith({ response, type: successType })),
      (error: Object) => next(actionWith({
        type: failureType,
        error: error || new Error("Unexpected error")
      }))
    ): Object);
  }
);
