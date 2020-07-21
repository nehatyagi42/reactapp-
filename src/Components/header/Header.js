import React from "react";
import { Navbar } from "react-bootstrap";
import store from "store";

class Header extends React.Component {
  logoutHandler = (e) => {
    store.clear();
    console.log("logged out sucessful");
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="employee">Employee Registeration</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {store.get("login") ? (
            <Navbar.Text>
              <a href="/" onClick={(e) => this.logoutHandler(e)}>
                Logout
              </a>
            </Navbar.Text>
          ) : (
            <Navbar.Text />
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
