import React, {Component} from 'react';
import {
    Button,
    ButtonGroup,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Table,
    UncontrolledAlert,
    UncontrolledButtonDropdown,
} from 'reactstrap';
import LoadSave from "./LoadSave";
import './Resources/tripTable.css'
import {HTTP_OK, PROTOCOL_VERSION} from "../Constants";
import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import * as tripSchema from "../../../schemas/TIPTripResponseSchema";
import {createPlace} from "./Resources/HelpfulAPI";
import CreateTripModal from "./CreateTripModal";

export default class Trip extends Component {

    constructor(props) {
        super(props);

        this.processTripRequest = this.processTripRequest.bind(this);
        this.addTitle = this.addTitle.bind(this);
        this.changeRadius = this.changeRadius.bind(this);
        this.createTrip = this.createTrip.bind(this);
        this.setOptimization = this.setOptimization.bind(this);
        this.resetTrip = this.resetTrip.bind(this);

        this.state = {
            trip: {
                requestType: "trip",
                requestVersion: PROTOCOL_VERSION,
                options: {
                    title: '',
                    earthRadius: '3959.0',
                    optimization: {
                        response: '1',       // response time 0 - 60
                        construction: 'none',   // is either ["none","one","some"]
                        improvement: 'none'    // is either ["none","2opt","3opt"]
                    }
                },
                places: [],
                distances: [],
            },
            createTripModalOpen: false
        };
    }

    render() {
            return(
                <div>
                    <h3 align={"right"}>My Trip</h3>
                    {this.renderCumulativeDistance()}
                    <ButtonGroup className={"float-left"}>
                        <Button onClick={ () => {
                            this.setState({createTripModalOpen: true});
                        }}>Create</Button>
                        {this.renderEditButton()}
                    </ButtonGroup>
                    <LoadSave
                        processRequest={this.processTripRequest}
                        places={this.state.trip.places}
                        options={this.state.trip.options}
                    />
                    {this.renderTable()}
                    {this.renderCreateTripModal()}

                </div>

            );
    }

    renderTable() {
        if(this.state.trip.places.length > 1 && this.state.trip.distances) {
            return (
                <Table size={"sm"} responsive className={'tableBlockScroll'}>
                    <thead>
                    <tr>
                        <th>Move</th>
                        <th>Place</th>
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
                    <td><span onClick={() => this.moveItem("down",i)}>&#x2B06;</span><span onClick={() => this.moveItem("up", i)}>&#x2B07;</span></td>
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
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        )
    }

    renderCreateTripModal() {
        return(
            <CreateTripModal
                isOpen={this.state.createTripModalOpen}
                toggleModal={(isOpen = !this.state.createTripModalOpen) => this.setState({createTripModalOpen: isOpen})}
                addTitle={this.addTitle}
                changeRadius={this.changeRadius}
                createTrip={this.createTrip}
                setTripOptimization={this.setOptimization}
            />
        );
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

    computeCumulativeDistance() {
        let cumulativeDistance = 0;

        for (let i = 0; i < this.state.trip.distances.length; i++) {
            cumulativeDistance += this.state.trip.distances[i];
        }

        return cumulativeDistance;
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
        if(this.state.trip.places.length > 1) {
            sendServerRequestWithBody('trip', this.state.trip, this.props.serverPort).then(trip => {
                this.processTripRequest(trip);
            });
        }
    }

    processTripRequest(tripResponse) {
        if(!isJsonResponseValid(tripResponse.body, tripSchema)) {
        } else if (tripResponse.statusCode === HTTP_OK) {
            this.setState({trip: JSON.parse(JSON.stringify(tripResponse.body))});
            this.props.addPlaces(this.state.trip.places);
        }
    }

    addTitle(title) {
        const {trip} = Object.assign(this.state);
        trip["options"].title = title;
        this.setState({trip});
    }

    addPlace(place) {
        let {trip} = Object.assign(this.state);
        trip["places"].push(createPlace(place));
        this.setState({trip}, this.createTrip);
    }

    //destroy defaults to 1 meaning that it will change the start place, set it to 0 and it will merely append it.
    changeStartPlace(place, destroy=1) {
        let {places} = Object.assign(this.state.trip);
        places.splice(0, destroy, createPlace(place));
        this.setState({places}, this.createTrip);
    }

    deleteItem(index){
        let tempPlaces = Object.assign(this.state.trip.places);
        tempPlaces.splice(index,1);
        let tempDistances = Object.assign(this.state.trip.distances);
        tempDistances.splice(index,1);
        this.setState({trip: {places: tempPlaces, distances: tempDistances}});
        this.props.deleteMarkerPosition(index);
    }

    moveItem(action, index) {
        let places = Object.assign(this.state.trip.places);
        let distances = Object.assign(this.state.trip.distances);
        if(action === "up" && index !== places.length - 1) {
            this.moveArrayItem(places, index, index + 1);
            this.moveArrayItem(distances, index, index + 1);
            this.props.moveMarkerPosition(action,index);
        }
        else if(action === "down" && index !== 0) {
            this.moveArrayItem(places, index, index - 1);
            this.moveArrayItem(distances, index, index - 1);
            this.props.moveMarkerPosition(action,index);
        }
        this.setState({trip: {places: places, distances: distances}});
    }

    moveArrayItem(arr, origin, dest) {
        let temp = arr[dest];
        arr[dest] = arr[origin];
        arr[origin] = temp;
    }

    resetTrip() {
        this.setState({trip: {places: [], distances: []}});
    }

    setOptimization(response, construction, improvement) {
        let {trip} = Object.assign(this.state);
        trip.options.optimization = {
            response: response.toString(),
            construction: construction,
            improvement: improvement
        };
        this.setState({trip});
    }
}
