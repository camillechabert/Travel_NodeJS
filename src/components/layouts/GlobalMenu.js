import React, { Component } from "react";
import { Link } from 'react-router';
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Segment, Visibility } from 'semantic-ui-react';
import { store } from '../../store';

class GlobalMenu extends Component {
    constructor(props) {
        super(props);
    }

    logOut() {
        this.props.dataPropagation(false);
        store.dispatch({ type: 'DROP_USER' });
    }

    // Must be improve, keep it for cam&fran
    render() {
        return (
            <div>
                <Segment
                    inverted
                    textAlign='center'
                    vertical
                >
                    <Container>
                        <Menu inverted pointing secondary size='large'>
                            <Menu.Item as={Link} to='/' active>Home</Menu.Item>
                            <Menu.Item as={Link} to='/faq'>Faq</Menu.Item>
                            <Menu.Item as='a'>Company</Menu.Item>
                            <Menu.Item as='a'>Careers</Menu.Item>
                            <Menu.Item position='right'>
                                {
                                    this.props.userSession ? (
                                        <div>
                                            <Button as={Link} to='/edit' inverted> Settings </Button>
                                            <Button as={Link} to='/' onClick={() => { this.logOut(); }} style={{ marginLeft: '0.5em' }} inverted> <Icon name="log out" /> Log Out </Button>
                                        </div>
                                    ) : (
                                            <div>
                                                <Button as={Link} to='/login' inverted> <Icon name="user" /> Log In </Button>
                                                <Button as={Link} to='/sign-up' style={{ marginLeft: '0.5em' }} inverted> Sign In </Button>
                                            </div>
                                        )
                                }
                            </Menu.Item>
                        </Menu>
                    </Container>
                </Segment>
            </div>
        );
    }
}

export default GlobalMenu;
