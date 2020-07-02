import React from'react';
import { Row, Form, Col, Button } from 'react-bootstrap';


class AddEmployee extends React.Component{
    constructor(props) {
        super(props);
        this.initialState = {
                firstName: "",
                lastName: "",
                gender: "",
                address:"",
                emailId:""
            }
            this.state = this.initialState;

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
                return(
                  <div>
                    <h2>Add Employee</h2>
                    <Row>
                      <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="fName">
                            <Form.Label >First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={this.state.firstName}
                              onChange={this.handleChange}
                              placeholder="First Name"/>
                          </Form.Group>
                          <Form.Group controlId="lName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={this.state.lastName}
                              onChange={this.handleChange}
                              placeholder="Last Name" />
                          </Form.Group>
                          <Form.Group controlId="email_id">
                            <Form.Label>EmailId</Form.Label>
                            <Form.Control
                              type="text"
                              name="emailId"
                              value={this.state.emailId}
                              onChange={this.handleChange}
                              placeholder="emailId" />
                          </Form.Group>


                        

                          <Form.Group controlId="geNder">
                          <Form.Label  >Gender</Form.Label>
                           <Form.Control as="select"  name="gender" 
                           value={this.state.gender} 
                            onChange={this.handleChange}
                            placeholder="gender">
                           <option selected value="gender">Select Gender</option>
                           <option>male</option>
                           <option>female</option>
                        
                               </Form.Control>
                          </Form.Group>
                                
                          
                          <Form.Group controlId="add_ress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              value={this.state.address}
                              onChange={this.handleChange}
                              placeholder="address" />
                          </Form.Group>
                          <Form.Group>
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