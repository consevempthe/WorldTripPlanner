import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Form, FormText, Button} from 'reactstrap';
import {numberToString, validateName, renderInput} from "./Resources/HelpfulAPI";
import {COORDINATE} from "../Constants";

export default class StartModal extends Component {
    constructor(props) {
        super(props);

        this.setCoordinate = this.setCoordinate.bind(this);
        this.newStartName = this.newStartName.bind(this);

        this.state = {
            newStart: {
                name: '', latitude: '', longitude: ''
            },

            validName: '',
            validCoordinate: '',
        };
    }

    render() {
        return (
            <div>
                {this.renderStartModal()}
            </div>
        )
    }

    renderStartModal() {
        return (
            <Modal isOpen={this.props.modal} toggle={() => this.props.toggle}>
                <ModalHeader toggle={() => this.props.toggle()}>Add a new start</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormText>Add a new start to your trip!</FormText>
                        {renderInput("validName", "Give your start a name.",
                            this.state.validName, this.newStartName)}
                        {renderInput("validCoordinate", "Enter the coordinates for your start.",
                            this.state.validCoordinate, this.setCoordinate)}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={ () => {this.newStartPlace(); this.props.toggle()}}
                            disabled={this.state.validCoordinate !== 'success'}>
                        Add New Start
                    </Button>
                    <Button onClick={() => this.props.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

    newStartPlace() {
        let point = {name: this.state.newStart.name, lat: this.state.newStart.latitude.toString(), lng: this.state.newStart.longitude.toString()};
        this.props.newStart(point); // this is an object in the form {name, lat.string, lng.string}
        this.setState({validName: '', validCoordinate: ''});
    }

    newStartName(event) {
        const {newStart} = Object.assign(this.state);
        this.setState({validName: validateName(event)});
        if(this.state.validName === 'success') {
            newStart.name = event.target.value;
        }
        this.setState({newStart});
    }

    setCoordinate(event) {
        if(this.validateCoordinate(event)) {
            let {newStart} = Object.assign(this.state);
            const destination = new COORDINATE(event.target.value);
            newStart.latitude = numberToString(destination.getLatitude());
            newStart.longitude = numberToString(destination.getLongitude());
            this.setState({newStart});
        }
    }

    validateCoordinate(event) {
        let {validCoordinate} = Object.assign(this.state);
        const coordinate = event.target.value;

        try {
            new COORDINATE(coordinate);
            validCoordinate = 'success';
            return true;
        } catch (error) {
            validCoordinate = 'failure';
            return false;
        } finally {
            this.setState({validCoordinate});
        }

    }
}
