import './enzyme.config';
import './setupJest';
import React from 'react';
import {shallow, mount} from 'enzyme';
import CreateTripModal from '../src/components/Atlas/CreateTripModal';

function testInitalState() {
    const initial = shallow(<CreateTripModal/>);
    let showModal = false;
    let title = "";
    let optLevel = 0;
    expect(initial.state().showModal).toEqual(showModal);
    expect(initial.state().title).toEqual(title);
    expect(initial.state().optLevel).toEqual(optLevel);
}

test("Testing Create Trip Modal's Initial State", testInitalState);

function testRender() {
    const createTripModal = mount(<CreateTripModal/>);
    expect(createTripModal.find('Modal').length).toEqual(1);
    expect(createTripModal.find(''))
}

test("Testing Create Trip Modal's render", testRender);

function testUpdateTitle() {
    const createTripModal = mount(<CreateTripModal/>);
    createTripModal.instance().updateTitle("test");
    expect(createTripModal.state().title).toEqual("test");
}

test("Testing Create Trip Modal's Update Title", testUpdateTitle);

function testUpdateOptimizeLevel() {
    const createTripModal = mount(<CreateTripModal/>);
    createTripModal.instance().updateOptimizeLevel(4);
    expect(createTripModal.state().optLevel).toEqual(4);
}

test("Testing Create Trip Modal's Update Optimize Level", testUpdateOptimizeLevel);