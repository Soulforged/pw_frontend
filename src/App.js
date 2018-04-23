//@flow
import React from "react";
import { Provider, connect } from "react-redux";
import "src/App.css";
import { ErrorBoundary } from "src/error";
import { Login } from "src/session";
import { Home } from "src/home";
import { Loading } from "src/components";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router-dom";
import SecureRoute from "src/SecureRoute";
import createStore from "src/reduxconf";
import createHistory from "history/createBrowserHistory";

import type { Store } from "src/types";

type Props = {
  store?: Store<*, *>,
  history?: Object
};

const ThemeLinkC = ({ dark }: { dark: boolean }) => (
  dark ? <link rel="stylesheet" type="text/css" href="/AppDark.css" /> : false
);

const ThemeLink = connect(({ ui: { dark } }) => ({ dark }))(ThemeLinkC);

const App = ({ store, history }: Props) => (
  <Provider store={store}>
    <div>
      <ThemeLink />
      <ErrorBoundary>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <SecureRoute path="/" component={Home} />
            </Switch>
            <Loading />
          </div>
        </ConnectedRouter>
      </ErrorBoundary>
    </div>
  </Provider>
);

const defaultHistory = createHistory();
App.defaultProps = {
  history: defaultHistory,
  store: createStore({ history: defaultHistory, logActions: process.env.DEBUG_APP })
};

export default App;
