<<<<<<< HEAD
import React, { Component } from 'react';
import './App.css';
import { Container,Button,Alert } from 'react-bootstrap';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAddEmployee: false,
      error: null,
      response: {}
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddEmployee: true });
  }

  onFormSubmit(data) {
    const postapiUrl = 'http://localhost:8080/employee';
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
    };

    fetch(postapiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddEmployee: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  }
=======
import React, { Component } from "react";
import "./App.css";
import AppRoute from "./Components/Route/Route";
import "./Components/todo.css";
>>>>>>> feature/reactapp

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppRoute />
      </div>
    );
  }
}

export default App;
