import React, {Component} from 'react';
import {DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';
import {Col, Container, Row, UncontrolledAlert} from 'reactstrap';
import {Form, FormGroup, Input, FormFeedback, FormText, InputGroup} from 'reactstrap';

import {HTTP_OK, PROTOCOL_VERSION} from "../Constants";
import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import * as distanceSchema from "../../../schemas/TIPDistanceResponseSchema";

const Coordinate = require('coordinate-parser');


export default class Distance extends Component {

    constructor(props) {
        super(props);

        this.addPlace = this.addPlace.bind(this);
        this.setPlace = this.setPlace.bind(this);
        this.setName = this.setName.bind(this);

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

            name: '',
            validName: 'failure',
            validate: ''
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
            <div>
                <UncontrolledAlert>Distance: {this.state.distance.distance}{unit}</UncontrolledAlert>
            </div>
        )
    }

    setEarthRadius(unit) {
        const {distance} = Object.assign(this.state);
        distance["earthRadius"] = unit;

        this.setState({distance});
    }

    createMarker(place) {
        const { distance } = Object.assign(this.state);
        return {lat: parseFloat(distance[place].latitude), lng: parseFloat(distance[place].longitude), name: "test"};
    }

    getDistance() {
        sendServerRequestWithBody('distance', this.state.distance, this.props.serverPort).then( distance => {
            this.processDistanceResponse(distance);
        });
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
            <UncontrolledDropdown addonType={"prepend"}>
                <DropdownToggle caret>
                    Radius
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={ () => this.setEarthRadius(3959.0)}>Miles</DropdownItem>
                    <DropdownItem onClick={ () => this.setEarthRadius(6371.0)}>Kilometers</DropdownItem>
                    <DropdownItem onClick={ () => this.setEarthRadius(3440.0)}>Nautical Miles</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            )
    }

    renderAddLocation() {
        return (
            <UncontrolledDropdown addonType={"append"}>
                <DropdownToggle disabled={this.state.validate !== 'success'}>
                    +
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={ () => {
                        this.props.changeStart(this.createMarker("place1"));
                    }}
                    >Change Start</DropdownItem>
                    <DropdownItem onClick={ () => {
                        this.props.addPoint(this.createMarker("place1"));
                    }}
                    >Add Place</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    renderForm() {
        return (
            <Form className={"mt-1"}>
                <FormGroup>
                    <FormText>Input coordinates to find the distance.</FormText>
                    <InputGroup>
                        {this.renderRadiusButton()}
                        {this.renderInput("place1", "Enter lat and lng.", this.state.validate, this.setPlace)}
                        {this.renderAddLocation()}
                        <FormFeedback valid>Nice coordinates!</FormFeedback>
                        <FormFeedback>Nope. Try Again!</FormFeedback>
                        {this.renderInput("name1", "Enter name of the place:", this.state.validName, this.setName)}
                        <FormFeedback valid1>Nice! that's a valid name!</FormFeedback>
                        <FormFeedback invalid1>Sorry, you must have a name.</FormFeedback>
                    </InputGroup>
                </FormGroup>
            </Form>
        )
    }

    renderInput(name, placeholder, validate, changeFunction) {
        return (
            <Input
                name={name}
                placeholder={placeholder}
                valid={validate === 'success'}
                invalid={validate === 'failure'}
                onChange={(event) => {
                    changeFunction(event);
                }}
            />
        )
    }

    addPlace(name, coordinate) {
        const {distance} = Object.assign(this.state);
        distance[name].latitude = coordinate.getLatitude().toFixed(2).toString();
        distance[name].longitude = coordinate.getLongitude().toFixed(2).toString();

        this.setState({distance});
    }

    setName(event) {
        if (this.validateName(event)) {
            this.setState({name: event.target.value});
        }
    }

    validateName(event) {
        const val = event.target.value;

        if(val.length !== 0){
            this.setState({validName: 'success'});
            return true;
        }
        else {
            this.setState({validName: 'failure'});
            return false;
        }
    }


    setPlace(event) {
        console.log(this.state.validName);
        if(this.validateCoordinate(event)) {
            this.addPlace(event.target.name, new Coordinate(event.target.value));
        }
    }

    validateCoordinate(event) {
        let { validate } = Object.assign(this.state);
        const coordinate = event.target.value;

        try {
            new Coordinate(coordinate);
            validate = 'success';
            return true;
        } catch (error) {
            validate = 'failure';
            return false;
        } finally {
            this.setState({ validate });
        }
    }
}
