//@flow
import { normalize } from "normalizr";
import { camelizeKeys } from "humps";
import { CALL_API } from "src/constants";

import type { MiddlewareAPI, Dispatch } from "src/types";

type Config = {
  root: string
};

const checkStatus = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(response.message || "Unexpected error"));
  }
  return response.json();
};

const callApi = (endpoint, schema, body) => {
  const options = {
    credentials: "include",
    body: JSON.stringify(body),
    method: body ? "POST" : "GET",
    cache: "no-cache",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    }
  };
  return fetch(endpoint, options)
    .then(checkStatus)
    .then((json) => {
      const camelizedJson = camelizeKeys(json);

      if (schema) {
        return normalize(camelizedJson, schema);
      }
      return camelizedJson;
    });
};

export default (config: Config) => (
  (store: MiddlewareAPI<*, *>) => (next: Dispatch<*>) => (action: Object) => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === "undefined") {
      return next(action);
    }

    let { endpoint } = callAPI; // eslint-disable-line immutable/no-let
    const { schema, types, body } = callAPI;

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
      const finalAction = { ...action, ...data };
      delete finalAction[CALL_API];
      return finalAction;
    };

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    return (callApi(config.root + endpoint, schema, body).then(
      (response: Object) => next(actionWith({ response, type: successType })),
      (error: Object) => next(actionWith({
        type: failureType,
        error: error || new Error("Unexpected error")
      }))
    ): Object);
  }
);
