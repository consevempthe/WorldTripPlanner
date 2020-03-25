import './enzyme.config.js';
import React from 'react';
import {shallow, mount} from 'enzyme';

const Coordinate = require('coordinate-parser');

import Distance from '../src/components/Atlas/distance';

function testRender() {
    const distance = mount(<Distance/>);

    expect(distance.find('Input').length).toEqual(2);
    expect(distance.find('UncontrolledDropdown').length).toEqual(2);
    expect(distance.find('DropdownToggle').length).toEqual(2);
    expect(distance.find('Form').length).toEqual(1);
    expect(distance.find('DropdownItem').length).toEqual(5);
    expect(distance.find('DropdownMenu').length).toEqual(2);
}

test("Testing the render", testRender);

function testInitialAppState() {

    const app = shallow(<Distance />);

    let actualDistance = app.state().distance;
    let expectedDistance = {
        requestType: "distance",
        requestVersion: 3, // This needs to be changed anytime we change version.
        place1: {
            latitude: '',
            longitude: '',
        },
        place2: {
            latitude: '',
            longitude: '',
        },
        earthRadius: 3959.0,
        distance: 0
    };

    let actualValidate = app.state().validate;
    let expectedValidate = '';

    expect(actualDistance).toEqual(expectedDistance);
    expect(actualValidate).toEqual(expectedValidate);
}

test("Testing Distance's initial state", testInitialAppState);

function testSetEarthRadius() {
    const distanceEarth = mount(<Distance/>);
    let kilometers = 6371.0;
    let nautical = 3440.0;

    distanceEarth.instance().setEarthRadius(kilometers);
    let expectedEarthRadiusKM = distanceEarth.state().distance.earthRadius;
    expect(expectedEarthRadiusKM).toEqual(6371.0);

    distanceEarth.instance().setEarthRadius(nautical);
    let expectedEarthRadiusNM = distanceEarth.state().distance.earthRadius;
    expect(expectedEarthRadiusNM).toEqual(3440.0);
}

test("Test setEarthRadius", testSetEarthRadius);

function testAddPlace() {
    const add = mount(<Distance/>);
    const test = new Coordinate("34N 105W");
    add.instance().addPlace("place1", test);

    let expectedPlace1 = {latitude: "34.00", longitude: "-105.00"};
    let actualPlace1 = add.state().distance.place1;
    expect(actualPlace1).toEqual(expectedPlace1);

    const test1 = add.instance().createMarker("place1");
    let coordinate = {lat: 34, lng: -105};
    expect(test1).toEqual(coordinate);

    const test2 = new Coordinate("41.1400° N, 104.8202° W");
    add.instance().addPlace("place2", test2);
    let expectedPlace2 = {latitude: "41.14", longitude: "-104.82"};
    let actualPlace2 = add.state().distance.place2;
    expect(actualPlace2).toEqual(expectedPlace2);

    const test3 = add.instance().createMarker(("place2"));
    let coordinate1 = {lat: 41.14, lng: -104.82};
    expect(test3).toEqual(coordinate1);
}

test("Testing add place function and create marker", testAddPlace);

function testValidate() {
    let event = {target: {value: "34 -105"}};
    const valid = mount(<Distance/>);

    let bool = valid.instance().validateCoordinate(event);
    expect(bool).toEqual(true);
    let validate = valid.state().validate;
    expect(validate).toEqual('success');

    let badEvent = {target: {value: "foobar"}};
    let bool1 = valid.instance().validateCoordinate(badEvent);
    expect(bool1).toEqual(false);
    let validateF = valid.state().validate;
    expect(validateF).toEqual('failure');
}

test("Testing validate coordinates", testValidate);

function testSetPlace() {
    const setPlace = mount(<Distance/>);
    let event = {target: {value: "34 -105", name: "place1"}};

    setPlace.instance().setPlace(event);
    let expectPlace1 = {latitude: "34.00", longitude: "-105.00"};
    let actualPlace1 = setPlace.state().distance.place1;
    expect(actualPlace1).toEqual(expectPlace1);

    let event1 = {target: {value: "feel awful", name: "place2"}};
    setPlace.instance().setPlace(event1);
    let expectPlace2 = {latitude: '', longitude: ''};
    let actualPlace2 = setPlace.state().distance.place2;
    expect(actualPlace2).toEqual(expectPlace2);
}

test("Testing set place", testSetPlace);