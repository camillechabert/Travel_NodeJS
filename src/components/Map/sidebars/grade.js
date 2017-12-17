import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

class Grade extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a>
        { this.props.stars.map((s, i) => <Icon key={i} name={s} />) }
      </a>
    );
  }
}

Grade.propTypes = {
  stars: PropTypes.array.isRequired
};

export default Grade;
