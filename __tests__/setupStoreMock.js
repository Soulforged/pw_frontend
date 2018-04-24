//@flow
import configureStore from "redux-mock-store";
import middlewares from "src/reduxconf/middlewaresConfig";
import createHistory from "history/createBrowserHistory";

const history = createHistory();
const mockStore = configureStore(middlewares({ history }));

export default mockStore;
