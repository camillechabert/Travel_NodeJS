import React, {Component} from 'react';
import { Icon, Card, Button, Image } from 'semantic-ui-react';

class PopupContent extends Component {

    render() {
        return (
            <Card>
                <Card.Content>
                    <Image floated='right' size='mini' src={this.props.POI.icon} />
                    <Card.Header>
                        {this.props.POI.display_name[0]}
                    </Card.Header>
                    <Card.Meta>
                        {this.props.POI.display_name[1]} -
                    ({this.props.POI.type})
                </Card.Meta>
                    <Card.Description>
                        {this.props.POI.display_name[3]}
                        {this.props.POI.display_name[4]}
                        {this.props.POI.display_name[7]}
                        {this.props.POI.display_name[8]}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>Add</Button>
                        <Button onClick={this.props.close} basic color='red'>Close</Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

export default PopupContent;