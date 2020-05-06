import React, {Component} from 'react';
import { InputGroup, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {renderInput, validateName} from "./Resources/HelpfulAPI";

export default class SearchBar extends Component {

    constructor(props) {

        super(props);

        this.state={
            boxContent: "",
            valid: "",
            dropDownOpen: false,
            filters: [
                {id: "Municipality", active: false},
                {id: "Region", active: false},
                {id: "Country", active: false}
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.applyFilter = this.applyFilter.bind(this);

    }

    render() {

        return(
            <div>
                <InputGroup>
                    {this.renderFilterDropdown()}
                    {renderInput("searchBar", this.props.text, this.state.valid, this.handleChange)}
                    <InputGroupAddon addonType="append">
                        <Button /*onClick={this.props.clickFunction}*/ disabled={this.state.valid !== 'success'}>Submit</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );

    }

    renderFilterDropdown() {
        return (
            <InputGroupAddon addonType={"prepend"}>
                <ButtonDropdown isOpen={this.state.dropDownOpen} direction={'right'} toggle={this.toggleDropdown}>
                    <DropdownToggle caret>
                        Filter
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.renderDropdownItems()}
                    </DropdownMenu>
                </ButtonDropdown>
            </InputGroupAddon>
        );
    }

    renderDropdownItems() {

        let items = [];

        for(let i = 0; i < this.state.filters.length; i++) {
            items.push(
                <DropdownItem key={i} onClick={() => {this.applyFilter(i)}}>
                    {this.state.filters[i].id}{this.isActive(i) === true ? this.renderCheck() : ""}
                </DropdownItem>
            );
        }

        return(
            items
        );
    }

    renderCheck() {
        return (
            <i>&#x2713;</i>
        );
    }

    applyFilter(filterNumber) {
        const { filters } = Object.assign(this.state);
        filters[filterNumber].active = !filters[filterNumber].active;
        this.setState({filters});
        this.setState({dropDownActive: true});
    }

    isActive(filterNumber) {
        return this.state.filters[filterNumber].active;
    }

    toggleDropdown() {
        this.setState({dropDownOpen: !this.state.dropDownOpen});
    }

    handleChange(event) {
        // Just using validateName(event); right now for event handling.
        // might need to write a different validation method for SQL queries.
        this.setState({valid: validateName(event)});
        this.setState({boxContent: event.target.value});
    }

}