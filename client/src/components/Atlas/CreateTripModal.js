import React, {Component} from 'react';

export default class CreateTripModal extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            showModal: false,
        };
    }

    render() {
        return(
            <div>

            </div>
        )
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
}