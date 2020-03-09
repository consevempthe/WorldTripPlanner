import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme'; //if need 'mount' add it here

import Distance from '../src/components/Atlas/distance'

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

    let actualIsOpen = app.state().isOpen;
    let expectedIsOpen = false;

    let actualToggleOpen = app.state().toggleOpen;
    let expectedToggleOpen = false;

    let actualValidate = app.state().validate;
    let expectedValidate = {
        oneValid: '',
        twoValid: ''
    };

    expect(actualDistance).toEqual(expectedDistance);
    expect(actualIsOpen).toEqual(expectedIsOpen);
    expect(actualToggleOpen).toEqual(expectedToggleOpen);
    expect(actualValidate).toEqual(expectedValidate);
}

test("Testing Distance's initial state", testInitialAppState);