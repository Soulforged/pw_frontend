//@flow

import React from "react";
import { Provider, connect } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import "src/App.css";
import { ErrorBoundary } from "src/error";
import { Login } from "src/session";
import { Home } from "src/home";
import { Loading } from "src/components";
import { Route } from "react-router";
import SecureRoute from "src/SecureRoute";
import createStore from "src/reduxconf";
import createHistory from "history/createBrowserHistory";

import type { Store, RouterHistory } from "src/types";

type Props = {
  store?: Store<*, *>,
  history?: RouterHistory
};

const ThemeLinkC = ({ dark }: { dark: boolean }) => (
  dark ? <link rel="stylesheet" type="text/css" href="/App.dark.css" /> : false
);

const ThemeLink = connect(({ ui: { dark } }) => ({ dark }))(ThemeLinkC);

const App = ({ store, history }: Props) => (
  <Provider store={store}>
    <div>
      <ThemeLink />
      <ErrorBoundary>
        <ConnectedRouter history={history}>
          <div>
            <SecureRoute path="/" component={Home} />
            <Route exact path="/login" component={Login} />
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
  store: createStore({ defaultHistory, logActions: true })
};

export default App;
