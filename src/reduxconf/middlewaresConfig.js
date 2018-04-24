//@flow
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import apiFactory from "./middlewares/apiFactory";

export default ({ logActions, history }: Object = {}) => {
  //FIXME this should also be an api call
  const apiAdapter = apiFactory({ root: "http://localhost:5001" });
<<<<<<< HEAD
  const mdws = [thunkMiddleware, apiAdapter, routerMiddleware(history)];
=======
  const mdws = [routerMiddleware(history), thunkMiddleware, apiAdapter];
>>>>>>> da74c5ac5af2038842ae97c0f627270aeb062e73
  if (logActions) {
    const { logger } = require("redux-logger"); // eslint-disable-line global-require

    return [...mdws, logger];
  }
  return mdws;
};
