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

        this.state = { popup: false, coord: null, markers: [] };

        try {
            this.nominatimeWrapper = new NominatimeWrapper(['bars', 'Restaurants', 'Hotel'], {
                "accept-language": "FR",
                limit: 1000
            });
        } catch (e) {
            console.error(e);
        }

        this._closePopup.bind(this);
    }

    componentDidMount() {
        this.getPOIData();
    }

    getPOIData() {
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
                markers: response
            });
        });
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
                <Cluster zoomOnClickPadding={20} zoomOnClick={true} ClusterMarkerFactory={this.clusterMarker}>
                    {
                        this.state.markers.map((POI, key) => {
                            const coords = [parseFloat(POI.lon), parseFloat(POI.lat)];

                            return (<Marker
                                key={key}
                                coordinates={coords}
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