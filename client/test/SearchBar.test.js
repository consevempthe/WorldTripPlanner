import './enzyme.config.js'
import React from 'react'

import SearchBar from "../src/components/Atlas/SearchBar";
import {mount} from 'enzyme';

function testInitialAppState() {

    const search = mount(<SearchBar/>);

    const boxContent = "";
    const valid = "";

    expect(search.state().boxContent).toEqual(boxContent);
    expect(search.state().valid).toEqual(valid);

}

test("Testing initial SearchBar.js state:", testInitialAppState);

function testChangeEvent() {

    const search = mount(<SearchBar/>);
    const input = search.find('Input').at(0);
    input.simulate('change', {target: {value: "Test"}});
    expect(search.state().valid).toEqual('success');
    expect(search.state().boxContent).toEqual('Test');

}

test("Testing SearchBar.js state after change:", testChangeEvent);