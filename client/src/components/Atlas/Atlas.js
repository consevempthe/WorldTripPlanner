import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {Button} from 'reactstrap';
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Distance from "../Atlas/distance";
import Trip from "../Atlas/Trip";

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
        this.changeOrigin = this.changeOrigin.bind(this);
        this.renderLine = this.renderLine.bind(this);
        this.changeEarthRadius = this.changeEarthRadius.bind(this);

        this.state = {
            LocationServiceOn: false,
            mapBounds: null,
            earthRadius: '3959.0',
            markerPositions: [],
        };

        this.getClientLocation();
    }

    changeEarthRadius(radius) {
        this.setState({earthRadius: radius});
    }

    changeOrigin(coordinate) {
        const { markerPositions } = Object.assign(this.state);
        markerPositions.splice(0, 1, coordinate);
        this.setState({markerPositions}, this.setMapBounds);
    }

    addPointToArray(point) {
        this.setState({markerPositions: this.state.markerPositions.concat(point)}, this.setMapBounds);
    }

    setMapBounds() {
        this.setState({mapBounds: L.latLngBounds(this.state.markerPositions)});
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
                    changeStart={this.changeOrigin}
                    addPoint={this.addPointToArray}
                    changeRadius={this.changeEarthRadius}
                    serverPort={this.props.serverPort}
                    ref={distance => {
                        this.distance = distance;
                    }}
                />

                <Trip
                    serverPort={this.props.serverPort}
                    earthRadius={this.state.earthRadius}
                    locations={this.state.markerPositions}
                />
            </div>
        );
    }

    renderWhereAmIButton() {
        if (this.state.locationServiceOn) {
            return (
                <div>
                    <Button onClick={ () => this.markClientLocation()} size={"md"} block>Where Am I?</Button>
                </div>
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
                {this.renderOtherMarkers(this.state.markerPositions)}
                {this.renderLine()}
            </Map>
        )
    }

    renderLine() {
        if(this.state.markerPositions.length > 1) {
            return (
                <Polyline
                    positions={this.state.markerPositions}
                />
            );
        }
    }

    clearMarkers() {
        this.setState({markerPositions: []});
    }

    renderOtherMarkers(otherMarkers) {
        if (otherMarkers.length !== 0) {
            let markers = [];
            //This will be use full for displaying more than two markers.
            for (let i = 0; i < otherMarkers.length; i++) {
                markers.push(this.getMarker(this.getMarkerPosition(otherMarkers[i]), otherMarkers[i]));
            }
            return markers;
        }
    }

    addMarker(mapClickInfo) {
        this.setState({markerPositions: this.state.markerPositions.concat(mapClickInfo.latlng)}, this.setMapBounds);
        // currently name is added to map when user clicks using prompt(msg); a new method may need to be implemented
        this.state.markerPositions[this.state.markerPositions.length - 1].name = prompt("You clicked on the map! We need you to enter a name to log your trip information: ");
        this.getDistanceOnMapClick();
    }

    markClientLocation() {
        this.setState({markerPositions: this.state.markerPositions.concat(this.getClientLocation())});
        this.clearMarkers();
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
        this.setState({markerPositions: this.state.markerPositions.concat(position), locationServiceOn: true, mapBounds: L.latLngBounds(position, position)});
        this.state.markerPositions[0].name = "Home";
    }

    processGeolocationError(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    getClientLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.processGeolocation, this.processGeolocationError);
        }
    }

    getDistanceOnMapClick() {
        if(this.state.markerPositions.length > 1) {
            const length = this.state.markerPositions.length;
            const position1 = `${this.state.markerPositions[length - 2].lat} , ${this.state.markerPositions[length - 2].lng}`;
            const position2 = `${this.state.markerPositions[length - 1].lat} , ${this.state.markerPositions[length - 1].lng}`;

            this.distance.distanceOnClick(position1, position2);
        }
    }
}
