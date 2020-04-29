import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {Button} from 'reactstrap';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import Distance from "./Distance";
import Trip from "../Atlas/Trip";
import {
    geolocationAvailable,
    getClientLocation,
    getMarkerPosition,
    polyLineWrap,
} from "./Resources/HelpfulAPI";
import StartModal from "./StartModal";

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
        this.deleteMarkerPosition = this.deleteMarkerPosition.bind(this);
        this.markClientLocation = this.markClientLocation.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.addNewStart = this.addNewStart.bind(this);
        this.moveMarkerPosition = this.moveMarkerPosition.bind(this);

        this.state = {
            mapBounds: null,
            earthRadius: '3959.0',
            markerPositions: [],
            LoadFile: false,
            modal: false,
        };

        this.markClientLocation();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={12} md={{size: 6, offset: 3}} lg={{size: 5}}>
                        {this.renderLeafletMap()}
                        {this.renderWhereAmIButton()}
                        {this.renderChildren()}
                        {this.renderStartModal()}
                    </Col>
                </Row>
            </Container>
        );
    }

    renderStartModal() {
        return (
            <StartModal
                newStart={this.addNewStart}
                modal={this.state.modal}
                toggle={(modal= !this.state.modal) => this.setState({modal: modal})}
            />
        )
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
                    ref={distance => { this.distance = distance; }}
                />
                <Trip
                    serverPort={this.props.serverPort}
                    earthRadius={this.state.earthRadius}
                    modal={this.state.modal}
                    toggle={(modal= !this.state.modal) => this.setState({modal: modal})}
                    addPlaces={this.addPlacesFromFileUpload}
                    deleteMarkerPosition={this.deleteMarkerPosition}
                    moveMarkerPosition={this.moveMarkerPosition}
                    ref={Trip => { this.Trip = Trip; }}
                />
            </div>
        )
    }

    renderWhereAmIButton() {
        if (geolocationAvailable()) {
            return (
                <div>
                    <Button onClick={ () => {
                        this.setState({markerPositions: []}, this.Trip.resetTrip);
                        this.markClientLocation();
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
                {this.renderPolyline(this.state.markerPositions)}
            </Map>
        )
    }

    renderPolyline(markerPositions) {
        let lines = [];
        if (markerPositions.length > 1) {
            for(let i = 0; i < markerPositions.length; i++) {
                if(i === markerPositions.length - 1) {
                        lines.push(polyLineWrap(markerPositions[0],markerPositions[markerPositions.length - 1]));
                } else {
                        lines.push(polyLineWrap(markerPositions[i], markerPositions[i + 1]));
                }
            }

            return lines;
        }
    }

    renderOtherMarkers(otherMarkers) {
        if (otherMarkers.length !== 0) {
            let markers = [];
            for (let i = 0; i < otherMarkers.length; i++) {
                markers.push(this.getMarker(getMarkerPosition(otherMarkers[i]), otherMarkers[i]));
            }
            return markers;
        }
    }

    addMarker(mapClickInfo) {
        let name;
        name = prompt("You clicked on the map! We need you to enter a name to log your trip information: ");

        if(name === null) {
            // do nothing here - user hit cancel;
            return;
        }
        if(name.length !== 0) {
            let place = {name: name, lat: mapClickInfo.latlng.lat, lng: mapClickInfo.latlng.lng};
            this.setState({markerPositions: this.state.markerPositions.concat(place)}, this.setMapBounds);

            this.Trip.addPlace(place);
        }
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

    changeEarthRadius(radius) {
        if(radius) {
            this.setState({earthRadius: radius});
        }
    }

    changeOrigin(place) {
        const { markerPositions } = Object.assign(this.state);
        markerPositions.splice(0, 1, place);
        this.Trip.changeStartPlace(place);
        this.setState({markerPositions}, this.setMapBounds);
    }

    addNewStart(place) {
        const newStart= {name: place.name, lat: parseFloat(place.lat), lng: parseFloat(place.lng)};
        this.setState({markerPositions: [newStart, ...this.state.markerPositions]}, this.setMapBounds);
        this.Trip.changeStartPlace(place,0);
    }

    addPlaceToArray(place) {
        if(place) {
            this.setState({markerPositions: this.state.markerPositions.concat(place)}, this.setMapBounds);
            this.Trip.addPlace(place);
        }
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

    moveMarkerPosition(action,index) {
        let markerPositions = Object.assign(this.state.markerPositions);
        if(action === "up") {
            this.updateMarkerPositionsArray(markerPositions,index, index + 1)
        }
        else {
            this.updateMarkerPositionsArray(markerPositions,index, index - 1)
        }
    }

    updateMarkerPositionsArray(positions, origin, dest) {
        const originObj = positions[origin];
        const destObj = positions[dest];
        this.setState(state => {
            const markerPositions = state.markerPositions.map((item, j) => {
                if(j === dest) {
                    return originObj;
                }
                else if(j === origin) {
                    return destObj;
                }
                else {
                    return item;
                }
            });
            return {
                markerPositions,
            };
        });
    }

    deleteMarkerPosition(index){
        this.setState(state => {
            const markerPositions = state.markerPositions.filter((item,j) => index !== j);
            return{
                markerPositions,
            }
        });
    }
}
