import React, {Component} from 'react';
import {
    Table,
    Button, ButtonGroup,
    UncontrolledAlert,
    UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import "./Trip.css"
import LoadSave from "./LoadSave";
import {HTTP_OK, PROTOCOL_VERSION} from "../Constants";
import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import * as tripSchema from "../../../schemas/TIPTripResponseSchema";

export default class Trip extends Component {

    constructor(props) {
        super(props);

        this.processTripRequest = this.processTripRequest.bind(this);

        this.state = {
            trip: {
                requestType: "trip",
                requestVersion: PROTOCOL_VERSION,
                options: {title: '', earthRadius: '3959.0'},
                places: [],
                distances: []
            },
            showLoadFileModal: false,
        };
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
                <Table size={"sm"} striped responsive className={"tableBlockScroll"}>
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
                    <DropdownItem>New Start</DropdownItem>
                    <DropdownItem onClick={ () => this.reverseTrip()}>Reverse Trip</DropdownItem>
                    <DropdownItem>Delete Destination</DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        )
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
        const add = {name: place.name, latitude: place.lat.toString(), longitude: place.lng.toString()};
        let {trip} = Object.assign(this.state);
        trip["places"].push(add);
        this.setState({trip});
    }

    changeStartPlace(place) {
        const origin = {name: place.name, latitude: place.lat.toString(), longitude: place.lng.toString()};
        let {trip} = Object.assign(this.state);

        trip["places"][0] = origin;
        this.setState({trip});
    }
}
