import React, { Component } from 'react';
import XHRClient from '../helpers/XHRClient';

class Index extends Component {
    constructor() {
        super();
        this.state = { visibility: 'visible', response: null };
    }

    // This has been made as an example
    async getFakeInfos() {
        this.setState({visibility: 'hidden'});
        const XHR = await XHRClient.get('http://localhost:3080/onBoarding'); // # TODO: Remove me

        if (XHR.response)
            this.setState({visibility: 'visible', response: XHR.response || null});
    }
    
    render() {
        return (
            <div className="index-component">
                <h1>Welcome !!</h1>

                <button className={'call'} onClick={ () => this.getFakeInfos() }>
                    Load Again
                </button>

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