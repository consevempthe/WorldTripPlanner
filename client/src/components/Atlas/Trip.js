import React, {Component} from 'react';
import {
    Table, Button, ButtonGroup, UncontrolledAlert,
    UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import LoadSave from "./LoadSave";
import './Resources/tripTable.css'
import {HTTP_OK, PROTOCOL_VERSION} from "../Constants";
import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import * as tripSchema from "../../../schemas/TIPTripResponseSchema";
import {createPlace} from "./Resources/HelpfulAPI";

export default class Trip extends Component {

    constructor(props) {
        super(props);

        this.processTripRequest = this.processTripRequest.bind(this);
        this.saveTrip = this.saveTrip.bind(this);

        this.state = {
            trip: {
                requestType: "trip",
                requestVersion: PROTOCOL_VERSION,
                options: {
                    title: '',
                    earthRadius: '3959.0',
                    optimization: {
                        response: '',       // response time 0 - 60
                        construction: '',   // is either ["none","one","some"]
                        improvement: ''    // is either ["none","2opt","3opt"]
                    }
                },
                places: [],
                distances: []
            },
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
                    saveTrip={this.saveTrip}
                    ref={SaveLoad =>{
                        this.SaveLoad = SaveLoad;
                    }}
                />
                {this.renderTable()}
            </div>

        )
    }

    renderTable() {
        if(this.state.trip.places.length > 1 && this.state.trip.distances) {
            return (
                <Table size={"sm"} responsive className={'tableBlockScroll'}>
                    <thead>
                    <tr>
                        <th> Place</th>
                        <th style={{textAlign: 'right'}}>Leg dist.</th>
                        <th style={{textAlign: 'right'}}>Cumulative dist.</th>
                        <th style={{textAlign: 'right'}}>Actions</th>
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
                    <td style={{textAlign: 'center'}}><span onClick={() => this.deleteItem(i)}>&times;</span></td>
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
            <UncontrolledButtonDropdown direction={'up'}>
                <DropdownToggle caret>
                    Edit
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={ () => this.props.toggle()}>New Start</DropdownItem>
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

    saveTrip() {
        let requestType = "{\"requestType\":\"trip\",";
        let requestVersion = "\"requestVersion\": 3,";
        let options = "\"options\":{\"earthRadius\":\"3959.0\"},";
        let places = "\"places\":" + JSON.stringify(this.state.trip.places) + "}";
        let dataStr = requestType + requestVersion + options + places;
        this.SaveLoad.downloadFile('json', 'trip.json', dataStr);
        let kmlFile = this.SaveLoad.buildKML(this.state.trip.places);
        this.SaveLoad.downloadFile('application/vnd.google-earth.kml+xml', 'trip.kml', kmlFile);
    }

    deleteItem(index){
        let tempPlaces = Object.assign(this.state.trip.places);
        tempPlaces.splice(index,1);
        let tempDistances = Object.assign(this.state.trip.distances);
        tempDistances.splice(index,1);
        this.setState({trip: {places: tempPlaces, distances: tempDistances}});
        this.props.deleteMarkerPosition(index);
    }
}
