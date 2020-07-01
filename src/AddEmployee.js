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

            if (props.employee) {
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
                 if (this.state.id) {
                   pageTitle=<h2>Edit Employee</h2>
                 } else {
                  pageTitle = <h2>Add Employee</h2>
                 }




                return(
                  <div>
                    {pageTitle}
                    <h2 style={{marginRight:"60%", marginTop:"5%"}}>Add Employee</h2>
                    <br/>
                    <Row>
                      <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="fName" >
                            <Form.Label style={{marginRight:"75%"}}>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={this.state.firstName}
                              onChange={this.handleChange}
                              placeholder="First Name"/>
                          </Form.Group>
                          <Form.Group controlId="lName">
                            <Form.Label style={{marginRight:"75%"}}>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={this.state.lastName}
                              onChange={this.handleChange}
                              placeholder="Last Name" />
                          </Form.Group>
                          <Form.Group controlId="email_id">
                            <Form.Label style={{marginRight:"79%"}}>EmailId</Form.Label>
                            <Form.Control
                              type="text"
                              name="emailId"
                              value={this.state.emailId}
                              onChange={this.handleChange}
                              placeholder="emailId" />
                          </Form.Group>


                         {/*  <Form.Group controlId="geNder">
                            <Form.Label style={{marginRight:"79%"}} >Gender</Form.Label>
                            <Form.Control as="select" type="text" name="gender" 
                            value={this.state.gender} 
                            onChange={this.handleChange}
                            placeholder="gender">
                                <option selected value="gender">Select Gender</option>
                                <option>male</option>
                                <option>female</option>
                                
                            </Form.Control>
                          </Form.Group>
 */}
                          <Form.Group controlId="geNder">
                          <Form.Label style={{marginRight:"79%"}} >Gender</Form.Label>
                           <Form.Control as="select"  name="gender" 
                           value={this.state.gender} 
                            onChange={this.handleChange}
                            placeholder="gender">
                           <option value="DEFAULT">Select Gender</option>
                           <option>male</option>
                           <option>female</option>
                        
                               </Form.Control>
                          </Form.Group>



                          <Form.Group controlId="add_ress">
                            <Form.Label style={{marginRight:"79%"}}>Address</Form.Label>
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