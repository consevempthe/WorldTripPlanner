import './enzyme.config.js'
import React from 'react'

import {
    getMarkerPosition,
    numberToString,
    validateName,
    createPlace,
    coordinate360
} from '../src/components/Atlas/Resources/HelpfulAPI'

function testVarious() {
    let number = 45.24526;
    let expectedNumber = numberToString(number);
    expect(expectedNumber).toEqual("45.25");

    //-------------------------------------------------

    let event1 = {target: {value: "henry"}};
    let event2 = {target: {value: ""}};

    let testName = validateName(event1);
    let testName2 = validateName(event2);

    expect(testName).toEqual("success");
    expect(testName2).toEqual("failure");

    //--------------------------------------------------

    let position = {lat: 45.566, lng: -105.64};
    let returnPosition = getMarkerPosition(position);
    expect(returnPosition).toEqual('45.57, -105.64');

    //--------------------------------------------------

    let point = {name: "hello", lat: 45.66, lng: -103.564636};
    const expected = {name: "hello", latitude: "45.66", longitude: "-103.564636"};
    expect(createPlace(point)).toEqual(expected);

    //--------------------------------------------------

    let negative = -105;
    let positive = 100;

    expect(coordinate360(negative)).toEqual(255);
    expect(coordinate360(positive)).toEqual(-260);

}

test("testing various functions", testVarious);