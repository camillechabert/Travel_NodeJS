import React, { Component } from "react";
import { Button, Form, Container, Header, Segment, Label, Image, Grid } from 'semantic-ui-react'


class Register extends Component {
    
    render() {
        return (
            <Grid
            textAlign='center'
            style={{ height: '50%' }}
            verticalAlign='middle'
            >
                <Grid.Column>
                    <Container>
                            <Header as='h2' color='teal' textAlign='center'>
                            <Image src='/media/logo.svg' />
                            Register your account
                            </Header>
                            <Segment stacked>
                            <Form  size='large'>

                                <Form.Group unstackable widths={2}>
                                    <Form.Input 
                                    icon='user' 
                                    iconPosition='left' 
                                    label='First name' 
                                    placeholder='First name' />
                                    <Form.Input 
                                    icon='user' 
                                    iconPosition='left' 
                                    label='Last name' 
                                    placeholder='Last name' />
                                </Form.Group>

                                <Form.Group widths={2}>
                                    <Form.Input 
                                    icon='mail' 
                                    iconPosition='left' 
                                    label='E-mail' 
                                    placeholder='e-mail' 
                                    />
                                    <Form.Input 
                                    icon='unlock alternate' 
                                    iconPosition='left' 
                                    type="password" 
                                    label='Password' 
                                    placeholder='Password' 
                                    />
                                </Form.Group>

                                    <Form.Checkbox 
                                    label='I agree to the Terms and Conditions' 
                                    />
                                    <Form.Input 
                                    className="Token"
                                    style={{ display: 'none' }}
                                    />
                                    <Button 
                                    color='teal' 
                                    fluid size='large'
                                    type='submit'>
                                    Submit
                                    </Button>                   
                            </Form>
                        </Segment>    
                    </Container>
                </Grid.Column>
            </Grid>    
        );
    }
}
    
export default Register;