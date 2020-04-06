import './enzyme.config.js';
import './setupJest'
import React from 'react';
import {shallow, mount} from 'enzyme';

import Trip from '../src/components/Atlas/Trip';

function testRender() {
    const trip = mount(<Trip/>);

    expect(trip.find('Modal').length).toEqual(1);
    expect(trip.find('Button').length).toEqual(3);

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
    expect(initial.state().showLoadFileModal).toEqual(false);
    expect(initial.state().trip).toEqual(expectedState);
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
    const place3 = {name: 'denver', latitude: '20', longitude: '-103.45'};

    add.instance().addPlace('fort collins', '40', '-105');
    expect(add.state().trip.places.length).toEqual(1);
    expect(add.state().trip.places[0]).toEqual(place1);

    add.instance().addPlace('boulder', '39.23', '-104.7');
    expect(add.state().trip.places.length).toEqual(2);
    expect(add.state().trip.places[1]).toEqual(place2);

    add.instance().changeStartPlace('denver', '20', '-103.45');
    expect(add.state().trip.places.length).toEqual(2);
    expect(add.state().trip.places[0]).toEqual(place3);
}

test("Testing add place", testAddPlace);

function testAddTitle() {
    const title = mount(<Trip/>);
    window.prompt = () => { return "trip"};

    title.instance().addTitle();
    expect(title.state().trip.options.title).toEqual('trip');
}

test("Testing add title", testAddTitle);

function testCumulativeDistance() {
    let cumulative = mount(<Trip/>);

    const fakeState = {
        requestType: "trip",
        requestVersion: 3,
        options: {title: "", earthRadius: '3959.0'},
        places: [
            {"id": "kaseda", "name": "Phantom Canyon Brewing Co", "municipality": "Colorado Springs", "latitude": "38.83418", "longitude": "-104.82497", "altitude": "6035"},
            {"id": "lnarmour", "name": "Equinox Brewing", "municipality": "Fort Collins", "latitude": "40.586345", "longitude": "-105.075813", "altitude": "5003"}
        ],
        distances: [30, 40, 50, 60 , 70]
    };

    cumulative.setState({trip: fakeState});

    expect(cumulative.state().trip.distances.length).toEqual(5);
    expect(cumulative.state().trip.places.length).toEqual(2);
    expect(cumulative.find('UncontrolledAlert').length).toEqual(1);
    expect(cumulative.find('Table').length).toEqual(1);

    expect(cumulative.instance().computeCumulativeDistance()).toEqual(250);

}

test("Testing distance and render", testCumulativeDistance);
