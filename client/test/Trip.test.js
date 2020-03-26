import './enzyme.config.js';
import React from 'react';
import {mount} from 'enzyme';

import Trip from '../src/components/Atlas/Trip';

function testRender() {
    const trip = mount(<Trip/>);

    expect(trip.find('Table').length).toEqual(1);
    expect(trip.find('Container').length).toEqual(1);
    expect(trip.find('Modal').length).toEqual(1);
}

test("Testing the render", testRender);

function testModal() {
    const modal = mount(<Trip/>);

    expect(modal.state().showLoadFileModal).toEqual(false);
    modal.instance().showLoadFileModal();
    expect(modal.state().showLoadFileModal).toEqual(true);
    modal.instance().hideLoadFileModal();
    expect(modal.state().showLoadFileModal).toEqual(false);

}

test("Testing the Modal",testModal);


