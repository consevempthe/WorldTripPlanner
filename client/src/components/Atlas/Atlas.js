import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import { Form, FormGroup, Input, FormFeedback, FormText, InputGroupAddon, InputGroup } from 'reactstrap';
import {Button} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

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

    this.state = {
      markerPosition: null,
      LocationServiceOn: false,
      validate: {
        coordinatesState: '',
      },
      latitudeLongitude: ''
    };

    this.getClientLocation();

  }

  submitWhereIs(){
    const position = new Coordinates(this.state.latitudeLongitude);
    this.setState({markerPosition:{lat: position.getLatitude(), lng: position.getLongitude()}});
  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 6, offset: 3}} lg={{size: 5}}>
                {this.renderLeafletMap()}
                {this.renderWhereAmIButton()}
                {this.renderWhereIs()}
              </Col>
            </Row>
          </Container>
        </div>
    );
  }

  renderWhereAmIButton(){
    if(this.state.locationServiceOn){
      return (
          <Button onClick={() => this.markClientLocation()} size={"lg"} block>Where Am I?</Button>
      )
    }
  }


  renderWhereIs(){
    return(
        <Form className={"mt-1"}>
          <FormGroup>
            <InputGroup>
              <Input
                  placeholder={"Example: '40.58 -105.09'"}
                  valid={ this.state.validate.coordinatesState === 'success'}
                  invalid={ this.state.validate.coordinatesState === 'failure'}
                  onChange={ (e) => {
                    this.validateCoordinates(e);
                  }}
              />
              <InputGroupAddon addonType={"append"}><Button onClick={ () => this.submitWhereIs() } >Submit</Button></InputGroupAddon>
              <FormFeedback valid>Yeah those are valid coordinates!</FormFeedback>
              <FormFeedback invalid>Those aren't valid coordinates :(</FormFeedback>
            </InputGroup>
            <FormText>Input latitude and longitude coordinates.</FormText>
          </FormGroup>
        </Form>
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
          {this.getMarker(this.getMarkerPosition(), this.state.markerPosition)}
        </Map>
    )
  }



  addMarker(mapClickInfo) {
    this.setState({markerPosition: mapClickInfo.latlng});
  }


  markClientLocation() {
    this.setState({markerPosition: this.getClientLocation()});
  }


  getMarkerPosition() {
    let markerPosition = '';
    if (this.state.markerPosition) {
      markerPosition = this.state.markerPosition.lat.toFixed(2) + ', ' + this.state.markerPosition.lng.toFixed(2);
    }
    return markerPosition;
  }


  getMarker(bodyJSX, position) {
    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    };
    if (position) {
      return (
          <Marker ref={initMarker} position={position} icon={MARKER_ICON}>
            <Popup offset={[0, -18]} className="font-weight-bold">{bodyJSX}</Popup>
          </Marker>
      );
    }
  }


  processGeolocation(geolocation) {
    const position = {lat: geolocation.coords.latitude, lng: geolocation.coords.longitude};
    this.setState({markerPosition: position, locationServiceOn: true});
  }


  getClientLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.processGeolocation);
    }
  }

  /* Taken from https://www.npmjs.com/package/coordinate-parser
   * Flexible algorithm to parse strings containing various latitude/longitude formats.
   */
  isValidPosition(position) {
    let isValid;
    try {
      isValid = true;
      new Coordinates(position);
      return isValid;
    } catch (error) {
      isValid = false;
      return isValid;
    }
  }

  validateCoordinates(e) {
    const { validate } = this.state;
    const coordinates = e.target.value;

    if(this.isValidPosition(coordinates)) {
      validate.coordinatesState = 'success';
      this.setState({latitudeLongitude: coordinates});
    } else {
      validate.coordinatesState = 'failure';
    }
    this.setState({ validate });
  }

}
