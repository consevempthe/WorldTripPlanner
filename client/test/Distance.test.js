import './enzyme.config.js';
import React from 'react';
import {shallow, mount} from 'enzyme';

const Coordinate = require('coordinate-parser');

import Distance from '../src/components/Atlas/distance';

function testRender() {
    const distance = mount(<Distance/>);

    expect(distance.find('Input').length).toEqual(1);
    expect(distance.find('InputGroupButtonDropdown').length).toEqual(2);
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
        requestVersion: 3,
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
    let expectedValidate = {
        oneValid: '',
        twoValid: ''
    };

    let expectedToggle = [false, false];

    let openInitial = app.state().isOpen;
    let toggleInitial = app.state().toggleOpen;
    expect(openInitial).toEqual(expectedToggle);
    expect(toggleInitial).toEqual(expectedToggle);
    expect(actualDistance).toEqual(expectedDistance);
    expect(actualValidate).toEqual(expectedValidate);
}

test("Testing Distance's initial state", testInitialAppState);

function testToggleDropdownFunction() {
    const app = mount(<Distance/>);
    app.instance().toggleDropdown(0);

    let isOpenOneToggle = app.state().isOpen;
    let toggleOne = app.state().toggleOpen;
    expect(isOpenOneToggle).toEqual([true, false]);
    expect(toggleOne).toEqual([true, false]);

    app.instance().toggleDropdown(0);

    let openTwo = app.state().isOpen;
    let toggleTwo = app.state().toggleOpen;
    expect(openTwo).toEqual([false, false]);
    expect(toggleTwo).toEqual([false, false]);

}

test("Testing Toggle Dropdown function", testToggleDropdownFunction);

function testSetEarthRadius() {
    const distanceEarth = mount(<Distance/>);
    let kilometers = 6371.0;
    let nautical = 3440.0;

    distanceEarth.instance().setEarthRadius(kilometers);
    let expectedEarthRadiusKM = distanceEarth.state().distance.earthRadius;
    expect(expectedEarthRadiusKM).toEqual(6371.0);

    distanceEarth.instance().setEarthRadius(nautical);
    let expectedEarthRadiusNM = distanceEarth.state().distance.earthRadius;
    expect(expectedEarthRadiusNM).toEqual(3440.0)

}

test("Test setEarthRadius", testSetEarthRadius);

function testAddPlace() {
    const add = mount(<Distance/>);
    const test = new Coordinate("34N 105W");
    add.instance().addPlace("place1", test);

    let actualLat = add.state().distance.place1.latitude;
    let actualLng = add.state().distance.place1.longitude;
    expect(actualLat).toEqual("34");
    expect(actualLng).toEqual("-105");

    const test1 = add.instance().createMarker("place1");
    let coordinate = {lat: 34, lng: -105};
    expect(test1).toEqual(coordinate);
}

test("Testing add place function and create marker", testAddPlace);