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
        <div className="col-lg-12">
          <h2>Employee List </h2>
          <br />

          <Table>
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.address}</td>
                  <td>
                    <div className="col-sm-4" style={{ marginRight: "20%" }}>
                      <Button
                        variant="info"
                        onClick={() => this.props.editEmployee(employee)}
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                  <td>
                    <div className="col-sm-4" style={{ marginRight: "20%" }}>
                      <Button
                        style={{ margin: "0" }}
                        variant="danger"
                        onClick={() => this.props.deleteEmployee(employee.id)}
                      >
                        Delete
                      </Button>
                    </div>
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
