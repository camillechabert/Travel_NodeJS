import React, { Component } from "react";
import {Link} from 'react-router';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-horiz';

import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ActionHome from 'material-ui/svg-icons/action/home';
import Perm from 'material-ui/svg-icons/action/perm-identity';
import PermSettings from 'material-ui/svg-icons/action/perm-data-setting';


class Menu extends Component {

    isLoggedIn() {
        // return this.props.logged;
        return false;
    }

    // Must be improve, keep it for cam&fran
    render() {
        return (
            <IconMenu
                {...this.props}
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>} >

                <MenuItem primaryText="Index" containerElement={<Link to={'/'}/>} leftIcon={<ActionHome />} />

                {this.isLoggedIn() ? (
                    <div>
                        <MenuItem primaryText="Settings" containerElement={<Link to={'/edit'}/>} leftIcon={<PermSettings />} />
                        <MenuItem primaryText="Sign Out" containerElement={<Link to={'/'}/>} leftIcon={<Perm />} />
                    </div>
                ) : (
                        <div>
                            <MenuItem primaryText="Login" containerElement={<Link to={'/login'}/>} leftIcon={<Perm />} />
                            <MenuItem primaryText="Sign up" containerElement={<Link to={'/sign-up'}/>} leftIcon={<PersonAdd />} />
                        </div>
                    )}

            </IconMenu>
        );
    }
}

Menu.muiName = 'IconMenu';

export default Menu;
