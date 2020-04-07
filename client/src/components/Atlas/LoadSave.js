import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, FormText, ModalFooter} from 'reactstrap';
import {sendServerRequestWithBody} from "../../utils/restfulAPI";

const reader = new FileReader();

export default class LoadSave extends Component {

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.state = { showLoadFile: false};

    }

    render() {
        return(
            <div>
                {this.renderLoadFile()}
                {this.renderLoadForm()}
            </div>
        )
    }

    openModal() {
        this.setState({showLoadFile: true});
    }

    closeModal() {
        this.setState({showLoadFile: false});
    }

    renderLoadFile() {
        return(
            <Button className={"float-right"} type={"button"} onClick={this.openModal}>Load</Button>
        )
    }

    renderLoadForm() {
        return(
            <div>
                <Modal isOpen={this.state.showLoadFile} toggle={ () => this.closeModal()}>
                    <ModalHeader toggle={ () => this.closeModal()}>Load a trip to your itinerary.</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input type={"file"} name={"itineraryFile"} id={"itineraryFile"} onChange={ () => this.loadFile()} />
                                <FormText>Please upload a JSON file format to load your itinerary.</FormText>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={ () => this.uploadFile()}>Upload</Button>
                        <Button onClick={ () => this.closeModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    applyFileToTable(file) {
        const jsonObject = JSON.parse(file);
        sendServerRequestWithBody('trip', jsonObject, this.props.serverPort).then(trip =>
            this.props.processRequest(trip)
        );
        this.props.addPlaces(jsonObject.places);
    }

    uploadFile() {
        const uploadFile = document.getElementById('itineraryFile').files[0];

        if(uploadFile.type === "application/json") {
            this.applyFileToTable(reader.result);
            this.closeModal();
        } else {
            alert("Error: file format not recognized. Please upload a JSON formatted file.");
        }
    }

    loadFile() {
        const loadFile = document.getElementById('itineraryFile').files[0];
        reader.readAsText(loadFile);
    }


}