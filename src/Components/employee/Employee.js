import React, { Component } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import Header from "../header/Header";
import { Link } from "react-router-dom";


class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddEmployee: false,
      error: null,
      employee: { id: "" },
      response: {},
      isEditEmployee: false,
    };
  }

  onCreate() {
    this.setState({ isAddEmployee: true });
  }

  editEmployee = (employee) => {
    this.setState({
      employee: employee,
      isEditEmployee: true,
      isAddEmployee: true,
    });
  };

  deleteEmployee = (employeeId) => {
    const apiUrl = "http://localhost:8080/employee/" + employeeId;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            isAddEmployee: false,
            isEditEmployee: false,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
    window.location.reload();
  };

  render() {
    let employeeForm;
    if (this.state.isAddEmployee || this.state.isEditEmployee) {
      employeeForm = <AddEmployee emp={this.state.employee} />;
    }

    return (
      <div className="Employee">
        <Header />


        <Container>
<div className="col-sm-2">
          {!this.state.isAddEmployee && (
            <Button
             
              variant="secondary"
              onClick={() => this.onCreate()}
              style={{ marginRight: "5%", marginTop: "3%"}}
            >
              Add Employee
            </Button>
          )}

          </div>


          {this.state.response.status === "primary" && (
            <div>
              <br />
              <Alert variant="info">{this.state.response.message}</Alert>
            </div>
          )}
          {!this.state.isAddEmployee && (
            <EmployeeList
              editEmployee={this.editEmployee}
              deleteEmployee={this.deleteEmployee}
            />
          )}
          {employeeForm}
          {this.state.error && <div>Error: {this.state.error.message}</div>}
          <br />
          <br />
        </Container>
      </div>
    );
  }
}

export default Employee;
