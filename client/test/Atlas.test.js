import './enzyme.config.js'
import React from 'react'
import {shallow, mount} from 'enzyme'

import Atlas from "../src/components/Atlas/Atlas";
import Distance from "../src/components/Atlas/Distance";

function testInitialAppState() {
    const atlas = shallow(<Atlas/>);

    // test markerPosition
    let actualMarkerPos = atlas.state().markerPositions[0];
    let expectedMarkerPos = undefined;

    expect(actualMarkerPos).toEqual(expectedMarkerPos);

    // test client Location Services
    let actualLocationServices = atlas.state().LocationServiceOn;
    let expectedLocationServices = false;

    expect(actualLocationServices).toEqual(expectedLocationServices);

    // test mapBounds
    let actualMapBounds = atlas.state().mapBounds;
    let expectedMapBounds = null;

    expect(actualMapBounds).toEqual(expectedMapBounds);

    let actualEarthRadius = atlas.state().earthRadius;
    expect(actualEarthRadius).toEqual('3959.0');

    // test otherMarkerPositions & its length
    let actualOtherMarkerPositions = atlas.state().markerPositions;
    let length = actualOtherMarkerPositions.length;
    let expectedOtherMarkerPositions = [];
    let expectedLengthOtherMarkerPositions = 0;

    expect(actualOtherMarkerPositions).toEqual(expectedOtherMarkerPositions);
    expect(length).toEqual(expectedLengthOtherMarkerPositions);
}

test("Testing Atlas' Initial State:", testInitialAppState);

function renderTest() {

    const atlas = mount(<Atlas/>);

    expect(atlas.find('Button').length).toEqual(5);
    expect(atlas.find('Map').length).toEqual(1);
    expect(atlas.find('Distance').length).toEqual(1);
    expect(atlas.find('Trip').length).toEqual(1);


}

test("Testing Atlas' Render:", renderTest);

function testChangeRadius() {
    const radius = mount(<Atlas/>);

    radius.instance().changeEarthRadius('');
    expect(radius.state().earthRadius).toEqual('3959.0');

    radius.instance().changeEarthRadius('6000');
    expect(radius.state().earthRadius).toEqual('6000');

}

test("Testing changing of earth radius", testChangeRadius);

function addMarkerTest() {
    window.prompt = () => {return "hello"};
    const atlas = mount(<Atlas/>);


    // placeholder dummy map click info for addMarker
    const dummyMapClickInfo = {latlng:{lat: 39.49, lng: -104.67}};

    atlas.instance().addMarker(dummyMapClickInfo);

    let predicate = atlas.state().markerPositions !== 0;

    expect(predicate).toEqual(true);

}

test("Testing Atlas' Add Marker:", addMarkerTest);

function testGetMarkerPosition() {

    const atlas = mount(<Atlas/>);
    let positions = [{lat: 54.56148, lng: 98.56484, name: "Marker1"}, {lat: 105.55, lng: 65.54, name: "Marker2"}];
    let Pos1 = atlas.instance().getMarkerPosition(positions[0]);
    expect(Pos1).toEqual("54.56, 98.56");
    let Pos2 = atlas.instance().getMarkerPosition(positions[1]);
    expect(Pos2).toEqual("105.55, 65.54");

}

test("Testing Atlas' Get Marker Position:", testGetMarkerPosition);
