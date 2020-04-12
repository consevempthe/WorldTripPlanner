import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    FormText,
    ModalFooter,
    FormFeedback,
} from 'reactstrap';
import {sendServerRequestWithBody} from "../../utils/restfulAPI";
import {DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';
import Label from "reactstrap/es/Label";
import {renderInput, validateName} from "./Resources/HelpfulAPI";

const reader = new FileReader();

export default class LoadSave extends Component {

    constructor(props) {
        super(props);
        this.toggleLoadModal = this.toggleLoadModal.bind(this);
        this.toggleSaveModal = this.toggleSaveModal.bind(this);
        this.setName = this.setName.bind(this);
        this.state = {
            showLoadFile: false,
            showSaveFile: false,
            validFileName: '',
            fileName: '',
            fileType: ".KML"
        };

    }

    render() {
        return(
            <div>
                {this.renderLoadSave()}
                {this.renderLoadFile()}
                {this.renderSaveFile()}
            </div>
        )
    }

    toggleLoadModal() {
        this.setState({showLoadFile: !this.state.showLoadFile});
    }

    toggleSaveModal() {
        this.setState({showSaveFile: !this.state.showSaveFile});
        this.setState({validFileName: ''});
    }

    renderLoadSave() {
        return(
            <UncontrolledDropdown className={"float-right"} direction={"up"}>
                <DropdownToggle caret>
                    File
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.toggleLoadModal}>Load</DropdownItem>
                    <DropdownItem onClick={this.toggleSaveModal}>Save</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    renderLoadFile() {
        return(
            <div>
                <Modal isOpen={this.state.showLoadFile} toggle={() => this.toggleLoadModal()}>
                    <ModalHeader toggle={() => this.toggleLoadModal()}>Load a trip to your itinerary.</ModalHeader>
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
                        <Button onClick={ () => this.toggleLoadModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    renderSaveFile() {
        return(
            <div>
                <Modal isOpen={this.state.showSaveFile} toggle={() => this.toggleSaveModal()}>
                    <ModalHeader toggle={() => this.toggleSaveModal()}>
                        Save Your Itinerary for Later
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup tag="fieldset">
                                <legend>How would you like to save your itinerary?</legend>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio1" defaultChecked/>{' '}
                                        Save Map
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio1" />{' '}
                                        Save Itinerary
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                {renderInput("save", "Specify a name for the file: (ex. MyTrip)", this.state.validFileName, this.setName)}
                                <FormFeedback valid>Ready to save the world!</FormFeedback>
                                <FormFeedback>Sorry, you need to specify a name for the file!</FormFeedback>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => this.toggleSaveModal()} disabled={this.state.validFileName !== 'success'}>Save</Button>
                        <UncontrolledDropdown addonType={"prepend"}>
                            <DropdownToggle caret>
                                {this.getFileType()}
                            </DropdownToggle>
                        </UncontrolledDropdown>
                        <Button onClick={() => this.toggleSaveModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    getFileType() {
        return this.state.fileType;
    }

    setName(event) {
        this.setState({validFileName: validateName(event)});
        this.setState({fileName: event.target.value});
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
            this.toggleLoadModal();
        } else {
            alert("Error: file format not recognized. Please upload a JSON formatted file.");
        }
    }

    loadFile() {
        const loadFile = document.getElementById('itineraryFile').files[0];
        reader.readAsText(loadFile);
    }


}