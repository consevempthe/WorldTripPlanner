import './enzyme.config.js';
import './setupJest'
import React from 'react';
import {shallow, mount} from 'enzyme';

import LoadSave from "../src/components/Atlas/LoadSave";

function testRender() {
    const loadSave = mount(<LoadSave/>);

    expect(loadSave.find('Button').length).toEqual(1);
    expect(loadSave.find('Modal').length).toEqual(1);

    loadSave.find('Button').at(0).simulate('click');

    expect(loadSave.find('ModalHeader').length).toEqual(1);
    expect(loadSave.find('ModalFooter').length).toEqual(1);
    expect(loadSave.find('ModalBody').length).toEqual(1);
    expect(loadSave.find('Form').length).toEqual(1);
    expect(loadSave.find('Button').length).toEqual(3);

}

test("testing render", testRender);

function testModal() {
    const modal = shallow(<LoadSave/>);

    expect(modal.state().showLoadFile).toEqual(false);

    modal.instance().openModal();

    expect(modal.state().showLoadFile).toEqual(true);

    modal.instance().closeModal();

    expect(modal.state().showLoadFile).toEqual(false);

}

test("test the modal", testModal);