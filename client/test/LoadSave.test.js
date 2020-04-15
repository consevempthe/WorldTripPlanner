import './enzyme.config.js';
import './setupJest'
import React from 'react';
import {mount, shallow} from 'enzyme';

import LoadSave from "../src/components/Atlas/LoadSave";

function testState() {
    const state = shallow(<LoadSave/>);

    let expectedState = {
        showLoadFile: false,
        showSaveFile: false,
        validFileName: '',
        fileName: '',
        fileType: ".KML"
    };

    expect(state.state()).toEqual(expectedState);

}

test("testing initial state", testState);

function testRenderLoadSave() {
    const loadSave = mount(<LoadSave/>);

    expect(loadSave.find('UncontrolledDropdown').length).toEqual(1);

    loadSave.find('UncontrolledDropdown').at(0).simulate('click');
    loadSave.find('DropdownItem').at(0).simulate('click');
    loadSave.find('DropdownItem').at(1).simulate('click');

    expect(loadSave.find('ModalHeader').length).toEqual(2);
    expect(loadSave.find('ModalFooter').length).toEqual(2);
    expect(loadSave.find('ModalBody').length).toEqual(2);
    expect(loadSave.find('Form').length).toEqual(2);
    expect(loadSave.find('Button').length).toEqual(5);
    expect(loadSave.find('Input').length).toEqual(4);

}

test("testing render of Load", testRenderLoadSave);

function testModals() {
    const modal = mount(<LoadSave/>);

    modal.find('DropdownItem').at(0).simulate('click');
    expect(modal.state().showLoadFile).toEqual(true);
    expect(modal.find('Button').length).toEqual(3);

    modal.find('DropdownItem').at(1).simulate('click');
    expect(modal.state().showSaveFile).toEqual(true);
    expect(modal.find('[name="radio1"]').length).toEqual(4);

}

test("test the modals", testModals);

function testFunctions() {
    const test = shallow(<LoadSave/>);

    const event = {target: {value: 'nameOfFile'}};

    test.instance().setFileName(event);

    expect(test.state().validFileName).toEqual('success');
    expect(test.state().fileName).toEqual('nameOfFile');

    test.instance().toggleSaveModal();

    expect(test.state().validFileName).toEqual('');

    let kml = test.instance().getFileType();

    expect(kml).toEqual(".KML");


}

test("testing set and get functions", testFunctions);

