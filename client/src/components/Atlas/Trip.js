import React, {Component} from 'react';
import {Table, Col, Container} from 'reactstrap';
import "./Trip.css"

export default class Trip extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Container>
                    <Col sm={12} md={{size: 6, offset: 3}} lg={{size: 5}}>
                        <h3>My Trip</h3>
                    </Col>
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
}
