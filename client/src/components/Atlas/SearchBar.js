import React, {Component} from 'react';
import { InputGroup, Table, InputGroupAddon, UncontrolledAlert, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {renderInput, validateName} from "./Resources/HelpfulAPI";
import {isJsonResponseValid, sendServerRequestWithBody} from "../../utils/restfulAPI";
import * as findSchema from "../../../schemas/TIPFindResponseSchema";
import {HTTP_OK} from "../Constants";

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
            ],
            query: [],
            found: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.applyFilter = this.applyFilter.bind(this);

    }

    render() {
        return(
            <div>
                <InputGroup>
                    {/*{this.renderFilterDropdown()}*/}
                    {renderInput("searchBar", this.props.text, this.state.valid, this.handleChange)}
                    <InputGroupAddon addonType="append">
                        <Button disabled={this.state.valid !== 'success'} onClick={ () => this.query()}>Submit</Button>
                    </InputGroupAddon>
                </InputGroup>
                {this.resultsFound()}
                {this.renderResults()}
            </div>
        );
    }

    resultsFound() {
        if(this.state.found !== 0) {
            return(
                <UncontrolledAlert>Results: {this.state.found}</UncontrolledAlert>
            )
        }
    }

    renderResults() {
        if(this.state.query.length > 0) {
            return (
                <Table size={"sm"} responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderBody()}
                    </tbody>
                </Table>
            )
        }
    }

    renderBody() {
        let body = [];
        for (let i = 0; i < this.state.query.length; i++) {
            const name = this.state.query[i].name;
            body.push(
                <tr key={name}>
                    <td>{name}</td>
                </tr>
            )
        }

        return body;
    }

    renderFilterDropdown() {
        if(this.props.filter) {
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
        } else {
            return null;
        }

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

    query() {
        let query = this.createQuery();
        sendServerRequestWithBody('find', query, this.props.serverPort).then(find => {
            this.processFindRequest(find);
        })
    }

    createQuery() {
        return  find = {
            requestType : "find",
            requestVersion : 5,
            match : this.state.boxContent,
            narrow : {type:[], where:"i"},
            limit : 10
        }
    }

    processFindRequest(findResponse) {
        if(!isJsonResponseValid(findResponse.body, findSchema)) {
        } else if(findResponse.statusCode === HTTP_OK) {
            let query_result = JSON.parse(JSON.stringify(findResponse.body));
            this.setState({query: query_result.places, found: query_result.found});
        }
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