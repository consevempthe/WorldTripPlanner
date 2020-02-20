import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {Form, FormGroup, Input, FormFeedback, FormText, InputGroupAddon, InputGroup} from 'reactstrap';
import {Button} from 'reactstrap';

import {Map, Marker, Popup, TileLayer, Polyline} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
// import {marker} from "leaflet/dist/leaflet-src.esm";

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
      LocationServiceOn: false,
      validate: {
        point1Valid: '',
        point2Valid: '',
      },
      point1: '',
      point2: '',

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
    if(this.state.locationServiceOn){
      return (
          <Button onClick={() => this.markClientLocation()} size={"lg"} block>Where Am I?</Button>
      )
    }
  }

  renderInput(name, placeholder, validator, pointValid) {
    return(
        <Input
            name={name}
            placeholder={placeholder}
            valid={validator === 'success'}
            invalid={validator === 'failure'}
            onChange={ (e) => {
              this.validateCoordinates(e, pointValid);
              this.handleChange(e);
            }}
        />
    )
  }

  renderPointForm() {
    return(
        <Form className={"mt-1"}>
          <FormGroup>
            <FormText>Input latitude and longitude coordinates.</FormText>
            <InputGroup>
              {this.renderInput("point1", "Example: '40.58, -105.09'", this.state.validate.point1Valid, "point1Valid")}
              <InputGroupAddon addonType={"append"}><Button onClick={ () => this.setPoint(this.state.point1) } >Submit</Button></InputGroupAddon>
              <FormFeedback valid>Yeah those are valid coordinates!</FormFeedback>
              <FormFeedback invalid>Those aren't valid coordinates :(</FormFeedback>
            </InputGroup>
            <InputGroup>
              {this.renderInput("point2", "Enter a 2nd point to compute distance", this.state.validate.point2Valid, "point2Valid")}
              <FormFeedback valid>Nice. Go find that distance!!</FormFeedback>
              <FormFeedback invalid>Nope this one isn't valid.</FormFeedback>
            </InputGroup>
          </FormGroup>
        </Form>
    )
  }

  renderCalculateDistance() {
    return (
        <Button onClick={() => this.getDistance()} size={"lg"} block>Calculate Distance</Button>
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
        if (this.state.otherMarkerPositions[0]) {
            return (
                <Polyline
                    positions={[this.state.markerPosition, this.state.otherMarkerPositions[0]]}
                />
            );
        }
    }

  renderOtherMarkers(otherMarkers) {
    if(otherMarkers.length !== 0)
    {
      let markers = [];
      for(let i = 0; i < otherMarkers.length; i++)
      {
        markers.push(this.getMarker(this.getMarkerPosition(otherMarkers[i]), otherMarkers[i]))
      }
      return markers;
    }
  }

  addMarker(mapClickInfo) {
    this.setState({otherMarkerPositions: []});
    this.setState({otherMarkerPositions: this.state.otherMarkerPositions.concat(mapClickInfo.latlng)});
  }


  markClientLocation() {
    this.setState({markerPosition: this.getClientLocation()});
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
                <Marker autoPan={false} position={position} icon={MARKER_ICON}>
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
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.processGeolocation);
        }
    }

    setPoint(point){
      const position = new Coordinates(point);
      this.setState({markerPosition:{lat: position.getLatitude(), lng: position.getLongitude()}});
    }

    getDistance() {

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
    const { validate } = this.state;
    const coordinates = e.target.value;

    if(this.isValidPosition(coordinates)) {
      validate[point] = 'success';
    } else {
      validate[point] = 'failure';
    }
    this.setState({ validate });
  }

}
