import React from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import store from "store";
import { Message } from "semantic-ui-react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      email: "",
      password: "",
      error: false,
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

    const { email, password } = this.state;
    const { history } = this.props;

    this.setState({ error: false });

    if (!(email === "neha@gmail.com" && password === "neha")) {
      return this.setState({ error: true });
    }

    console.log("you're logged in. yay!");
    store.set("loggedIn", true);
    history.push("/employee");
    const apiUrl = "http://localhost:8080/login";
    const options = {
      method: "POST",

      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, options)
      .then((response) => response.json())
      .then(
        (response) => {
          if (response.status === 200) {
            return response.json();
          }
        },

        (error) => {
          this.setState({ error });
        }
      );
    this.setState(this.initialState);
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <h3 style={{ marginTop: "5%" }}>Login</h3>
              {error && (
                <Message
                  style={{ color: "red" }}
                  error={error}
                  content="That username/password is incorrect. Try again!"
                />
              )}
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
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Form.Group>
                {/*    <Form.Control type="hidden" name="id" value={this.state.id} /> */}
                <Button
                  variant="success"
                  className="btn btn-success"
                  type="submit"
                >
                  Login
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginForm;
