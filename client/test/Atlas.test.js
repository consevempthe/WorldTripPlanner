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

    expect(atlas.find('Modal').length).toEqual(2);
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


function testAddNewStart() {
    const testNewStart = mount(<Atlas
    />);
    let add1 = {name: 'hello', lat: '42.40', lng: '40.34'};
    let expectedAdd1 = {name: 'hello', lat: 42.40, lng: 40.34};

    testNewStart.instance().addNewStart(add1);
    expect(testNewStart.state().markerPositions.length).toEqual(1);
    expect(testNewStart.state().markerPositions[0]).toEqual(expectedAdd1);

}

test("Testing adding a new start", testAddNewStart);

function testGetMarkerPosition() {

    const atlas = mount(<Atlas/>);
    let positions = [{lat: 54.56148, lng: 98.56484, name: "Marker1"}, {lat: 105.55, lng: 65.54, name: "Marker2"}];
    let Pos1 = atlas.instance().getMarkerPosition(positions[0]);
    expect(Pos1).toEqual("54.56, 98.56");
    let Pos2 = atlas.instance().getMarkerPosition(positions[1]);
    expect(Pos2).toEqual("105.55, 65.54");

}

test("Testing Atlas' Get Marker Position:", testGetMarkerPosition);

function testLoadTripFromFileUpload() {

    const atlas = mount(<Atlas/>);

    expect(atlas.state().markerPositions.length).toEqual(0);

    let dummyJSON =[
        {
            "id": "rwahlst",
            "name": "Belching Beaver Brewery - Ocean Beach",
            "municipality": "San Diego",
            "state": "California",
            "latitude": "32.745",
            "longitude": "-117.248",
            "altitude": "115"
        }
    ];

    atlas.instance().addPlacesFromFileUpload(dummyJSON);

    expect(atlas.state().markerPositions.length).toEqual(1);


}
test("Testing Atlas' Load Trip from File Upload:", testLoadTripFromFileUpload);

function testSetMapBounds() {

    window.prompt = () => { return "Location"; };

    const atlas = mount(<Atlas/>);

    expect(atlas.state().mapBounds).toEqual(null);

    const dummyMapClickInfo = {latlng:{lat: 39.49, lng: -104.67}};
    atlas.instance().addMarker(dummyMapClickInfo); // adding a marker in effect, sets map bounds

    expect(atlas.state().mapBounds).toEqual(
        {"_northEast": {"lat": 39.49, "lng": -104.67}, "_southWest": {"lat": 39.49, "lng": -104.67}}
        );


}

test("Testing Atlas' Set Map Bounds:", testSetMapBounds);

function testDeleteMarkerPosition() {
    window.prompt = () => {return "Las Vegas"};
    const atlas = mount(<Atlas/>);
    const markerPosition1 = {latlng: {lat: 36.17, lng: -115.14}}
    atlas.instance().addMarker(markerPosition1);
    let actualMarkerPositionSize = atlas.state().markerPositions.length;
    expect(actualMarkerPositionSize).toEqual(1);
    atlas.instance().deleteMarkerPosition(0);
    actualMarkerPositionSize = atlas.state().markerPositions.length;
    expect(actualMarkerPositionSize).toEqual(0);
}

test("Testing Atlas' Delete Marker Position:", testDeleteMarkerPosition);

