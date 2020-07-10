import React from "react";
import { Navbar } from "react-bootstrap";
import store from "store";


class Header extends React.Component {

  logoutHandler = (e) => {
    store.set("loggedin", true);
    store.get("loggedin",false)
    console.log("logged out");
  
  };
  render() {
   
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="">Employee Registeration</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
         
              <a href="/" onClick={(e) => this.logoutHandler(e)}>
                Logout
              </a>
            
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
