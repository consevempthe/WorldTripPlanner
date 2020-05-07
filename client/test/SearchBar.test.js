import './enzyme.config.js'
import React from 'react'

import SearchBar from "../src/components/Atlas/SearchBar";
import {mount, shallow} from 'enzyme';

function testInitialAppState() {

    const search = mount(<SearchBar visible={true} filter={true}/>);

    const boxContent = "";
    const valid = "";
    const filters = [
        {id: "Municipality", active: false},
        {id: "Region", active: false},
        {id: "Country", active: false}
    ];
    const dropDownOpen = false;

    expect(search.state().boxContent).toEqual(boxContent);
    expect(search.state().valid).toEqual(valid);
    expect(search.state().filters).toEqual(filters);
    expect(search.state().dropDownOpen).toEqual(dropDownOpen);

}

test("Testing initial SearchBar.js state:", testInitialAppState);

function testChangeEvent() {

    const search = mount(<SearchBar visible={true} filter={true}/>);
    const input = search.find('Input').at(0);
    input.simulate('change', {target: {value: "Test"}});
    expect(search.state().valid).toEqual('success');
    expect(search.state().boxContent).toEqual('Test');

}

test("Testing SearchBar.js state after change:", testChangeEvent);

function testFilterClick() {

    const search = shallow(<SearchBar visible={true} filter={true}/>);

    search.find('ButtonDropdown').at(0).prop('toggle')();

    expect(search.state().dropDownOpen).toEqual(true);
    expect(search.find('DropdownItem').length).toEqual(3);

    for(let i = 0; i < search.state().filters.length; i++) {
        search.find('DropdownItem').at(i).simulate('click');
        expect(search.state().filters[i].active).toEqual(true);
    }

}

test("Testing SearchBar.js filter button click:", testFilterClick);

function testApplyFilter() {

    const search = mount(<SearchBar visible={true} filter={true}/>);
    search.instance().applyFilter(0);
    expect(search.instance().isActive(0)).toEqual(true);

}

test("Testing SearchBar.js applyFilter method:", testApplyFilter);

function testToggleDropdown() {

    const search = mount(<SearchBar visible={true} filter={true}/>);
    search.instance().toggleDropdown();
    expect(search.state().dropDownOpen).toEqual(true);
    search.instance().toggleDropdown();
    expect(search.state().dropDownOpen).toEqual(false);

}

test("Testing SearchBar.js toggleDropdown function:", testToggleDropdown);
