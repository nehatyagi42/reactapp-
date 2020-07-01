import React, { Component } from 'react';
import './App.css';
import { Container,Button,Alert } from 'react-bootstrap';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAddEmployee: false,
      error: null,
      response: {},
      employee:{},
      isEditEmployee:false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddEmployee: true });
  }

  onFormSubmit(data) {
    
    let apiUrl;
    if(this.state.isEditEmployee){
      apiUrl = 'http://localhost:8080/updateemployee';
    } else {
      apiUrl = 'http://localhost:8080/employee';
    }


    /* const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
     
    };
  */

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
    }; 
 
    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddEmployee: false,
          isEditEmployee:false

        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  }
  editEmployee = employeeId => {

    const apiUrl = 'http://localhost:8080/employee';
    const formData = new FormData();
    formData.append('employeeId', employeeId);

    const options = {
      method: 'POST',
      body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            employee: result,
            isEditEmployee: true,
            isAddEmployee : true
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }
  render() {

    let employeeForm;
    if(this.state.isAddEmployee || this.state.isEditEmployee) {
      employeeForm = <AddEmployee onFormSubmit={this.onFormSubmit} employee={this.state.employee} />
    }
    return (
      <div className="App">
        <Container>
          <h1 style={{textAlign:'center'}}>Employee Registeration</h1>
          {!this.state.isAddEmployee && <Button variant="primary" onClick={() => this.onCreate()} style={{marginRight:"70%"}}>Add Employee</Button>}
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddEmployee && <EmployeeList editEmployee={this.editEmployee}/>}
          { employeeForm }
         
          {this.state.error && <div>Error: {this.state.error.message}</div>}
          <br/>
          <br/>
          
        </Container>
      </div>
    );
  }
}

export default App;