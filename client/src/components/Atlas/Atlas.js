import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {Button} from 'reactstrap';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_CENTER_DEFAULT = [0, 0];
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

    this.markClientLocation = this.markClientLocation.bind(this);
    this.processGeolocation = this.processGeolocation.bind(this);

    this.state = {
      markerPosition: null,
      mapCenter: [0,0],
      hasGeo: false
    };

    this.getClientLocation();

  }

  render() {
    return (
        <div>
          <Container>
            <Row>
              <Col sm={12} md={{size: 6, offset: 3}}>
                {this.renderLeafletMap()}
                {this.renderWhereAmIBtn()}
              </Col>
            </Row>
          </Container>
        </div>
    );
  }

  renderWhereAmIBtn(){
    if(this.state.hasGeo){
      return (
          <Button onClick={() => this.markClientLocation()} size={"lg"} block>Where Am I?</Button>
      )
    }
  }

  renderLeafletMap() {
    return (
        <Map center={MAP_CENTER_DEFAULT}
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
    this.setState({markerPosition: position, hasGeo: true});
  }

  getClientLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.processGeolocation);
    }
  }
}
