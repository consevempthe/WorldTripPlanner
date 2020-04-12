import './enzyme.config.js';
import './setupJest'
import React from 'react';
import {mount} from 'enzyme';

import LoadSave from "../src/components/Atlas/LoadSave";

function testRenderLoad() {
    const loadSave = mount(<LoadSave/>);

    expect(loadSave.find('UncontrolledDropdown').length).toEqual(1);

    loadSave.find('UncontrolledDropdown').at(0).simulate('click');
    loadSave.find('DropdownItem').at(0).simulate('click');
    loadSave.find('DropdownItem').at(1).simulate('click');

    expect(loadSave.find('ModalHeader').length).toEqual(2);
    expect(loadSave.find('ModalFooter').length).toEqual(2);
    expect(loadSave.find('ModalBody').length).toEqual(2);
    expect(loadSave.find('Form').length).toEqual(2);
    expect(loadSave.find('Button').length).toEqual(6);

}

test("testing render of Load", testRenderLoad);

function testModals() {
    const modal = mount(<LoadSave/>);

    let initialOpenState = false;

    expect(modal.state().showLoadFile).toEqual(initialOpenState);
    expect(modal.state().showSaveFile).toEqual(initialOpenState);

    initialOpenState = true;

    modal.instance().toggleSaveModal();

    expect(modal.state().showSaveFile).toEqual(initialOpenState);
    expect(modal.state().fileName).toEqual('');
    expect(modal.state().validFileName).toEqual('');

    modal.instance().toggleLoadModal();

    expect(modal.state().showLoadFile).toEqual(initialOpenState);

}

test("test the modals", testModals);