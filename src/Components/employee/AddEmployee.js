import React from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
    
class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      firstName: "",

      lastName: "",
      gender: "",
      address: "",
      email: "",
      password: "",
    };

    if (props.employee) {
      this.state = props.employee;
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {
    let pageTitle;
    if (this.state.id) {
      pageTitle = <h2 style={{ marginRight: "45%", marginTop: "3%" }}>Edit Employee</h2>;
    } else {
      pageTitle = <h2 style={{marginRight:"45%", marginTop:"3%"}}>Add Employee</h2>;
    }
    return (
      <div>
        {pageTitle}

        <Row>
          <Col sm={6}>
            <br/>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  placeholder="First Name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  placeholder="Last Name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleChange}
                  placeholder="gender"
                >
                  <option defaultValue="gender">Select Gender</option>
                  <option>male</option>
                  <option>female</option>
                  required
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                  placeholder="address"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state.id} />
                <Button variant="success" type="submit">
                  Save
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddEmployee;
