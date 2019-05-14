import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import store from "./reference/redux/store.jsx";

// core components
import Admin from "layouts/Admin.jsx";
import Dashboard from "./views/Dashboard/Dashboard";
import PropertyInfo from "./components/PropertyInfo";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={withRouter(Admin)} />
        <Route
          path="/admin/listings/view/:id"
          component={withRouter(PropertyInfo)}
        />
        <Redirect
          from="/"
          to="/admin/landing"
          component={withRouter(Dashboard)}
        />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
