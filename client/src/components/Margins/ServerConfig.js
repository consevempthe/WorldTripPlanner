import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import {PROTOCOL_VERSION} from "../Constants";

export default class ServerConfig extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    render()
    {
        return(
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleOpen}>
                    <ModalHeader toggle={() => this.props.toggleOpen()}>Server Configuration</ModalHeader>
                    {this.renderBody()}
                    <ModalFooter>
                        <Button onClick={() => this.props.toggleOpen()}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    renderBody ()
    {

        return(
            <ModalBody>
                <Table>
                    <tbody>
                        {this.renderServer()}
                        <tr>
                            <td>requestVersion</td>
                            <td>{PROTOCOL_VERSION}</td>
                        </tr>
                        <tr>
                            <td>requestType</td>
                            <td>{this.props.requestType}</td>
                        </tr>
                        {this.renderSupportedRequests()}
                        {this.renderOptimizations()}
                    </tbody>
                </Table>
            </ModalBody>
        );
    }

    renderServer() {
        return(
            <tr>
                <td>serverName</td>
                <td>{this.props.serverName}</td>
            </tr>
        )
    }

    renderSupportedRequests() {
        const supported_requests = this.props.supportedRequests;
        return(
            <tr>
                <td>supportedRequests</td>
                <td>{supported_requests[0] + ", " + supported_requests[1] + ", " + supported_requests[2]}</td>
            </tr>
        )
    }

    renderOptimizations() {
        const optimization = this.props.optimization;
        return(
            <tr>
                <td>Optimizations:</td>
                <td>{optimization.construction + " " + optimization.improvement}</td>
            </tr>
        )
    }

}