import React, { Component } from "react";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

export default class CreateTripModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            title: "",
            optLevel: 0,
        };
    }

    render() {
        return(
            <div>
                {this.renderCreateTripModal()}
            </div>
        )
    }

    renderCreateTripModal() {
        return(
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggleModal}>
                    <ModalHeader toggle={() => this.props.toggleModal()}>
                        Create A Trip
                    </ModalHeader>
                    {this.renderForm()}
                </Modal>
            </div>
        )
    }

    renderForm() {
        return(
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Title:</Label>
                        {this.renderInputField(this.state.title, "Add a Title to Your Trip")}
                        <Label>Optimize Trip</Label>
                        {this.renderSliderScale()}
                    </FormGroup>
                </Form>
            </ModalBody>
        )
    }

    renderInputField(value, placeholder) {
        return(
            <Input
                onChange={(e) => this.updateTitle(e.target.value)}
                value={value}
                placeholder={placeholder}
            />
        )
    }

    renderSliderScale() {
        return (
            <RangeSlider
                value={this.state.optLevel}
                max={60}
                onChange={e => this.updateOptimizeLevel(Number(e.target.value))}
            />
        );
    }

    updateTitle(value) {
        this.setState({title: value});
    }

    updateOptimizeLevel(value) {
        this.setState({optLevel: value});
    }
}