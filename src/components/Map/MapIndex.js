import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';
import { Icon } from 'semantic-ui-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg';
import Clusters from './Clusters';
import { Map } from 'mapbox-gl/dist/mapbox-gl';
import { store } from '../../store';
var mbUtils = require("mapbox-gl");

class MapIndex extends Component {
    constructor(props) {
        super(props);

        this.Map = ReactMapboxGl({
            accessToken: process.env.MapboxKey,
            doubleClickZoom: false
        });

        const bdxBounds = mbUtils.LngLatBounds.convert([-0.6278705830770548, 44.819456570377326, -0.5460090245184119, 44.865412182320085]);
        const bdxCenter = [-0.580816, 44.836151];
        this.state = { coord: bdxCenter, mapBounds: bdxBounds }
        this._getInfos.bind(this);
    }

    _getInfos(map, infos) {
        this.setState({
            mapBounds: map.getBounds()
        });
    }

    render() {
        return (
            <this.Map
                onMoveEnd={(v, m) => this._getInfos(v, m)}
                className={'map'}
                center={this.state.coord}
                style={process.env.MapboxTilesStyle} containerStyle={{
                    height: "91%",
                    width: "100%"
                }}>
                <Clusters bounds={this.state.mapBounds} />
            </this.Map>
        );
    }
}

export default MapIndex;
