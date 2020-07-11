import React from "react";
import { Route, Redirect } from "react-router-dom";
import store from "store";
const Protected = ({ component: Cmp, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      store.get("login") ? (
        <Cmp {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default Protected;
