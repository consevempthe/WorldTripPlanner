import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

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
        const request_version = this.props.requestVersion;
        const request_type = this.props.requestType;
        return(
            <ModalBody>
                <table>
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
                    </tbody>
                </table>
            </ModalBody>
        );
    }

}