import './enzyme.config.js';
import React from 'react';
import {shallow, mount} from 'enzyme';

const Coordinate = require('coordinate-parser');

import Distance from '../src/components/Atlas/Distance';
import {PROTOCOL_VERSION} from "../src/components/Constants";

const startProperties = {
    changeRadius: () => ""
};

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
        requestVersion: PROTOCOL_VERSION, // This needs to be changed anytime we change version.
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
    expect(app.state().validName).toEqual('');
    expect(app.state().name).toEqual('');

}

test("Testing Distance's initial state", testInitialAppState);

function testSetEarthRadius() {
    const distanceEarth = mount(<Distance
        changeRadius={startProperties.changeRadius}
    />);
    let miles = 3959.0;
    let kilometers = 6371.0;
    let nautical = 3440.0;

    distanceEarth.find('DropdownItem').at(1).simulate('click');

    expect(distanceEarth.state().distance.earthRadius).toEqual(kilometers);

    distanceEarth.find('DropdownItem').at(2).simulate('click');

    expect(distanceEarth.state().distance.earthRadius).toEqual(nautical);

    distanceEarth.find('DropdownItem').at(0).simulate('click');

    expect(distanceEarth.state().distance.earthRadius).toEqual(miles);
}

test("Test setEarthRadius", testSetEarthRadius);

function testAddPlace() {
    const add = mount(<Distance/>);
    const test = new Coordinate("34N 105W");
    add.instance().addPlace("place1", test);

    let expectedPlace1 = {latitude: "34.00", longitude: "-105.00", name:""};
    let actualPlace1 = add.state().distance.place1;
    expect(actualPlace1).toEqual(expectedPlace1);

    const test1 = add.instance().createMarker();
    let coordinate = {lat: 34, lng: -105, name: ""};
    expect(test1).toEqual(coordinate);

    const test2 = new Coordinate("41.1400° N, 104.8202° W");
    add.instance().addPlace("place2", test2);
    let expectedPlace2 = {latitude: "41.14", longitude: "-104.82", name:""};
    let actualPlace2 = add.state().distance.place2;
    expect(actualPlace2).toEqual(expectedPlace2);

    add.instance().addPlace("place1", new Coordinate("41.14 -104.82"));
    const test3 = add.instance().createMarker();
    let coordinate1 = {lat: 41.14, lng: -104.82, name:""};
    expect(test3).toEqual(coordinate1);
}

test("Testing add place function and create marker", testAddPlace);

function testValidate() {
    let event = {target: {name: "place1", value: "34 -105"}};
    const valid = mount(<Distance/>);

    valid.instance().setPlace(event);
    expect(valid.state().validate).toEqual('success');

    let fail = {target: {name: "place1", value: "foobar"}};

    valid.instance().setPlace(fail);
    expect(valid.state().validate).toEqual('failure');

    let expectedPlace = {latitude: '34.00', longitude: '-105.00', name: ''};
    expect(valid.state().distance.place1).toEqual(expectedPlace);
}

test("Testing validate coordinates", testValidate);

function testSetPlaceSetName() {
    const set = mount(<Distance/>);
    let event = {target: {value: "34 -105", name: "place1"}};

    let name = {target:{value: "someName", name: "name1"}};


    set.instance().setName(name);

    expect(set.state().validName).toEqual('success');

    set.instance().setPlace(event);

    let expectPlace1 = {latitude: "34.00", longitude: "-105.00", name:"someName"};
    let actualPlace1 = set.state().distance.place1;
    expect(actualPlace1).toEqual(expectPlace1);

}

test("Testing setPlace and setName", testSetPlaceSetName);
