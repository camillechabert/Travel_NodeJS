import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';

class NotFound extends Component {
  render() {
    return (
      <Grid container columns={1}>
        <Grid.Column>
          <Image src="https://img00.deviantart.net/0b3b/i/2014/085/5/c/404_desktop_not_found_by_d3n1el-d48jd4g.png" />
        </Grid.Column>
      </Grid>
    );
  }
}

export default NotFound;
