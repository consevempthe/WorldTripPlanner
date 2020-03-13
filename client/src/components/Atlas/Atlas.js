import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {Button} from 'reactstrap';
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Distance from "../Atlas/distance";

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_LAYER_ATTRIBUTION = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors";
const MAP_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const MAP_STYLE_LENGTH = 500;
const MAP_ZOOM_MAX = 17;
const MAP_ZOOM_MIN = 1;
const MAP_ZOOM_DEFAULT = 16;
const MARKER_ICON = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 40]  // for proper placement
});

export default class Atlas extends Component {

    constructor(props) {
        super(props);

        this.addMarker = this.addMarker.bind(this);
        this.addPointToArray = this.addPointToArray.bind(this);
        this.markClientLocation = this.markClientLocation.bind(this);
        this.processGeolocation = this.processGeolocation.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            LocationServiceOn: false,
            mapBounds: null,
            // all markers
            otherMarkerPositions: []
        };

        this.getClientLocation();
    }

    handleChange(coordinate1, coordinate2) {
        this.setState({markerPosition: coordinate1, otherMarkerPositions: this.state.otherMarkerPositions.concat(coordinate2), mapBounds: L.latLngBounds(coordinate1, coordinate2)});
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 6, offset: 3}} lg={{size: 5}}>
                            {this.renderLeafletMap()}
                            {this.renderWhereAmIButton()}
                        </Col>
                    </Row>
                </Container>
                <Distance
                    marker={this.handleChange}
                    addPoint={this.addPointToArray}
                    serverPort={this.props.serverPort}
                    ref={distance => {
                        this.distance = distance;
                    }}
                />
            </div>
        );
    }

    renderWhereAmIButton() {
        if (this.state.locationServiceOn) {
            return (
                <Button onClick={() => this.markClientLocation()} size={"lg"} block>Where Am I?</Button>
            )
        }
    }

    renderLeafletMap() {
        return (
            <Map bounds={this.state.mapBounds}
                 zoom={MAP_ZOOM_DEFAULT}
                 minZoom={MAP_ZOOM_MIN}
                 maxZoom={MAP_ZOOM_MAX}
                 maxBounds={MAP_BOUNDS}
                 onClick={this.addMarker}
                 style={{height: MAP_STYLE_LENGTH, maxWidth: MAP_STYLE_LENGTH}}>
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
                {this.renderOtherMarkers(this.state.otherMarkerPositions)}
                {this.renderLine()}
            </Map>
        )
    }

    renderLine() {
        if (this.state.otherMarkerPositions[this.state.otherMarkerPositions.length-1]) {
            return (
                <Polyline
                    positions={this.state.otherMarkerPositions}
                />
            );
        }
    }

    clearOtherMarkers() {
        this.setState({otherMarkerPositions: []});
    }

    renderOtherMarkers(otherMarkers) {
        if (otherMarkers.length !== 0) {
            let markers = [];
            //This will be use full for displaying more than two markers.
            for (let i = 0; i < otherMarkers.length; i++) {
                markers.push(this.getMarker(this.getMarkerPosition(otherMarkers[i]), otherMarkers[i]))
            }
            return markers;
        }
    }

    addMarker(mapClickInfo) {
        this.setState({otherMarkerPositions: this.state.otherMarkerPositions.concat(mapClickInfo.latlng), mapBounds: L.latLngBounds(this.state.otherMarkerPositions[0], mapClickInfo.latlng)});
    }

    addPointToArray(point)
    {
        this.setState({otherMarkerPositions: this.state.otherMarkerPositions.concat(point)});
    }

    markClientLocation() {
        this.setState({otherMarkerPositions: this.state.otherMarkerPositions.concat(this.getClientLocation())});
        this.clearOtherMarkers();
    }

    getMarkerPosition(position) {
        let markerPosition = '';
        if (position)
            markerPosition = position.lat.toFixed(2) + ', ' + position.lng.toFixed(2);
        return markerPosition
    }

    getMarker(bodyJSX, position) {
        if (position) {
            return (
                <Marker autoPan={false} position={position} icon={MARKER_ICON} key={position.lat}>
                    <Popup offset={[0, -18]} className="font-weight-bold">{bodyJSX}</Popup>
                </Marker>
            );
        }
    }

    processGeolocation(geolocation) {
        const position = {lat: geolocation.coords.latitude, lng: geolocation.coords.longitude};
        this.setState({otherMarkerPositions: this.state.otherMarkerPositions.concat(position), locationServiceOn: true, mapBounds: L.latLngBounds(position, position)});
    }

    processGeolocationError(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    getClientLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.processGeolocation, this.processGeolocationError);
        }
    }

    //Needs Reimplementation
    /*getDistanceOnMapClick() { //on success renders the distance
        const position1 = `${this.state.markerPosition.lat} , ${this.state.markerPosition.lng}`;
        const position2 = `${this.state.otherMarkerPositions[0].lat} , ${this.state.otherMarkerPositions[0].lng}`;

        this.distance.distanceOnClick(position1, position2);

    }*/
}
