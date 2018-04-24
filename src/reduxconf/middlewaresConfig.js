//@flow
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import apiFactory from "./middlewares/apiFactory";

export default ({ logActions, history }: Object = {}) => {
  //FIXME this should also be an api call
  const apiAdapter = apiFactory({ root: "http://localhost:5001" });
  const mdws = [thunkMiddleware, apiAdapter, routerMiddleware(history)];
  if (!logActions) {
    const { logger } = require("redux-logger"); // eslint-disable-line global-require

    return [...mdws, logger];
  }
  return mdws;
};
