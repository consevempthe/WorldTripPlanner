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
import {DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Label} from 'reactstrap';
import {renderInput, validateName} from "./Resources/HelpfulAPI";

const reader = new FileReader();

export default class LoadSave extends Component {

    constructor(props) {

        super(props);

        this.toggleLoadModal = this.toggleLoadModal.bind(this);
        this.toggleSaveModal = this.toggleSaveModal.bind(this);
        this.setFileName = this.setFileName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setFileType = this.setFileType.bind(this);

        this.state = {
            showLoadFile: false,
            showSaveFile: false,
            validFileName: '',
            fileName: '',
            fileTypes: [".KML", ".SVG"],
            fileType: ".KML",
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

    // Map = KML & SVG
    // Trip = JSON & CSV
    renderSaveForm() {
        return(
            <Form>
                <FormGroup tag="fieldset">
                    <legend>How would you like to save your itinerary?</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" onChange={() => {this.handleChange(0)}} defaultChecked/>{' '}
                            Save Map
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" onChange={() => {this.handleChange(1)}}/>{' '}
                            Save Itinerary
                        </Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    {renderInput("save", "Specify a name for the file: (ex. MyTrip)", this.state.validFileName, this.setFileName)}
                    <FormFeedback valid>Ready to save the world!</FormFeedback>
                    <FormFeedback>Sorry, you need to specify a valid name for the file!</FormFeedback>
                </FormGroup>
            </Form>
        )
    }

    handleChange(radioButton) {
        if(radioButton === 0) {
            this.setState({fileTypes: [".KML", ".SVG"]});
            this.setState({fileType: ".KML"});
        } else {
            this.setState({fileTypes: [".JSON", ".CSV"]});
            this.setState({fileType: ".JSON"});
        }
    }

    renderSaveFile() {
        return(
            <div>
                <Modal isOpen={this.state.showSaveFile} toggle={() => this.toggleSaveModal()}>
                    <ModalHeader toggle={() => this.toggleSaveModal()}>
                        Save Your Itinerary for Later
                    </ModalHeader>
                    <ModalBody>
                        {this.renderSaveForm()}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => this.toggleSaveModal()} disabled={this.state.validFileName !== 'success'}>Save</Button>
                        <UncontrolledDropdown addonType={"prepend"}>
                            <DropdownToggle caret>
                                {this.getFileType()}
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.renderFileIcons()}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Button onClick={() => this.toggleSaveModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    renderFileIcons() {
        return [
            <DropdownItem key={1} onClick={() => this.setFileType(this.state.fileTypes[0])}>{this.state.fileTypes[0]}</DropdownItem>,
            <DropdownItem key={2} onClick={() => this.setFileType(this.state.fileTypes[1])}>{this.state.fileTypes[1]}</DropdownItem>
        ];
    }

    setFileType(newFileType) {
        this.setState({fileType: newFileType});
    }

    getFileType() {
        return this.state.fileType;
    }

    setFileName(event) {
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

    downloadFile(fileType, fileName, fileText) {
        let file = new Blob([fileText], {type: fileType});
        let a = document.createElement('a'),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    buildKML(places) {
        const placeMarkers = this.buildPlaceMarks(places);
        let dataStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<kml xmlns=\"http://www.opengis.net/kml/2.2\" xmlns:gx=\"http://www.google.com/kml/ext/2.2\" xmlns:kml=\"http://www.opengis.net/kml/2.2\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n" +
            "  <Document>\n" +
            "    <name>Single Simple Line</name>\n" +
            "    <open>1</open>\n" +
            "    <description>Just a single blue line across Colorado</description>\n" +
            "    <Style id=\"CrossStyle\">\n" +
            "      <LineStyle>\n" +
            "        <color>ffffffb6</color>\n" +
            "        <width>4</width>\n" +
            "      </LineStyle>\n" +
            "    </Style>\n" + placeMarkers +"" +
            "    </Document>\n" +
            "</kml>";
        console.log(dataStr);
        return(
            dataStr
        );
    }

    buildPlaceMarks(places) {
        let placeMarkers = "<Placemark><name>Cross-corner line</name><styleUrl>#CrossStyle</styleUrl><LineString><coordinates>";
        for(let i = 0; i < places.length; i++){
            placeMarkers += `${places[i].latitude},${places[i].longitude},0\n`;
        }
        placeMarkers += "</coordinates></LineString></Placemark>";
        return placeMarkers;
    }
}