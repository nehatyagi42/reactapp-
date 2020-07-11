import React from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import store from "store";
import { Message } from "semantic-ui-react";
import Header from "../header/Header";

class LoginForm extends React.Component {
  constructor(props) {
    store.clear();
    super(props);
    this.initialState = {
      email: "",
      password: "",
      error: false,
      errormsg: "",
    };

    if (props.employee) {
      this.state = props.employee;
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handlelogin = this.handlelogin.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  handlelogin(event) {
    event.preventDefault();

    const { history } = this.props;

    const apiUrl = "http://localhost:8080/login";
    const options = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else {
          console.log("you're logged in. yay!");
          store.set("login", true);
          this.setState({ error: false });
          history.push("/employee");
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error: " + error);
        this.setState({ error: true });
        if (error.message === "404")
          this.setState({ errormsg: "user not found" });
        else if (error.message === "400")
          this.setState({ errormsg: "Email Password is Incorrect " });
        else this.setState({ errormsg: "Internal Error" });
      });
    this.setState(this.initialState);
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        <Header />
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handlelogin}>
              <h3 style={{ marginTop: "5%" }}>Login</h3>
              {error && (
                <Message
                  style={{ color: "red" }}
                  error={error}
                  content={this.state.errormsg}
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
