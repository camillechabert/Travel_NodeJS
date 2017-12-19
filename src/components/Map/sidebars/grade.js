import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

class Grade extends Component {
  constructor(props) {
    super(props);

    this.classByUser = {
      color: '#ffb70a'
    };

    this.classByCommunity = {
      color: '#717171'
    };
  }

  render() {
    const stars = this.props.grade.user ? this.props.grade.user : this.props.grade.community;
    const style = this.props.grade.user ? this.classByUser : this.classByCommunity;
    return (
      <a>
        { stars.map((s, i) => <Icon key={i} name={s} style={ style } onClick={() => this.props.onClick(i + 1)} />) }
      </a>
    );
  }
}

Grade.propTypes = {
  grade: PropTypes.array.isRequired,
  onClick: PropTypes.func
};

export default Grade;
