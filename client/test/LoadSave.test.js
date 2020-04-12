import './enzyme.config.js';
import './setupJest'
import React from 'react';
import {mount} from 'enzyme';

import LoadSave from "../src/components/Atlas/LoadSave";

function testRender() {
    const loadSave = mount(<LoadSave/>);

    expect(loadSave.find('Button').length).toEqual(1);
    expect(loadSave.find('Modal').length).toEqual(2);

    loadSave.find('Button').at(0).simulate('click');

    expect(loadSave.find('ModalHeader').length).toEqual(1);
    expect(loadSave.find('ModalFooter').length).toEqual(1);
    expect(loadSave.find('ModalBody').length).toEqual(1);
    expect(loadSave.find('Form').length).toEqual(1);
    expect(loadSave.find('Button').length).toEqual(3);

}

test("testing render", testRender);

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