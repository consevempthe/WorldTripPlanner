import React, {Component} from 'react';
import {DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Col, Container, Row} from 'reactstrap';
import {Form, FormGroup, Input, FormFeedback, FormText, InputGroup, InputGroupButtonDropdown} from 'reactstrap';

import {HTTP_OK, PROTOCOL_VERSION} from "../Constants";
import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import * as distanceSchema from "../../../schemas/TIPDistanceResponseSchema";

const Coordinate = require('coordinate-parser');


export default class Distance extends Component {

    constructor(props) {
        super(props);

        this.addPlace = this.addPlace.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);

        this.state = {
            distance: {
                requestType: "distance",
                requestVersion: PROTOCOL_VERSION,
                place1: {
                    latitude: '',
                    longitude: '',
                },
                place2: {
                    latitude: '',
                    longitude: '',
                },
                earthRadius: 3959.0,
                distance: 0
            },

            isOpen: [false, false],
            toggleOpen: [false, false],

            validate: {
                oneValid: '',
                twoValid: ''
            }
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 6, offset: 3}} lg={{size: 5}}>
                            {this.renderForm()}
                            <div>
                                {this.renderDistance()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    renderDistance() {
        if(this.state.distance.distance !== 0) {
            const radius = this.state.distance.earthRadius;
            switch(radius) {
                case 6371.0:
                    return (
                        this.renderUnits("km.")
                    );
                case 3440.0:
                    return (
                        this.renderUnits("nm.")
                    );
                default:
                    return (
                        this.renderUnits("mi.")
                    );
            }
        }
    }

    renderUnits(unit) {
        return (
            <div className={"alert alert-success col-md-5 form-inline"}>
                <i>Distance: {this.state.distance.distance}{unit}</i>
            </div>
        )
    }

    setEarthRadius(unit) {
        const {distance} = Object.assign(this.state);
        distance["earthRadius"] = unit;

        this.setState({distance});
        this.toggleDropdown(0);
    }

    toggleDropdown(toggleIndex) {
        const { isOpen } = Object.assign(this.state);
        const { toggleOpen } = Object.assign(this.state);
        if (this.state.isOpen[toggleIndex]) {
            isOpen[toggleIndex] = false;
            toggleOpen[toggleIndex] = false;
        } else {
            isOpen[toggleIndex] = true;
            toggleOpen[toggleIndex] = true;
        }
        this.setState({isOpen, toggleOpen});
    }

    createMarker(place) {
        const { distance } = Object.assign(this.state);
        return {lat: parseFloat(distance[place].latitude), lng: parseFloat(distance[place].longitude)};
    }

    getDistance() {
        sendServerRequestWithBody('distance', this.state.distance, this.props.serverPort).then( distance => {
            this.processDistanceResponse(distance);
        })
    }

    processDistanceResponse(distanceResponse) {
        if(!isJsonResponseValid(distanceResponse.body, distanceSchema)) {

        } else if(distanceResponse.statusCode === HTTP_OK){
            this.setState({distance: JSON.parse(JSON.stringify(distanceResponse.body))});
        }
    }

    distanceOnClick(marker1, marker2) {
        const position1 = new Coordinate(marker1);
        const position2 = new Coordinate(marker2);
        this.addPlace("place1", position1);
        this.addPlace("place2", position2);

        this.getDistance();
    }

    renderRadiusButton() {
        return (
            <InputGroupButtonDropdown addonType={"prepend"} isOpen={this.state.isOpen[0]} toggle={ () => this.state.toggleOpen[0]}>
                <DropdownToggle  onClick={ () => this.toggleDropdown(0)} caret>
                    Radius
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={ () => this.setEarthRadius(3959.0)}>Miles</DropdownItem>
                    <DropdownItem onClick={ () => this.setEarthRadius(6371.0)}>Kilometers</DropdownItem>
                    <DropdownItem onClick={ () => this.setEarthRadius(3440.0)}>Nautical Miles</DropdownItem>
                </DropdownMenu>

            </InputGroupButtonDropdown>
            )
    }

    renderAddLocation() {
        return (
            <InputGroupButtonDropdown addonType={"append"} isOpen={this.state.isOpen[1]} toggle={ () => this.state.toggleOpen[1]}>
                <DropdownToggle onClick={ () => this.toggleDropdown(1)} disabled={this.state.validate.oneValid !== 'success'}>
                    +
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={ () => {
                        this.props.changeStart(this.createMarker("place1"));
                        this.toggleDropdown(1)
                    }}
                    >Change start</DropdownItem>
                    <DropdownItem onClick={ () => {
                        this.props.addPoint(this.createMarker("place1"));
                        this.toggleDropdown(1)
                    }}
                    >Add place</DropdownItem>
                </DropdownMenu>
            </InputGroupButtonDropdown>
        )
    }

    renderForm() {
        return (
            <Form className={"mt-1"}>
                <FormGroup>
                    <FormText>Input coordinates to find the distance.</FormText>
                    <InputGroup>
                        {this.renderRadiusButton()}
                        {this.renderInput("place1", "Enter lat and lng.", this.state.validate.oneValid, "oneValid")}
                        {this.renderAddLocation()}
                        <FormFeedback valid>Nice coordinates!</FormFeedback>
                        <FormFeedback>Nope. Try Again!</FormFeedback>
                    </InputGroup>
                </FormGroup>
            </Form>
        )
    }

    renderInput(name, placeholder, validate, pointToValidate) {
        return (
            <Input
                name={name}
                placeholder={placeholder}
                valid={validate === 'success'}
                invalid={validate === 'failure'}
                onChange={(event) => {
                    this.setPlace(event, pointToValidate);
                }}
            />
        )
    }

    addPlace(name, coordinate) {
        const {distance} = Object.assign(this.state);
        distance[name].latitude = coordinate.getLatitude().toString();
        distance[name].longitude = coordinate.getLongitude().toString();

        this.setState({distance});
    }

    setPlace(event, pointToValidate) {
        if(this.validateCoordinate(event, pointToValidate)) {
            this.addPlace(event.target.name, new Coordinate(event.target.value));
        }
    }

    validateCoordinate(event, pointToValidate) {
        const { validate } = Object.assign(this.state);
        const coordinate = event.target.value;

        try {
            new Coordinate(coordinate);
            validate[pointToValidate] = 'success';
            return true;
        } catch (error) {
            validate[pointToValidate] = 'failure';
            return false;
        } finally {
            this.setState({ validate });
        }
    }
}
