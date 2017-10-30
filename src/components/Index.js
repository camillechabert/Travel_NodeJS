import React, { Component } from 'react';
import XHRClient from '../helpers/XHRClient';
import { Button, Grid, Image } from 'semantic-ui-react';

class Index extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container columns={1}>
                <Grid.Column>
                    <Image src="https://images2.alphacoders.com/485/thumb-1920-485508.jpg" />
                </Grid.Column>
            </Grid>
        );
    }
}

Index.propTypes = {
    // includ there the props for typechecking
}

export default Index;