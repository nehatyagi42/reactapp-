import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Employee from "../employee/Employee";
import LoginForm from "../login/LoginForm";
import Protected from "../protected/Protected";

class AppRoute extends Component {
  render() {
    return (
      <Router>
        {<Route exact path="/" component={LoginForm} />}
        {<Protected exact path="/employee" component={Employee} />}
      </Router>
    );
  }
}

export default AppRoute;
