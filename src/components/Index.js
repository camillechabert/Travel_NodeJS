import React, { Component } from 'react';
import API from 'fetch-api';

class Index extends Component {
    constructor() {
        super();
        this.state = { visibility: 'visible', response: null };
    }

    // This has been made as an example
    getFakeInfos() {
        const that = this;
        this.setState({visibility: 'hidden'});

        fetch("http://localhost:3080/onBoarding", {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
            },
        }).then( (response) => {
            if (!response.ok)
                that.setState({response: "Not Provided"});

            return response.json();
        }).then( (json) => {
            this.setState({
                response: json.response || null,
                visibility: 'visible'
            });
        }).catch( (error) => {
            console.error(error);
            that.setState({response: "Error: " + error, visibility: 'visible'});            
        });
    }
    
    render() {
        return (
            <div className="index-component">
                <h1>Welcome !!</h1>

                <button onClick={ () => this.getFakeInfos() }>
                    Load Again
                </button>

                <p style={{ visibility: this.state.visibility }}>
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