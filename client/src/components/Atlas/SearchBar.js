import React, {Component} from 'react';
import { InputGroup, InputGroupAddon, Button } from 'reactstrap';
import {renderInput, validateName} from "./Resources/HelpfulAPI";

export default class SearchBar extends Component {

    constructor(props) {

        super(props);

        this.state={
            boxContent: "",
            valid: ""
        };

        this.handleChange = this.handleChange.bind(this);

    }

    render() {

        return(
            <div>
                <InputGroup>
                    {renderInput("searchBar", this.props.text, this.state.valid, this.handleChange)}
                    <InputGroupAddon addonType="append">
                        <Button /*onClick={this.props.clickFunction}*/ disabled={this.state.valid !== 'success'}>Submit</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );

    }

    handleChange(event) {
        // Just using validateName(event); right now for event handling.
        // might need to write a different validation method for SQL queries.
        this.setState({valid: validateName(event)});
        this.setState({boxContent: event.target.value});
        console.log(this.state.boxContent + " " + this.state.valid);
    }




}