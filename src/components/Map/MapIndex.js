import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import { Icon } from 'semantic-ui-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg';

class MapIndex extends Component {
    constructor(props) {
        super(props);
        this.Map = ReactMapboxGl({
            accessToken: '',
            doubleClickZoom: false
        });
    }

    showPopup(e) {
        console.log("show popup");
    }

    render() {
        return (
            <this.Map
                className={'map'}
                center={[-0.580816, 44.836151]}
                zoom={[9]}
                style="mapbox://styles/mapbox/streets-v10" containerStyle={{
                    height: "91%",
                    width: "100%"
                }}>
                <Marker
                    coordinates={[-0.580816, 44.836151]}
                    anchor={'bottom'}
                    onClick={(e) => this.showPopup(e)}
                >
                    <Icon name='marker' color='pink' size='huge' />
                </Marker>

            </this.Map>
        );
    }
}

export default MapIndex;