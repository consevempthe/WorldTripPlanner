import React, { Component } from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

export default class CreateTripModal extends Component {
    constructor(props) {
        super(props);

        this.createTrip = this.createTrip.bind(this);
        this.setTripOptimization = this.setTripOptimization.bind(this);

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
                    {this.renderFooter()}
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

    renderFooter() {
        return(
            <ModalFooter>
                <Button disabled={this.state.title.length === 0} onClick={ () => this.createTrip()}>Create Trip</Button>
                {this.renderButton(this.props.toggleModal,"Cancel")}
            </ModalFooter>
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

    renderButton(onClickAction, label) {
        return(
            <Button onClick={() => onClickAction()}>{label}</Button>
        )
    }

    createTrip() {
        this.setTripOptimization(this.state.optLevel);
        this.props.addTitle(this.state.title);
        this.props.changeRadius();
        this.props.createTrip();
        this.props.toggleModal();
    }

    updateTitle(value) {
        this.setState({title: value});
    }

    updateOptimizeLevel(value) {
        this.setState({optLevel: value});
    }

    setTripOptimization(optLevel) {

        if(optLevel === 0) {
            this.props.setTripOptimization(optLevel, "none", "none");
        } else if (optLevel > 0 && optLevel <= 3) {
            this.props.setTripOptimization(optLevel, "one", "none");
        } else if (optLevel > 3 && optLevel <= 50) {
            this.props.setTripOptimization(optLevel, "some", "none");
        } else {
            this.props.setTripOptimization(optLevel, "some", "none");
        }

    }
}