import React, {Component} from 'react';
import {
    Table,
    Col,
    Row,
    Container,
    Button,
    UncontrolledAlert,
    Form, FormGroup, FormText,
    Input,
    Modal,
    ModalHeader, ModalFooter, ModalBody
} from 'reactstrap';
import "./Trip.css"
import {HTTP_OK, PROTOCOL_VERSION} from "../Constants";
import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import * as tripSchema from "../../../schemas/TIPTripResponseSchema";

export default class Trip extends Component {

    constructor(props) {
        super(props);

        this.showLoadFileModal = this.showLoadFileModal.bind(this);

        this.state = {
            trip: {
                requestType: "trip",
                requestVersion: PROTOCOL_VERSION,
                options: {title: 'title', earthRadius: '3959.0'},
                places: [],
                distances: []
            },
            showLoadFileModal: false,
            cumulativeDistance: 0,
        };
    }

    render() {
        return(
            <div>
                <Container>
                    {this.renderCumulativeDistance()}
                    <Row>
                        <Col sm={12} md={{size: 6, offset: 3}} lg={{size: 5}}>
                            <h3 align={"right"}>My Trip</h3>
                            <Button onClick={ () => {
                               // this.createTrip();
                                for (let i = 0; i < this.props.locations.length; i++) {
                                    console.log(this.props.locations[i].name);
                                }
                            }}>Create Trip</Button>
                            {this.renderLoadTripButton()}
                            {this.renderLoadFileModal()}
                            {this.renderTable()}
                        </Col>
                    </Row>
                </Container>

            </div>

        )
    }

    renderTable() {
        return (
            <Table size={"sm"} striped responsive className={"tableBlockScroll"}>
                <thead>
                    <tr>
                        <th> Place </th>
                        <th style={{textAlign:'right'}}>Leg dist.</th>
                        <th style={{textAlign:'right'}}>Cumulative dist.</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTrip()}
                </tbody>
            </Table>
        )
    }

    renderTrip() {
        let body = [];
        let c = 0;
        for (let i=1; i<50; i++) {
            const name = "long name for a city"+i.toString();
            c += i;
            body.push(
                <tr key={name}>
                    <td>{name}</td>
                    <td style={{textAlign:'right'}}>{i.toString()}</td>
                    <td style={{textAlign:'right'}}>{c.toString()}</td>
                </tr>
            )
        }
        return body;
    }

    renderCumulativeDistance() {
        if(this.state.cumulativeDistance !== 0) {
            return (
                <div>
                    <UncontrolledAlert>Total Trip Distance: {this.state.cumulativeDistance}</UncontrolledAlert>
                </div>
            )
        }
    }

    renderLoadTripButton()
    {
        return(
            <Button type="button" onClick={this.showLoadFileModal}>Load Trip</Button>
        );
    }

    renderLoadFileModal()
    {
        return(
            <div>
                <Modal isOpen={this.state.showLoadFileModal} toggle={() => this.hideLoadFileModal()}>
                    <ModalHeader toggle={() => this.hideLoadFileModal()}>Load a Trip to Your Itinerary</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input type="file" name="itineraryFile" id="itineraryFile" />
                                <FormText>Please upload your itinerary in a JSON file format.</FormText>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button>Upload</Button>
                        <Button onClick={() => this.hideLoadFileModal()}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    showLoadFileModal()
    {
        this.setState({showLoadFileModal: true});
    }

    hideLoadFileModal()
    {
        this.setState({showLoadFileModal: false});
    }

    getCumulativeDistance() {
        let { cumulativeDistance } = Object.assign(this.state);

        for (let i = 0; i < this.state.trip.distances.length; i++) {
            cumulativeDistance += this.state.trip.distances[i];
        }

        this.setState({cumulativeDistance});
    }

    createTrip() {
        sendServerRequestWithBody('trip', this.state.trip, this.props.serverPort).then(trip => {
            this.processTripRequest(trip);
        });
    }

    processTripRequest(tripResponse) {
        if(!isJsonResponseValid(tripResponse.body, tripSchema)) {

        } else if (tripResponse.statusCode === HTTP_OK) {
            this.setState({trip: JSON.parse(JSON.stringify(tripResponse.body))}, this.getCumulativeDistance);
        }
    }
}
