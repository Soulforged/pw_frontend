//@flow
import configureStore from "redux-mock-store";
import middlewares from "src/reduxconf/middlewaresConfig";

const mockStore = configureStore(middlewares());

export default mockStore;
