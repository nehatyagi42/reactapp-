import React, { Component } from 'react'
import './CSS/todo.css'
import axios from 'axios'




class Form extends Component {

   
    constructor(props) {
        super(props)
        
        this.state = {
            firstName: "",
            lastName: "",
            emailId: "",
            gender: "",
            address:"",

        }

       
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    firsthandler = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }
    lasthandler = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    emailIdhandler = (event) => {
        this.setState({
            emailId: event.target.value
        })
    }

    genderhandler = (event) => {
        this.setState({
            gender: event.target.value
        })
    }
    
    
      addresshandler = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    handleSubmit = (event) => {
    

        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
        })
        // open the request with the verb and the url
        xhr.open('Post', 'http://localhost:8080/employee')
        xhr.setRequestHeader('Content-Type', 'application/json')
        
   
        // send the request
        xhr.send(JSON.stringify(this.state))

        this.setState({
            firstName: "",
            lastName: "",
            emailId:"",
            gender: "",
            address: "",
        })
     event.preventDefault()  
    }
    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <h1>Employee Registration</h1>
                    <label>FirstName :</label> <input type="text" value={this.state.firstName} onChange={this.firsthandler} placeholder="FirstName..." /><br />
                    <label>LastName :</label> <input type="text" value={this.state.lastName} onChange={this.lasthandler} placeholder="LastName..." /><br />
                    <label>E    mailId :</label> <input type="text" value={this.state.emailId} onChange={this.emailIdhandler} placeholder="emailId" /><br />
                    <label>Gender: </label><select onChange={this.genderhandler } defaultValue="Select Gender">
                        <option defaultValue>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select><br />
                     <label>Address :</label> <input type="text" value={this.state.address} onChange={this.addresshandler} placeholder="Address..." /><br />
                    
                    <input type="submit" value="Submit" />
                </form>

            </div>
            
        )
        
    }
    
}

export default Form
