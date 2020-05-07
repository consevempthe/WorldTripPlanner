import './enzyme.config.js'
import React from 'react'
import {shallow, mount} from 'enzyme'

import Atlas from "../src/components/Atlas/Atlas";
import Distance from "../src/components/Atlas/Distance";
import {getMarkerPosition} from "../src/components/Atlas/Resources/HelpfulAPI";

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

    expect(atlas.find('Modal').length).toEqual(4);
    expect(atlas.find('Button').length).toEqual(6);
    expect(atlas.find('Map').length).toEqual(1);
    expect(atlas.find('Distance').length).toEqual(1);
    expect(atlas.find('Trip').length).toEqual(1);

}

test("Testing Atlas' Render:", renderTest);

function testRenderOtherMarkers() {
    const atlas = mount(<Atlas/>);

    let place1 = {name: "Las Vegas", lat: 36.17, lng: -115.14};
    let place2 = {name: "Daytona Beach", lat: 29.21, lng: -81.02};
    let place3 = {name: "Cancun", lat: 21.16, lng: -86.85};
    let places = [place1, place2, place3];

    let expectedMarkerPositionsSize = atlas.instance().renderOtherMarkers(places).length;
    expect(expectedMarkerPositionsSize).toEqual(3);
}

test("Testing Atlas' Render Other Marker Positions", testRenderOtherMarkers);

function testChangeRadius() {
    const radius = mount(<Atlas/>);

    radius.instance().changeEarthRadius('');
    expect(radius.state().earthRadius).toEqual('3959.0');

    radius.instance().changeEarthRadius('6000');
    expect(radius.state().earthRadius).toEqual('6000');

}

test("Testing changing of earth radius", testChangeRadius);

function addMarkerTestHelper(UserInput) {
    if(UserInput === null) {
        window.confirm = jest.fn(() => false); // if user input is null then simulate cancel button
    } else {
        window.prompt = () => {return UserInput}; // otherwise simulate a user text input
    }
    const atlas = mount(<Atlas/>);

    atlas.setState({markerPositions: [{name: "test", lat: 55.68, lng: 86.98}]});


    // placeholder dummy map click info for addMarker
    const dummyMapClickInfo = {latlng:{lat: 39.49, lng: -104.67}};

    atlas.instance().addMarker(dummyMapClickInfo);

    let predicateNullOrEmpty = atlas.state().markerPositions.length === 1;
    let predicateValid = atlas.state().markerPositions.length === 2;

    if(UserInput !== null) {
        if (UserInput.length === 0) {
            expect(predicateNullOrEmpty).toEqual(true);
            expect(predicateValid).toEqual(false);
        }
        else if(UserInput.length !== 0) {
            expect(predicateValid).toEqual(true);
            expect(predicateNullOrEmpty).toEqual(false);
        }
    } else {
        expect(predicateNullOrEmpty).toEqual(true);
        expect(predicateValid).toEqual(false);
    }

}

function addMarkerTest() {
    addMarkerTestHelper("hello"); // simulate valid name entry
    addMarkerTestHelper(""); // simulate no name entry
    addMarkerTestHelper(null);
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

    let positions = [{lat: 54.56148, lng: 98.56484, name: "Marker1"}, {lat: 105.55, lng: 65.54, name: "Marker2"}];
    let Pos1 = getMarkerPosition(positions[0]);
    expect(Pos1).toEqual("54.56, 98.56");
    let Pos2 = getMarkerPosition(positions[1]);
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
    const markerPosition1 = {latlng: {lat: 36.17, lng: -115.14}};

    atlas.instance().addMarker(markerPosition1);
    let actualMarkerPositionSize = atlas.state().markerPositions.length;
    expect(actualMarkerPositionSize).toEqual(1);

    atlas.instance().deleteMarkerPosition(0);
    actualMarkerPositionSize = atlas.state().markerPositions.length;
    expect(actualMarkerPositionSize).toEqual(0);
}

test("Testing Atlas' Delete Marker Position:", testDeleteMarkerPosition);

function testChangeOrigin() {
    const atlas = mount(<Atlas/>);

    let place1 = {name: "Las Vegas", lat: 36.17, lng: -115.14};
    let place2 = {name: "Daytona Beach", lat: 29.21, lng: -81.02};
    let place3 = {name: "Cancun", lat: 21.16, lng: -86.85};

    atlas.instance().addPlaceToArray(place1);
    atlas.instance().addPlaceToArray(place2);
    atlas.instance().changeOrigin(place3);

    expect(atlas.state().markerPositions[0]).toEqual(place3);
}

test("Testing Atlas' Change Origin", testChangeOrigin);

function testUpdateMarkerPositionsArray() {
    const atlas = mount(<Atlas/>);

    let place1 = {name: "Las Vegas", lat: 36.17, lng: -115.14};
    let place2 = {name: "Daytona Beach", lat: 29.21, lng: -81.02};
    let place3 = {name: "Cancun", lat: 21.16, lng: -86.85};

    atlas.instance().addPlaceToArray(place1);
    atlas.instance().addPlaceToArray(place2);
    atlas.instance().addPlaceToArray(place3);

    const positions = atlas.state().markerPositions;
    atlas.instance().updateMarkerPositionsArray(positions,0,1);

    expect(atlas.state().markerPositions[0].name).toEqual("Daytona Beach");
    expect(atlas.state().markerPositions[1].name).toEqual("Las Vegas");
    expect(atlas.state().markerPositions[2].name).toEqual("Cancun");
}

test("Testing Atlas' Update Marker Positions Array", testUpdateMarkerPositionsArray);

function testMoveMarkerPosition() {
    const atlas = mount(<Atlas/>);

    let place1 = {name: "Las Vegas", lat: 36.17, lng: -115.14};
    let place2 = {name: "Daytona Beach", lat: 29.21, lng: -81.02};
    let place3 = {name: "Cancun", lat: 21.16, lng: -86.85};

    atlas.instance().addPlaceToArray(place1);
    atlas.instance().addPlaceToArray(place2);
    atlas.instance().addPlaceToArray(place3);

    atlas.instance().moveMarkerPosition("up",0);

    expect(atlas.state().markerPositions[0].name).toEqual("Daytona Beach");
    expect(atlas.state().markerPositions[1].name).toEqual("Las Vegas");
    expect(atlas.state().markerPositions[2].name).toEqual("Cancun");

    atlas.instance().moveMarkerPosition("down", 2);

    expect(atlas.state().markerPositions[0].name).toEqual("Daytona Beach");
    expect(atlas.state().markerPositions[1].name).toEqual("Cancun");
    expect(atlas.state().markerPositions[2].name).toEqual("Las Vegas");
}

test("Testing Atlas' Move Marker Position", testMoveMarkerPosition);