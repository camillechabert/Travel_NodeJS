import React, { Component } from "react";
import { Button, Form, Container, Header, Segment, Label, Image, Grid } from 'semantic-ui-react'
import XHR from '../../helpers/XHRClient';
import { store } from '../../store';


class Register extends Component {

    constructor(props) {
        super(props);

        this.state = { loading: false, firstName: '', lastName: '', email: '', password: '', agreed: false };
    }

    /**
     * This function is a duplicate of login
     * Use action from redux #TODO
     * @param {* the complete user hash} user 
     * @param {* the JWT token still based64} token 
     */
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
        for (let key in user)
            self.sessionStorage.setItem(key, user[key]);

        this.props.userUpdate(true);
    }

    /**
     * This method contain duplication, refactoring is necessary
     * @param {* the form submited} form 
     */
    async _submit(form) {
        if (!this.state.agreed) {
            console.error('valid args ! ');
            return;
        }

        const newUser = {
            login: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        }

        this._triggerLoading();
        const token = await XHR.post('http://localhost:3080/auth/create-user', { body: newUser });
        this._triggerLoading();

        if (token.error) {
            console.error(token);
            return;
        }

        const hashedToken = token.response.split('.');
        const user = JSON.parse(atob(hashedToken[1]));

        this.loginSuccess(user, token);


    }

    _triggerLoading() {
        this.setState({ loading: !this.state.loading });
    }

    __handleChange(input, name) {
        const value = (name == 'agreed') ? !this.state.agreed : input.target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { firstName, lastName, email, password } = this.state;

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
                            <Form loading={this.state.loading} size='large'>

                                <Form.Group unstackable widths={2}>
                                    <Form.Input
                                        icon='user'
                                        iconPosition='left'
                                        onChange={(e) => this.__handleChange(e, 'firstName')}
                                        label='First name'
                                        value={firstName}
                                        placeholder='First name' />
                                    <Form.Input
                                        icon='user'
                                        iconPosition='left'
                                        value={lastName}
                                        onChange={(e) => this.__handleChange(e, 'lastName')}
                                        label='Last name'
                                        placeholder='Last name' />
                                </Form.Group>

                                <Form.Group widths={2}>
                                    <Form.Input
                                        icon='mail'
                                        iconPosition='left'
                                        label='E-mail'
                                        value={email}
                                        onChange={(e) => this.__handleChange(e, 'email')}
                                        placeholder='e-mail'
                                    />
                                    <Form.Input
                                        icon='unlock alternate'
                                        iconPosition='left'
                                        type="password"
                                        label='Password'
                                        value={password}
                                        onChange={(e) => this.__handleChange(e, 'password')}
                                        placeholder='Password'
                                    />
                                </Form.Group>

                                <Form.Checkbox
                                    label='I agree to the Terms and Conditions'
                                    onChange={(e) => this.__handleChange(e, 'agreed')}
                                />
                                <Form.Input
                                    className="Token"
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    color='teal'
                                    fluid size='large'
                                    onClick={(form) => this._submit(form)}
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