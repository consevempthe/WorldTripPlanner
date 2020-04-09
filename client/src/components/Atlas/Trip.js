import React, {Component} from 'react';
import {
    Table, Modal, ModalBody, ModalHeader, ModalFooter, Form, Input,
    Button, ButtonGroup,
    UncontrolledAlert,
    UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import "./Trip.css"
import LoadSave from "./LoadSave";
import {HTTP_OK, PROTOCOL_VERSION} from "../Constants";
import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import * as tripSchema from "../../../schemas/TIPTripResponseSchema";
import {createPlace, numberToString, parseCoordinate, validateCoordinate, validateName} from "./Resources/HelpfulAPI";

export default class Trip extends Component {

    constructor(props) {
        super(props);

        this.processTripRequest = this.processTripRequest.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {
            trip: {
                requestType: "trip",
                requestVersion: PROTOCOL_VERSION,
                options: {title: '', earthRadius: '3959.0'},
                places: [],
                distances: []
            },

            newStart: {
                name: '', latitude: '', longitude: '',
            },
            validateName: '',
            modal: false,
        };
    }

    toggle() {
        this.setState({modal: !this.state.modal});
    }

    render() {
        return(
            <div>
                <h3 align={"right"}>My Trip</h3>
                {this.renderCumulativeDistance()}
                <ButtonGroup className={"float-left"}>
                    <Button onClick={ () => {
                        this.addTitle();
                        this.changeRadius();
                        this.createTrip();
                    }}>Create</Button>
                    {this.renderEditButton()}
                </ButtonGroup>
                {this.renderAddNewStart()}
                <LoadSave
                    addPlaces={this.props.addPlaces}
                    processRequest={this.processTripRequest}
                />
                {this.renderTable()}
            </div>

        )
    }

    renderTable() {
        if(this.state.trip.places.length > 1 && this.state.trip.distances) {
            return (
                <Table size={"sm"} responsive className={"tableBlockScroll"}>
                    <thead>
                    <tr>
                        <th> Place</th>
                        <th style={{textAlign: 'right'}}>Leg dist.</th>
                        <th style={{textAlign: 'right'}}>Cumulative dist.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTrip()}
                    </tbody>
                </Table>
            )
        }
    }

    renderTrip() {
        let body = [];
        let runningTotalLeg = 0;
        let legLength = 0;

        for (let i = 0; i < this.state.trip.places.length; i++) {
            const name = this.state.trip.places[i].name;

            body.push(
                <tr key={name}>
                    <td>{name}</td>
                    <td style={{textAlign: 'right'}}>{legLength.toString()}</td>
                    <td style={{textAlign: 'right'}}>{runningTotalLeg.toString()}</td>
                </tr>
            );
            runningTotalLeg += this.state.trip.distances[i];
            legLength = 0;
            legLength += this.state.trip.distances[i];
        }

        return body;
    }

    renderEditButton() {
        return (
            <UncontrolledButtonDropdown>
                <DropdownToggle caret>
                    Edit
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.toggle}>New Start</DropdownItem>
                    <DropdownItem onClick={ () => this.reverseTrip()}>Reverse Trip</DropdownItem>
                    <DropdownItem>Delete Destination</DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        )
    }

    renderAddNewStart() {
        return(
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add a new start</ModalHeader>
                <ModalBody>
                    <Form>
                        <Input placeholder={"Give a name."} onChange={ (event) => this.newStartName(event) } />
                        <Input placeholder={"Add coordinates."} onChange={ (event) => this.newCoordinates(event)}/>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button>Add New Start</Button>
                    <Button onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

    newStartName(event) {
        const {newStart} = Object.assign(this.state);
        this.setState({validateName: validateName(event)});
        if(this.state.validateName === 'success') {
            newStart.name = event.target.value;
        }
        this.setState({newStart});
    }

    newCoordinates(event) {
        const {newStart} = Object.assign(this.state);
        this.setState({validateCoordinate: validateCoordinate(event)});
        const coordinate = parseCoordinate(event);
        newStart.latitude = numberToString(coordinate.getLatitude());
        newStart.longitude = numberToString(coordinate.getLongitude());
    }

    computeCumulativeDistance() {
        let cumulativeDistance = 0;

        for (let i = 0; i < this.state.trip.distances.length; i++) {
            cumulativeDistance += this.state.trip.distances[i];
        }

        return cumulativeDistance;
    }

    renderCumulativeDistance() {
        const cumulativeDistance = this.computeCumulativeDistance();

        if(cumulativeDistance !== 0) {
            return (
                <div>
                    <UncontrolledAlert>Round Trip Distance: {cumulativeDistance}</UncontrolledAlert>
                </div>
            )
        }
    }

    reverseTrip() {
        let {places} = Object.assign(this.state.trip);
        places.reverse();
        this.setState({places}, this.createTrip);
    }

    changeRadius() {
        let {trip} = Object.assign(this.state);
        trip["options"].earthRadius = this.props.earthRadius;
        this.setState({trip});
    }

    createTrip() {
        if(this.state.trip.options.title && this.state.trip.places) {
            sendServerRequestWithBody('trip', this.state.trip, this.props.serverPort).then(trip => {
                this.processTripRequest(trip);
            });
        }
    }

    processTripRequest(tripResponse) {
        if(!isJsonResponseValid(tripResponse.body, tripSchema)) {
        } else if (tripResponse.statusCode === HTTP_OK) {
            this.setState({trip: JSON.parse(JSON.stringify(tripResponse.body))});
        }
    }

    addTitle() {
        const {trip} = Object.assign(this.state);
        trip["options"].title = prompt("Add a Title for your trip");
        this.setState({trip});
    }

    addPlace(place) {
        let {trip} = Object.assign(this.state);
        trip["places"].push(createPlace(place));
        this.setState({trip});
    }

    //destroy defaults to 1 meaning that it will change the start place, set it to 0 and it will merely append it.
    changeStartPlace(place, destroy=1) {
        let {places} = Object.assign(this.state.trip);
        places.splice(0, destroy, createPlace(place));
        this.setState({places});
    }
}
