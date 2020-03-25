import './enzyme.config.js'
import React from 'react'
import {shallow, mount} from 'enzyme'

import Atlas from "../src/components/Atlas/Atlas";

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

    // test otherMarkerPositions & its length
    let actualOtherMarkerPositions = atlas.state().markerPositions;
    let length = actualOtherMarkerPositions.length;
    let expectedOtherMarkerPositions = [];
    let expectedLengthOtherMarkerPositions = 0;

    expect(actualOtherMarkerPositions).toEqual(expectedOtherMarkerPositions);
    expect(length).toEqual(expectedLengthOtherMarkerPositions);
}

function renderTest() {

    const atlas = mount(<Atlas/>);

    expect(atlas.find('Button').length).toEqual(3);
    expect(atlas.find('Map').length).toEqual(1);
    expect(atlas.find('Distance').length).toEqual(1);
    expect(atlas.find('Trip').length).toEqual(1);


}

function addMarkerTest() {

    const atlas = mount(<Atlas/>);

    // placeholder dummy map click info for addMarker
    const dummyMapClickInfo = {latlng:{lat: 39.49, lng: -104.67}};

    atlas.instance().addMarker(dummyMapClickInfo);

    let predicate = atlas.state().markerPositions !== 0;

    expect(predicate).toEqual(true);


}

test("Testing Atlas' Initial State:", testInitialAppState);
test("Testing Atlas' Render:", renderTest);
test("Testing Atlas' Add Marker:", addMarkerTest);
