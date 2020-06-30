import React, { Component } from 'react';
import './App.css';
import { Container,Button,Alert } from 'react-bootstrap';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee'
import './todo.css';
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

  render() {
    return (
      <div className="App">
        <Container>
          <h1 style={{textAlign:'center'}}>Employee Registeration</h1>
          {!this.state.isAddEmployee && <Button variant="primary"   onClick={() => this.onCreate()} style={{marginRight:"70%"}}>Add Employee</Button>}
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddEmployee && <EmployeeList />}
          {this.state.isAddEmployee && <AddEmployee onFormSubmit={this.onFormSubmit}/>}
          {this.state.error && <div>Error: {this.state.error.message}</div>}
          <br/>
          <br/>
          
        </Container>
      </div>
    );
  }
}

export default App;