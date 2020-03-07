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

        const server_name = this.props.serverName;
        const request_version = PROTOCOL_VERSION;
        const request_type = this.props.requestType;
        const supported_requests = this.props.supportedRequests;
        const config = supported_requests[0];
        const distance = supported_requests[1];

        return(
            <ModalBody>
                <Table>
                    <tbody>
                        <tr>
                            <td>serverName</td>
                            <td>{server_name}</td>
                        </tr>
                        <tr>
                            <td>requestVersion</td>
                            <td>{request_version}</td>
                        </tr>
                        <tr>
                            <td>requestType</td>
                            <td>{request_type}</td>
                        </tr>
                        <tr>
                            <td>supportedRequests</td>
                            <td>{config + ", " + distance}</td>
                        </tr>
                    </tbody>
                </Table>
            </ModalBody>
        );
    }

}