import React from "react";
import { Row, Form, Col, Button } from "react-bootstrap";

class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      firstName: null,
      email: null,
      password: null,
      gender: null,
      lastName: null,
      address: null,
      errors: {
        firstName: "",
        email: "",
        password: "",
        address: "",
        gender: "",
        lastName: "",
      },
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
    let errors = this.state.erro;

    switch (name) {
      case "firstName":
        errors.firstName =
          value.length < 5
            ? "Full Name must be at least 5 characters long!"
            : "";
        break;
      case "lastName":
        errors.lastName =
          value.length < 5
            ? "Full Name must be at least 5 characters long!"
            : "";
        break;
      case "address":
        errors.address =
          value.length < 5
            ? "Full Name must be at least 5 characters long!"
            : "";
        break;
      case "gender":
        errors.gender =
          value.length < 5
            ? "Full Name must be at least 5 characters long!"
            : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8
            ? "Password must be at least 8 characters long!"
            : "";
        break;
      default:
        break;
    }

    this.setState({
      errors,
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  }

  render() {
    const { errors } = this.state;
    let pageTitle;
    if (this.state.id) {
      pageTitle = (
        <h2 style={{ marginRight: "45%", marginTop: "3%" }}>Edit Employee</h2>
      );
    } else {
      pageTitle = (
        <h2 style={{ marginRight: "45%", marginTop: "3%" }}>Add Employee</h2>
      );
    }
    return (
      <div>
        {pageTitle}

        <Row>
          <Col sm={6}>
            <br />
            <Form onSubmit={this.handleSubmit} noValidate>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  placeholder="First Name"
                  required
                  noValidate
                />
                {errors.firstName}
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
                  noValidate
                />
                {errors.lastName}
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
                  noValidate
                />
                {errors.email}
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
                  noValidate
                />
                {errors.password}
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
                  required
                  noValidate
                >
                  <option defaultValue="gender">Select Gender</option>
                  <option>male</option>
                  <option>female</option>
                  {errors.gender}
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
                  novalidate
                />
                {errors.address}
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

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
