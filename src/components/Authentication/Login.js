import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router';
import {store} from '../../store';

class Login extends Component {

    // Dummy Modifications
    testReducer() {
        store.dispatch({
            type: 'FETCH_USER',
            name: 'Jhon',
            last: 'Snow',
            apiToken: 'qsdmlkLMQSlmdqmsldkMLKSQDMmLQSDMLKQDQ45654'
        });
        console.log(store.getState());
    }

    render() {
        return (
            <div className='login-form'>
                <Grid
                textAlign='center'
                style={{ height: '50%' }}
                verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src='/media/logo.svg' />
                            Log-in to your account
                        </Header>
                        <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            />
                            <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            />
                
                            <Button color='teal' fluid size='large' onClick={() => {this.testReducer(); }}>Login</Button>
                        </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to={'/sign-up'}> Sign up </Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Login;
