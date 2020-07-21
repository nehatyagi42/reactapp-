import React from "react";
import store from "store";
import "./login.css";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class LoginForm extends React.Component {
  constructor(props) {  
    super(props);
    this.state = {
      email: null,
      password: null,
      error: false,
      //errormsg: "",
      errors: {
        email: "",
        password: "",
        backend: "",
      },
    };
    store.clear();

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
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

    this.setState({ errors, [name]: value });
  }

  handleLogin(event) {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }

    let errors = this.state.errors;

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
        if (error.message === "404") errors.backend = "User not Found!!!";
        else if (error.message === "400")
          errors.backend = "Email Password is Incorrect!! ";
        else errors.backend = "Internal Error";
      });
    this.setState(this.initialState);
  }

  render() {
    const { error, errors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <div>
            <h2>Login</h2>
            {error && <span className="error">{errors.backend}</span>}
          </div>
          <form onSubmit={this.handleLogin} noValidate>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                noValidate
              />
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                noValidate
              />
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="submit">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
