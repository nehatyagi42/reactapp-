import React from'react';
import { Row, Form, Col, Button } from 'react-bootstrap';


class AddEmployee extends React.Component{
    constructor(props) {
        super(props);
        this.initialState = {
                id:"",
                firstName: "",
                lastName: "",
                gender: "",
                address:"",
                emailId:""
            }
            
    if(props.employee){
      this.state = props.employee
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
                [name]: value
              })
            }

            handleSubmit(event) {
                event.preventDefault();
                this.props.onFormSubmit(this.state);
                this.setState(this.initialState);
              }


              render() {

                let pageTitle;
                if(this.state.id) {
                  pageTitle = <h2>Edit Employee</h2>
                } else {
                  pageTitle = <h2>Add Employee</h2>
                }



                return(
                  <div>
                      {pageTitle}
                    
                    <Row>
                      <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="firstName">
                            <Form.Label >First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={this.state.firstName}
                              onChange={this.handleChange}
                              placeholder="First Name"/>
                          </Form.Group>
                          <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={this.state.lastName}
                              onChange={this.handleChange}
                              placeholder="Last Name" />
                          </Form.Group>
                          <Form.Group controlId="emailId">
                            <Form.Label>EmailId</Form.Label>
                            <Form.Control
                              type="text"
                              name="emailId"
                              value={this.state.emailId}
                              onChange={this.handleChange}
                              placeholder="emailId" />
                          </Form.Group>

                          <Form.Group controlId="gender">
                            <Form.Label >Gender</Form.Label>
                            <Form.Control as="select" type="text" name="gender" 
                           
                            value={this.state.gender} 
                            onChange={this.handleChange}
                            placeholder="gender">
                                <option defaultValue ="gender">Select Gender</option>
                                <option>male</option>
                                <option>female</option>
                                
                            </Form.Control>
                          </Form.Group>

                          <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              value={this.state.address}
                              onChange={this.handleChange}
                              placeholder="address" />
                          </Form.Group>
                          <Form.Group>
                          <Form.Control type="hidden" name="id" value={this.state.id} />
                            <Button variant="success" type="submit">Save</Button>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </div>
                )
              }
            }
            
export default AddEmployee;    