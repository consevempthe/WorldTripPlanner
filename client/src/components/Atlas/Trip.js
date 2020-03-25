import React, {Component} from 'react';
import {Table, Col, Row, Container, Button} from 'reactstrap';
import "./Trip.css"
import {HTTP_OK, PROTOCOL_VERSION} from "../Constants";
import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import * as tripSchema from "../../../schemas/TIPTripResponseSchema";

export default class Trip extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trip: {
                requestType: "trip",
                requestVersion: PROTOCOL_VERSION,
                options: {title: 'title', earthRadius: '6371.0'},
                places: [],
                distances: []
            }
        };
    }

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{size: 6, offset: 3}} lg={{size: 5}}>
                            <h3 align={"right"}>My Trip</h3>
                            <Button onClick={ () => this.testTrip()}>Testing</Button>
                        </Col>
                    </Row>
                </Container>
                {this.renderTable()}
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

    testTrip() { // this is just a testing function to test your request not the button in render()
        this.createTrip();
    }

    createTrip() {
        sendServerRequestWithBody('trip', this.state.trip, this.props.serverPort).then(trip => {
            this.processTripRequest(trip);
        });
    }

    processTripRequest(tripResponse) {
        if(!isJsonResponseValid(tripResponse.body, tripSchema)) {

        } else if (tripResponse.statusCode === HTTP_OK) {
            this.setState({trip: JSON.parse(JSON.stringify(tripResponse.body))});
        }
    }
}
