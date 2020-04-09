import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {Button} from 'reactstrap';
import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Distance from "./Distance";
import Trip from "../Atlas/Trip";
import {geolocationAvailable, getClientLocation} from "./Resources/HelpfulAPI";

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

        this.addPlaceToArray = this.addPlaceToArray.bind(this);
        this.addPlacesFromFileUpload = this.addPlacesFromFileUpload.bind(this);
        this.changeEarthRadius = this.changeEarthRadius.bind(this);
        this.changeOrigin = this.changeOrigin.bind(this);

        this.markClientLocation = this.markClientLocation.bind(this);
        this.renderLine = this.renderLine.bind(this);
        this.addMarker = this.addMarker.bind(this);

        this.state = {
            mapBounds: null,
            earthRadius: '3959.0',
            markerPositions: [],
            LoadFile: false,
        };

        this.markClientLocation();
    }

    changeEarthRadius(radius) {
        if(radius) {
            this.setState({earthRadius: radius});
        }
    }

    //destroy defaults to 1 meaning that it will change the start place, set it to 0 and it will merely append it.
    changeOrigin(place, destroy=1) {
        const { markerPositions } = Object.assign(this.state);
        markerPositions.splice(0, destroy, place);
        this.Trip.changeStartPlace(place);
        this.setState({markerPositions}, this.setMapBounds);
    }

    addPlaceToArray(place) {
        this.Trip.addPlace(place);
        this.setState({markerPositions: this.state.markerPositions.concat(place)}, this.setMapBounds);
    }

    addPlacesFromFileUpload(places) {
        let tempPlaces = [];
        for(let i = 0; i <= places.length - 1; i++) {
            const place = {name: places[i].name, lat: parseFloat(places[i].latitude), lng: parseFloat(places[i].longitude)};
            tempPlaces.push(place);
        }
        this.setState({markerPositions: tempPlaces}, this.setMapBounds);
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
                            {this.renderChildren()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    renderChildren() {
        return (
            <div>
                <Distance
                    changeStart={this.changeOrigin}
                    names={this.state.markerPositions}
                    addPoint={this.addPlaceToArray}
                    changeRadius={this.changeEarthRadius}
                    serverPort={this.props.serverPort}
                    ref={distance => {
                        this.distance = distance;
                    }}
                />

                <Trip
                    serverPort={this.props.serverPort}
                    earthRadius={this.state.earthRadius}
                    newStart={this.changeOrigin}
                    addPlaces={this.addPlacesFromFileUpload}
                    ref={Trip => {
                        this.Trip = Trip;
                    }}
                />
            </div>
        )
    }

    renderWhereAmIButton() {
        if (geolocationAvailable()) {
            return (
                <div>
                    <Button onClick={ () => {
                        this.setState({markerPositions: this.state.markerPositions.concat(this.markClientLocation())});
                        this.setState({markerPositions: []});
                    }} size={"md"} block>Where Am I?</Button>
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
        let name = prompt("You clicked on the map! We need you to enter a name to log your trip information: ");

        let place = {name: name, lat: mapClickInfo.latlng.lat, lng: mapClickInfo.latlng.lng};
        this.setState({markerPositions: this.state.markerPositions.concat(place)}, this.setMapBounds);
        this.getDistanceOnMapClick();

        this.Trip.addPlace(place);
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
                <Marker autoPan={false} position={position} icon={MARKER_ICON} key={position.name}>
                    <Popup offset={[0, -18]} className="font-weight-bold">{bodyJSX}</Popup>
                </Marker>
            );
        }
    }

    markClientLocation() {
        getClientLocation(this.addPlaceToArray);
    }

    getDistanceOnMapClick() {
        if(this.state.markerPositions.length > 1) {
            const length = this.state.markerPositions.length;
            const position1 = this.getMarkerPosition(this.state.markerPositions[length - 2]);
            const position2 = this.getMarkerPosition(this.state.markerPositions[length - 1]);
            this.distance.distanceOnClick(position1, position2);
        }
    }
}
