import React from 'react';
import '../../stylesheets/main.scss';
import { Label } from 'semantic-ui-react';

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

export default Notification;
