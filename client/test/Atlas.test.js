import './enzyme.config.js'
import React from 'react'
import {shallow, mount} from 'enzyme'

import Atlas from "../src/components/Atlas/Atlas";

function testInitialAppState() {
    const atlas = shallow(<Atlas/>);

    // test markerPosition
    let actualMarkerPos = atlas.state().markerPosition;
    let expectedMarkerPos = null;

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
    let actualOtherMarkerPositions = atlas.state().otherMarkerPositions;
    let length = actualOtherMarkerPositions.length;
    let expectedOtherMarkerPositions = [];
    let expectedLengthOtherMarkerPositions = 0;

    expect(actualOtherMarkerPositions).toEqual(expectedOtherMarkerPositions);
    expect(length).toEqual(expectedLengthOtherMarkerPositions);
}

test("Testing Atlas's Initial State", testInitialAppState);
