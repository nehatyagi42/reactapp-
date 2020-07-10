import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Employee from "../employee/Employee";
import LoginForm from "../login/LoginForm";
import Header from "../header/Header";

class AppRoute extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          
          <div>
            <Switch>
              {<Route path="/" exact component={LoginForm} />}
              {<Route path="/employee" component={Employee} />}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default AppRoute;
