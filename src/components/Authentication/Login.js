import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router';
import { store } from '../../store';
import XHR from '../../helpers/XHRClient.js';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { login: '', password: '' };
  }

  loginSuccess(user, token) {
    store.dispatch({
      type: 'FETCH_USER',
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token
    });
    self.sessionStorage.setItem('token', token);
    for (let key in user) {
      if(key && user[key]) {
        self.sessionStorage.setItem(key, user[key]);
      }
    }

    this.props.onChange(true);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  loginError(token) {
    store.dispatch({ type: 'DROP_USER' });
    // console.error('[', token.code, token.error, ']', 'there was a loggin error', 'Actually not handled', '#TODO');
  }

  async submitHandler() {
    let token = await XHR.post('http://localhost:3080/auth/token', {
      body: {
        login: this.state.login,
        password: this.state.password
      }
    });

    if (token.error) {
      this.loginError(token);
      return;
    }

    const hashedToken = token.response.split('.');
    const user = JSON.parse(atob(hashedToken[1]));

    this.loginSuccess(user, token.response);
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
            <Form size='large' onSubmit={() => {
              this.submitHandler();
            }}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  name='login'
                  iconPosition='left'
                  required={true}
                  placeholder='E-mail address'
                  value={this.state.login}
                  onChange={(e, p) => {
                    this.handleChange(e, p);
                  }}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  name='password'
                  iconPosition='left'
                  required={true}
                  placeholder='Password'
                  type='password'
                  value={this.state.password}
                  onChange={(e, p) => {
                    this.handleChange(e, p);
                  }}
                />

                <Button color='teal' fluid size='large'>Login</Button>
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

Login.propTypes = {
  onChange: PropTypes.func
};

export default Login;
