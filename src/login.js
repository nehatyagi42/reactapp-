import React, { Component } from 'react'
import './CSS/todo.css'


class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: "",
          
            password: "",
           


        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    firsthandler = (event) => {
        this.setState({
            userName: event.target.value
        })
    }
  
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

   
    handleSubmit = (event) => {
        alert(`${this.state.userName} ${this.state.password}  Login Successfully !!!!`)
        console.log(this.state);
        this.setState({
            userName: "",
           
            password: '',
           
        })
     event.preventDefault()
        
    }




    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <h1>User Login</h1>
                    <label>Username :</label> <input type="text" value={this.state.firstName} onChange={this.firsthandler} placeholder="FirstName..." /><br />
                   
                    <label>Password :</label> <input type="password" value={this.state.password} onChange={this.passwordhandler} placeholder="Password..." /><br />
                   
                    <input type="submit" value="Submit" />
                </form>

            </div>
            
        )
    }
}

export default Login