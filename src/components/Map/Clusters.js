import React, { Component } from 'react';
import ReactMapboxGl, { Marker, Cluster, Popup } from "react-mapbox-gl";
import { Icon } from 'semantic-ui-react';
import { dummyMarkers } from '../../DummyCoordinates';
import { randomBytes } from 'crypto';
import XHR from '../../helpers/XHRClient';
import PopupContent from './PopupContent';
import NominatimeWrapper from './NominatimeWrapper';

class Clusters extends Component {
    constructor(props) {
        super(props);

        this.state = { prevBounds: null, popup: false, coord: null, markers: [] };

        try {
            this.nominatimeWrapper = new NominatimeWrapper(['bars', 'pubs', 'Restaurants', 'Hotel'], {
                "accept-language": "FR",
                limit: 1000
            });
        } catch (e) {
            console.error(e);
        }

        this._closePopup.bind(this);
    }

    fetchTest() {
        // #TODO: Remove prevBounds and use a function that ensure the previous bounds aren't the same (or loop infinit)
        if (!this.state.prevBounds) {
            const bounds = this.props.bounds || null;
            let response = null

            try {
                response = this.nominatimeWrapper.RunWithBounds(bounds);
            } catch (e) {
                console.error(e);
            }

            response.then((response) => {
                response = [].concat.apply([], response);
                this.setState({
                    markers: response,
                    prevBounds: true
                });
            });
        }
    }

    clusterMarker(coordinates, pointCount) {
        return (
            <Marker coordinates={coordinates} key={randomBytes(150)} >
                <Icon as='i' name='add circle' color='orange' size='huge'>
                    <span style={{ color: 'black' }}>{pointCount}</span>
                </Icon>
            </Marker>
        );
    }

    showPopup(POI, key) {
        this.setState({
            popup: POI,
            coord: [POI.lon, POI.lat]
        });
    }

    _closePopup() {
        this.setState({
            popup: false,
        });
    }

    render() {
        this.fetchTest();
        return (
            <div>
                {this.state.popup &&
                    (<Popup
                        key={'popup'}
                        coordinates={this.state.coord}
                        style={{ zIndex: 99999 }} >
                        <PopupContent POI={this.state.popup} close={this._closePopup.bind(this)} />
                    </Popup>)
                }
                <Cluster zoomOnClick={true} ClusterMarkerFactory={this.clusterMarker}>
                    {
                        this.state.markers.map((POI, key) => {
                            return (<Marker
                                key={key}
                                coordinates={[POI.lon, POI.lat]}
                                onClick={(e) => this.showPopup(POI, key)}>
                                <Icon name='marker' color='blue' size='huge' />
                            </Marker>);
                        }
                        )
                    }
                </Cluster>
            </div>
        );
    }
}


export default Clusters;