import React from 'react';
import '../../stylesheets/main.scss';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Notification extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="event">
        <Label as='a'>
          { this.props.image ? <img src={ this.props.image } /> : ''}
          { this.props.message }
        </Label>
      </div>
    );
  }
}

Notification.propTypes = {
  image: PropTypes.string,
  message: PropTypes.string.isRequired
};

export default Notification;
