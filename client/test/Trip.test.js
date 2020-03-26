import './enzyme.config.js';
import React from 'react';
import {shallow, mount} from 'enzyme';

import Trip from '../src/components/Atlas/Trip';

function testRender() {
    const trip = mount(<Trip/>);

    expect(trip.find('Table').length).toEqual(1);
    expect(trip.find('Container').length).toEqual(1);
    expect(trip.find('Modal').length).toEqual(1);
    expect(trip.find('Button').length).toEqual(2);

}

test("Testing the render", testRender);

function testInitialState() {
    const initial = shallow(<Trip/>);
    const expectedState = {
        requestType: "trip",
        requestVersion: 3,
        options: {title: "", earthRadius: '3959.0'},
        places: [],
        distances: []
    };

    expect(initial.state().trip).toEqual(expectedState);
    expect(initial.state().cumulativeDistance).toEqual(0);
}

test("Testing the initial state", testInitialState);

function testChangeRadius() {
    const radius = mount(<Trip
        earthRadius={'1001.0'}
    />);

    expect(radius.state().trip.options.earthRadius).toEqual('3959.0');
    radius.instance().changeRadius();
    expect(radius.state().trip.options.earthRadius).toEqual('1001.0');

}

test("Testing changing the earthRadius", testChangeRadius);

function testModal() {
    const modal = mount(<Trip/>);

    expect(modal.state().showLoadFileModal).toEqual(false);
    modal.instance().showLoadFileModal();
    expect(modal.state().showLoadFileModal).toEqual(true);
    modal.instance().hideLoadFileModal();
    expect(modal.state().showLoadFileModal).toEqual(false);

}

test("Testing the Modal",testModal);

function testAddPlace() {
    const add = mount(<Trip/>);

    const place1 = {name: 'fort collins', latitude: '40', longitude: '-105'};
    const place2 = {name: 'boulder', latitude: '39.23', longitude: '-104.7'};

    add.instance().addPlace('fort collins', '40', '-105');
    expect(add.state().trip.places.length).toEqual(1);
    expect(add.state().trip.places[0]).toEqual(place1);

    add.instance().addPlace('boulder', '39.23', '-104.7');
    expect(add.state().trip.places.length).toEqual(2);
    expect(add.state().trip.places[1]).toEqual(place2);
}

test("Testing add place", testAddPlace);