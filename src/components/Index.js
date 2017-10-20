import React, { Component } from 'react';
import XHRClient from '../helpers/XHRClient';
import { Button } from 'semantic-ui-react';

class Index extends Component {

    constructor() {
        super();
        this.state = { visibility: 'visible', response: null };
    }

    // This has been made as an example
    async getFakeInfos() {
        this.setState({visibility: 'hidden'});
        const XHR = await XHRClient.get('http://localhost:3080/boarding'); // # TODO: Remove me

        if (XHR.response)
            this.setState({visibility: 'visible', response: XHR.response || null});
    }
    
    render() {
        return (
            <div className="index">
                <h1>Welcome !!</h1>
                
                <Button primary onClick={ () => this.getFakeInfos() }>Primary</Button>

                <p className={'content'} style={{ visibility: this.state.visibility }}>
                    {this.state.response}
                </p>
            </div>  
        );
    }
}

Index.propTypes = {
    // includ there the props for typechecking
}

export default Index;