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