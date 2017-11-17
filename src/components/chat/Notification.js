import React from 'react';
import '../../stylesheets/main.scss';
import { Label } from 'semantic-ui-react';
const { string } = React.PropTypes;

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
  image: string,
  message: string.isRequired
};

export default Notification;
