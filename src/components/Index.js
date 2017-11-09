import React, { Component } from 'react';
import XHRClient from '../helpers/XHRClient';
import { Button, Grid, Image } from 'semantic-ui-react';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image src="https://images2.alphacoders.com/485/thumb-1920-485508.jpg" />
    );
  }
}

Index.propTypes = {
  // includ there the props for typechecking
};

export default Index;
