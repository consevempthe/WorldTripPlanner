import React, {Component} from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Col, Container, Row} from 'reactstrap';
import {Form, FormGroup, Input, FormFeedback, FormText, InputGroupAddon, InputGroup} from 'reactstrap';
import {Button} from 'reactstrap';

import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
// import {marker} from "leaflet/dist/leaflet-src.esm";
import {sendServerRequestWithBody, isJsonResponseValid} from "../../utils/restfulAPI";
import * as distanceSchema from "../../../schemas/TIPDistanceResponseSchema"
import {HTTP_OK} from "../Constants";

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
const Coordinates = require('coordinate-parser');


export default class Atlas extends Component {

    constructor(props) {
        super(props);

        this.addMarker = this.addMarker.bind(this);
        this.markClientLocation = this.markClientLocation.bind(this);
        this.processGeolocation = this.processGeolocation.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            isOpen: false,
            toggleOpen: false,
            LocationServiceOn: false,
            validate: {
                point1Valid: '',
                point2Valid: '',
            },
            point1: '',
            point2: '',
            distance: {
                requestType: "distance",
                requestVersion: 2,
                place1: {
                    latitude: '',
                    longitude: ''
                },
                place2: {
                    latitude: '',
                    longitude: ''
                },
                earthRadius: 3959.0,
                distance: 0
            },

            // 1st marker
            markerPosition: null,
            // other markers
            otherMarkerPositions: []
        };

        this.getClientLocation();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 6, offset: 3}} lg={{size: 5}}>
                            {this.renderLeafletMap()}
                            {this.renderWhereAmIButton()}
                            {this.renderPointForm()}
                            {this.renderCalculateDistance()}
                        </Col>
                    </Row>
                </Container>
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

    renderInput(name, placeholder, validator, pointValid) {
        return (
            <Input
                name={name}
                placeholder={placeholder}
                valid={validator === "success"}
                invalid={validator === "failure"}
                onChange={(e) => {
                    this.validateCoordinates(e, pointValid);
                    this.handleChange(e);
                }}
            />
        )
    }

    renderPointForm() {
        return (
            <Form className={"mt-1"}>
                <FormGroup>
                    <FormText>Input latitude and longitude coordinates.</FormText>
                    <InputGroup>
                        {this.renderInput("point1", "Example: '40.58, -105.09'", this.state.validate.point1Valid, "point1Valid")}
                        <InputGroupAddon addonType={"append"}>
                            <Button onClick={() => this.setPoint(this.state.point1)}>Submit</Button>
                        </InputGroupAddon>
                        <FormFeedback valid>Yeah those are valid coordinates!</FormFeedback>
                        <FormFeedback>Those aren't valid coordinates :(</FormFeedback>
                    </InputGroup>
                    <InputGroup>
                        {this.renderInput("point2", "Enter a 2nd point to compute distance", this.state.validate.point2Valid, "point2Valid")}
                        <FormFeedback valid>Nice. Go find that distance!!</FormFeedback>
                        <FormFeedback>Nope this one isn't valid.</FormFeedback>
                    </InputGroup>
                </FormGroup>
            </Form>
        )
    }

    renderCalculateDistance() {
        return (
            <div>
                <ButtonDropdown isOpen={this.state.isOpen} toggle={() => this.state.toggleOpen} className="float-right"
                                size={"lg"}>
                    <Button id="caret" onClick={() => this.getDistanceOnSubmit()}>Calculate Distance</Button>
                    <DropdownToggle onClick={() => this.toggleDropdown()} caret/>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.setEarthRadius(3959.0, false, false)}>Miles</DropdownItem>
                        <DropdownItem
                            onClick={() => this.setEarthRadius(6371.0, false, false)}>Kilometers</DropdownItem>
                        <DropdownItem onClick={() => this.setEarthRadius(3440.0, false, false)}>Nautical
                            Miles</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                {this.renderSelectedEarthRadius()}
            </div>
        )
    }

    renderLeafletMap() {
        return (
            <Map center={this.state.markerPosition}
                 zoom={MAP_ZOOM_DEFAULT}
                 minZoom={MAP_ZOOM_MIN}
                 maxZoom={MAP_ZOOM_MAX}
                 maxBounds={MAP_BOUNDS}
                 onClick={this.addMarker}
                 style={{height: MAP_STYLE_LENGTH, maxWidth: MAP_STYLE_LENGTH}}>
                <TileLayer url={MAP_LAYER_URL} attribution={MAP_LAYER_ATTRIBUTION}/>
                {this.getMarker(this.getMarkerPosition(this.state.markerPosition), this.state.markerPosition)}
                {this.renderOtherMarkers(this.state.otherMarkerPositions)}
                {this.renderLine()}
            </Map>
        )
    }

    renderLine() {
        if (this.state.otherMarkerPositions[this.state.otherMarkerPositions.length-1]) {
            return (
                <Polyline
                    positions={[this.state.markerPosition, this.state.otherMarkerPositions[this.state.otherMarkerPositions.length-1]]}
                />
            );
        }
    }

    renderAlertBox(unit) {
        return (
            <div className="alert alert-success col-md-5 form-inline">
                <i>Distance: {this.state.distance.distance}{unit}</i>
            </div>
        );
    }

    setEarthRadius(earthRadius, isOpen, toggleOpen) {
        const {distance} = this.state;
        distance["earthRadius"] = earthRadius;
        this.setState({distance, isOpen: isOpen, toggleOpen: toggleOpen});

    }

    renderSelectedEarthRadius() {
        if (this.state.distance.distance !== 0) {

            if (this.state.distance.earthRadius === 3959.0) {
                return (
                    this.renderAlertBox("mi.")
                );
            } else if (this.state.distance.earthRadius === 6371.0) {
                return (
                    this.renderAlertBox("km.")
                );
            } else if (this.state.distance.earthRadius === 3440.0) {
                return (
                    this.renderAlertBox("nm.")
                );
            }
        }

    }

    clearOtherMarkers() {
        this.setState({otherMarkerPositions: []});
    }


    renderOtherMarkers(otherMarkers) {
        if (otherMarkers.length !== 0) {
            let markers = [];
            //This will be use full for displaying more than two markers.
            /*for (let i = 0; i < otherMarkers.length; i++) {
                markers.push(this.getMarker(this.getMarkerPosition(otherMarkers[i]), otherMarkers[i]))
            }*/
            markers.push(this.getMarker(this.getMarkerPosition(otherMarkers[otherMarkers.length - 1]), otherMarkers[otherMarkers.length - 1]));
            return markers;
        }
    }

    addMarker(mapClickInfo) {
        this.clearOtherMarkers();
        this.setState({otherMarkerPositions: this.state.otherMarkerPositions.concat(mapClickInfo.latlng)});
        this.calculateDistance();
    }

    calculateDistance() {
        const point1 = `${this.state.markerPosition.lat} , ${this.state.markerPosition.lng}`;
        const point2 = `${this.state.otherMarkerPositions[0].lat} , ${this.state.otherMarkerPositions[0].lng}`;
        this.getDistanceOnMapClick(point1, point2);
    }


    markClientLocation() {
        this.setState({markerPosition: this.getClientLocation()});
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
        this.setState({markerPosition: position, locationServiceOn: true});
    }

    processGeolocationError(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    getClientLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.processGeolocation, this.processGeolocationError);
        }
    }

    setPoint(point) {
        const position = new Coordinates(point);
        this.setState({markerPosition: {lat: position.getLatitude(), lng: position.getLongitude()}});
        this.clearOtherMarkers();
    }

    buildDistance(distance, position1, position2) {
        distance.place1.latitude = position1.getLatitude().toString();
        distance.place1.longitude = position1.getLongitude().toString();
        distance.place2.latitude = position2.getLatitude().toString();
        distance.place2.longitude = position2.getLongitude().toString();
        return distance;
    }

    getDistanceOnMapClick(point1, point2) { //on success renders the distance
        const {distance} = this.state;
        const position1 = new Coordinates(point1);
        const position2 = new Coordinates(point2);
        this.buildDistance(distance, position1, position2);
        sendServerRequestWithBody('distance', this.state.distance, this.props.serverPort).then(distance => {
            this.processDistanceResponse(distance);
        });

    }

    getDistanceOnSubmit() { //on success renders the distance
        const {distance} = this.state;
        const position1 = new Coordinates(this.state.point1);
        const position2 = new Coordinates(this.state.point2);
        this.buildDistance(distance, position1, position2);
        sendServerRequestWithBody('distance', this.state.distance, this.props.serverPort).then(distance => {
            this.processDistanceResponse(distance);
        });
        const point1 = {lat: position1.getLatitude(), lng: position1.getLongitude()};
        const point2 = {lat: position2.getLatitude(), lng: position2.getLongitude()};
        this.setState({markerPosition: point1, otherMarkerPositions: this.state.otherMarkerPositions.concat(point2)});
    }

    processDistanceResponse(distanceResponse) {
        if (!isJsonResponseValid(distanceResponse.body, distanceSchema)) {
            this.setState({distance: false})
        } else if (distanceResponse.statusCode === HTTP_OK) {
            this.setState({distance: JSON.parse(JSON.stringify(distanceResponse.body))});
        }
    }

    /* Taken from https://www.npmjs.com/package/coordinate-parser
     * Flexible algorithm to parse strings containing various latitude/longitude formats.
     */
    isValidPosition(position) {
        try {
            new Coordinates(position);
            return true;
        } catch (error) {
            return false;
        }
    }

    validateCoordinates(e, point) {
        const {validate} = this.state;
        const coordinates = e.target.value;

        if (this.isValidPosition(coordinates)) {
            validate[point] = 'success';
        } else {
            validate[point] = 'failure';
        }
        this.setState({validate});
    }

    toggleDropdown() {
        if (this.state.isOpen) {
            this.setState({isOpen: false, toggleOpen: false});
        } else {
            this.setState({isOpen: true, toggleOpen: true});
        }
    }

}
