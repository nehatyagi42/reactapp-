import React, { Component } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddEmployee: false,
      error: null,
      employee: {},
      response: {},
      isEditEmployee: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddEmployee: true });
  }

  onFormSubmit(data) {
    const apiUrl = "http://localhost:8080/employee";
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (this.state.isEditEmployee) {
      options.method = "PUT";
    }
    if (this.state.isdeleteEmployee) {
      options.method = "DELETE";
    }
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
      employeeForm = (
        <AddEmployee
          onFormSubmit={this.onFormSubmit}
          employee={this.state.employee}
        />
      );
    }

    return (
      <div className="Employee">
        <Container>
          {!this.state.isAddEmployee && (
            <Button
              className="col-sm-2"
              variant="secondary"
              onClick={() => this.onCreate()}
              style={{ marginRight: "90%", marginTop: "2%" }}
            >
              Add Employee
            </Button>
          )}
          {this.state.response.status === "success" && (
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
