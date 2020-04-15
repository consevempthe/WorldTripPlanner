import React, {Component} from 'react';
import {DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';
import {UncontrolledAlert} from 'reactstrap';
import {Form, FormGroup, FormFeedback, FormText, InputGroup} from 'reactstrap';

import {COORDINATE, PROTOCOL_VERSION} from "../Constants";
import {sendServerRequestWithBody} from "../../utils/restfulAPI";
import * as distanceSchema from "../../../schemas/TIPDistanceResponseSchema";
import {numberToString, processProtocolResponse, validateName, renderInput} from "./Resources/HelpfulAPI";

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
            validName: '',
            validate: ''
        }
    }

    render() {
        return (
            <div>
                {this.renderForm()}
                <div>
                    {this.renderDistance()}
                </div>
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

        this.props.changeRadius(unit.toString());

        this.setState({distance});
    }

    getDistance() {
        sendServerRequestWithBody('distance', this.state.distance, this.props.serverPort).then( distance => {
            this.setState({distance: processProtocolResponse(distance, distanceSchema)})
        });
    }

    distanceOnClick(marker1, marker2) {
        const position1 = new COORDINATE(marker1);
        const position2 = new COORDINATE(marker2);
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

    createMarker() {
        const { place1 } = Object.assign(this.state.distance);
        return {lat: parseFloat(place1.latitude), lng: parseFloat(place1.longitude), name: this.state.name};
    }

    renderAddLocation() {
        let predicate = this.state.validate !== 'success'|| this.state.validName !== 'success';
        return (
            <UncontrolledDropdown addonType={"append"}>
                <DropdownToggle disabled={predicate}>
                    +
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={ () => {
                        this.props.changeStart(this.createMarker());
                    }}
                    >Change Start</DropdownItem>
                    <DropdownItem onClick={ () => {
                        this.props.addPoint(this.createMarker());
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
                    <FormText>Input a name and coordinates to plan your trip.</FormText>
                    <InputGroup>
                        {renderInput("name1", "Enter name of the place:",
                            this.state.validName, this.setName)}
                        <FormFeedback valid>Nice! that's a valid name!</FormFeedback>
                        <FormFeedback>Names have to be unique.</FormFeedback>
                    </InputGroup>
                    <InputGroup>
                        {this.renderRadiusButton()}
                        {renderInput("place1", "Enter lat and lng.",
                            this.state.validate, this.setPlace)}
                        {this.renderAddLocation()}
                        <FormFeedback valid>Nice coordinates!</FormFeedback>
                        <FormFeedback>Nope. Try Again!</FormFeedback>
                    </InputGroup>
                </FormGroup>
            </Form>
        )
    }

    addPlace(name, coordinate) {
        const {distance} = Object.assign(this.state);
        distance[name].latitude = numberToString(coordinate.getLatitude());
        distance[name].longitude = numberToString(coordinate.getLongitude());
        distance[name].name = this.state.name;

        this.setState({distance});
    }

    setName(event) {
        this.setState({validName: validateName(event)});
        this.setState({name: event.target.value});
    }

    setPlace(event) {
        if(this.validateCoordinate(event)) {
            this.addPlace(event.target.name, new COORDINATE(event.target.value));
        }
    }

    validateCoordinate(event) {
        let { validate } = Object.assign(this.state);
        const coordinate = event.target.value;

        try {
            new COORDINATE(coordinate);
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
