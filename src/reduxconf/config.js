//@flow
import { combineReducers, createStore, applyMiddleware } from "redux";
import { routerReducer } from "react-router-redux";
import reducers from "src/reducers";
import dashboard from "src/dashboard/reducers";
import middlewares from "./middlewaresConfig";

export default (config: Object = {}) => {
  const rootReducer = combineReducers({
    routing: routerReducer,
    dashboard,
    ...reducers
  });
  const mdws = middlewares(config);

  return createStore(rootReducer, applyMiddleware(...mdws));
};
