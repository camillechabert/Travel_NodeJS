import React, { Component } from "react";
import {Link} from 'react-router';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
  } from 'semantic-ui-react';

class GlobalMenu extends Component {

    isLoggedIn() {
        // return this.props.logged;
        return false;
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
                            <Menu.Item as={ Link } to='/' active>Home</Menu.Item>
                            <Menu.Item as={ Link } to='/faq'>Faq</Menu.Item>
                            <Menu.Item as='a'>Company</Menu.Item>
                            <Menu.Item as='a'>Careers</Menu.Item>
                            <Menu.Item position='right'>
                                {
                                    this.isLoggedIn() ? (
                                        <div>
                                            <Button as={ Link } to='/edit' inverted> Settings </Button>
                                            <Button as={ Link } to='/' style={{ marginLeft: '0.5em' }} inverted> <Icon name="log out"/> Log Out </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Button as={ Link } to='/login' inverted> <Icon name="user"/> Log In </Button>
                                            <Button as={ Link } to='/sign-up' style={{ marginLeft: '0.5em' }} inverted> Sign In </Button>
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
