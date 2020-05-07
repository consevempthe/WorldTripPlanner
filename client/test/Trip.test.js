import './enzyme.config.js';
import './setupJest'
import React from 'react';
import {shallow, mount} from 'enzyme';

import Trip from '../src/components/Atlas/Trip';
import {PROTOCOL_VERSION} from "../src/components/Constants";

const startProperties = {
    deleteMarkerPosition: () => "",
    moveMarkerPosition: () => ""
};

function testRender() {
    const trip = mount(<Trip/>);

    expect(trip.find('Modal').length).toEqual(3);
    expect(trip.find('Button').length).toEqual(3);

}

test("Testing the render", testRender);

function testInitialState() {
    const initial = shallow(<Trip/>);
    const expectedState = {
        requestType: "trip",
        requestVersion: PROTOCOL_VERSION,
        options: {title: "", earthRadius: '3959.0', optimization: {response: '1', construction: 'none', improvement: 'none'}},
        places: [],
        distances: []
    };
    expect(initial.state().trip).toEqual(expectedState);
}

test("Testing the initial state", testInitialState);

function testChangeRadius() {
    const radius = mount(<Trip
        earthRadius={'1001.0'}
    />);

    expect(radius.state().trip.options.earthRadius).toEqual('3959.0');
    radius.instance().changeRadius();
    expect(radius.state().trip.options.earthRadius).toEqual('1001.0');

}

test("Testing changing the earthRadius", testChangeRadius);

function testAddPlace() {
    const add = mount(<Trip/>);

    const place1 = {name: 'fort collins', lat: 40, lng: -105};
    const place2 = {name: 'boulder', lat: 39.23, lng: -104.7};
    const place3 = {name: 'denver', lat: 20, lng: -103.45};

    add.instance().addPlace(place1);
    expect(add.state().trip.places.length).toEqual(1);
    const place1Actual = {name: 'fort collins', latitude: '40', longitude: '-105'};
    expect(add.state().trip.places[0]).toEqual(place1Actual);

    add.instance().addPlace(place2);
    expect(add.state().trip.places.length).toEqual(2);
    const place2Actual = {name: 'boulder', latitude: '39.23', longitude: '-104.7'};
    expect(add.state().trip.places[1]).toEqual(place2Actual);

    add.instance().changeStartPlace(place3);
    expect(add.state().trip.places.length).toEqual(2);
    const place3Actual = {name: 'denver', latitude: '20', longitude: '-103.45'};
    expect(add.state().trip.places[0]).toEqual(place3Actual);
}

test("Testing add place", testAddPlace);

function testAddTitle() {
    const title = mount(<Trip/>);
    title.instance().addTitle('trip');
    expect(title.state().trip.options.title).toEqual('trip');
}

test("Testing add title", testAddTitle);

function testCumulativeDistance() {
    let cumulative = mount(<Trip/>);

    const fakeState = {
        requestType: "trip",
        requestVersion: 3,
        options: {title: "", earthRadius: '3959.0'},
        places: [
            {"id": "kaseda", "name": "Phantom Canyon Brewing Co", "municipality": "Colorado Springs", "latitude": "38.83418", "longitude": "-104.82497", "altitude": "6035"},
            {"id": "lnarmour", "name": "Equinox Brewing", "municipality": "Fort Collins", "latitude": "40.586345", "longitude": "-105.075813", "altitude": "5003"}
        ],
        distances: [30, 40, 50, 60 , 70]
    };

    cumulative.setState({trip: fakeState});

    expect(cumulative.state().trip.distances.length).toEqual(5);
    expect(cumulative.state().trip.places.length).toEqual(2);
    expect(cumulative.find('UncontrolledAlert').length).toEqual(1);
    expect(cumulative.find('Table').length).toEqual(1);
    expect(cumulative.instance().computeCumulativeDistance()).toEqual(250);

}

test("Testing distance and render", testCumulativeDistance);

function testReverseList() {
    const reverse = shallow(<Trip/>);

    const place1 = {name: 'fort collins', lat: 40, lng: -105};
    const place2 = {name: 'boulder', lat: 39.23, lng: -104.7};
    const place3 = {name: 'denver', lat: 20, lng: -103.45};

    reverse.instance().addPlace(place1);
    reverse.instance().addPlace(place2);
    reverse.instance().addPlace(place3);

    const place1Actual = {name: 'fort collins', latitude: '40', longitude: '-105'};

    const place2Actual = {name: 'boulder', latitude: '39.23', longitude: '-104.7'};

    const place3Actual = {name: 'denver', latitude: '20', longitude: '-103.45'};

    reverse.instance().reverseTrip();
    expect(reverse.state().trip.places[0]).toEqual(place3Actual);
    expect(reverse.state().trip.places[1]).toEqual(place2Actual);
    expect(reverse.state().trip.places[2]).toEqual(place1Actual);
}

test("testing list reverse", testReverseList);

function testDeleteItemIndex() {
    const trip = shallow(<Trip
        deleteMarkerPosition={startProperties.deleteMarkerPosition}
    />);

    const place1 = {name: 'fort collins', lat: 40, lng: -105};
    const place2 = {name: 'boulder', lat: 39.23, lng: -104.7};

    trip.instance().addPlace(place1);
    trip.instance().addPlace(place2);
    expect(trip.state().trip.places.length).toEqual(2);

    trip.instance().deleteItem(0);
    expect(trip.state().trip.places.length).toEqual(1);
}

test("Testing Trip's Delete Item", testDeleteItemIndex);

function testChangeStartPlace() {
    const trip = shallow(<Trip/>);

    const place1 = {name: 'Las Vegas', lat: 36.17, lng: -115.14};
    trip.instance().addPlace(place1);

    const place2 = {name: 'Pittsburgh', lat: 40.44, lng: -80.00};
    trip.instance().changeStartPlace(place2,1);

    const expectedName = 'Pittsburgh';
    expect(trip.state().trip.places[0].name).toEqual(expectedName);
}

test("Testing Trip's Change Start Place", testChangeStartPlace);

function testReset() {
    const trip = mount(<Trip/>);
    const place1 = {name: 'fort collins', lat: 40, lng: -105};
    const place2 = {name: 'boulder', lat: 39.23, lng: -104.7};

    trip.instance().addPlace(place1);
    trip.instance().addPlace(place2);

    trip.instance().resetTrip();

    expect(trip.state().trip.places.length).toEqual(0);
    expect(trip.state().trip.distances.length).toEqual(0);
}

test("Testing Trip reset", testReset);

function testMoveArrayItem() {
    const trip = mount(<Trip/>);
    const place1 = {name: 'fort collins', lat: 40, lng: -105};
    const place2 = {name: 'las vegas', lat: 36, lng: -115};
    const place3 = {name: 'daytona beach', lat: 29.21, lng: -81.02};
    let places = [place1, place2, place3];

    trip.instance().moveArrayItem(places, 0, 1);

    expect(places[0].name).toEqual('las vegas');
    expect(places[1].name).toEqual('fort collins');
    expect(places[2].name).toEqual('daytona beach');
}

test("Testing Trip's Move Array Item", testMoveArrayItem);

function testMoveItem() {
    const trip = mount(<Trip
        moveMarkerPosition={startProperties.moveMarkerPosition}
    />);
    const place1 = {name: 'fort collins', lat: 40, lng: -105};
    const place2 = {name: 'las vegas', lat: 36, lng: -115};
    const place3 = {name: 'daytona beach', lat: 29.21, lng: -81.02};

    trip.instance().addPlace(place1);
    trip.instance().addPlace(place2);
    trip.instance().addPlace(place3);
    trip.instance().moveItem("up", 0);

    expect(trip.state().trip.places[0].name).toEqual('las vegas');
    expect(trip.state().trip.places[1].name).toEqual('fort collins');
    expect(trip.state().trip.places[2].name).toEqual('daytona beach');

    trip.instance().moveItem("down", 2);

    expect(trip.state().trip.places[0].name).toEqual('las vegas');
    expect(trip.state().trip.places[1].name).toEqual('daytona beach');
    expect(trip.state().trip.places[2].name).toEqual('fort collins');
}

test("Testing Trip's Move Item", testMoveItem);

function testSetOptimization() {
    let trip = mount(<Trip/>);

    trip.instance().setOptimization(1, 'none', 'none');

    expect(trip.state().trip.options.optimization.response).toEqual('1');
    expect(trip.state().trip.options.optimization.construction).toEqual('none');
    expect(trip.state().trip.options.optimization.improvement).toEqual('none');
}

test("Testing Trip's Set Optimization", testSetOptimization);