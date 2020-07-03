import React from "react";
import { Table, Button } from "react-bootstrap";

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      employees: [],
    };
  }

  componentDidMount() {
    const apiUrl = "http://localhost:8080/employees";

    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            employees: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  render() {
    const { error, employees } = this.state;
    if (error) {
      return <div>Error:{error.message}</div>;
    } else {
      return (
        <div>
          <h2 style={{ marginRight: "70%" }}>Employee List </h2>
          <br />

          <Table>
            <thead>
              <tr>
                <th>firstName</th>
                <th>lastName</th>
                <th>emailId</th>
                <th>gender</th>
                <th>address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.emailId}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.address}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => this.props.editEmployee(employee)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => this.props.deleteEmployee(employee.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

export default EmployeeList;
