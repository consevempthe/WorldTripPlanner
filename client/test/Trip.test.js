import './enzyme.config.js';
import './setupJest'
import React from 'react';
import {shallow, mount} from 'enzyme';

import Trip from '../src/components/Atlas/Trip';

const startProperties = {
    deleteMarkerPosition: () => ""
};

function testRender() {
    const trip = mount(<Trip/>);

    expect(trip.find('Modal').length).toEqual(2);
    expect(trip.find('Button').length).toEqual(3);

}

test("Testing the render", testRender);

function testInitialState() {
    const initial = shallow(<Trip/>);
    const expectedState = {
        requestType: "trip",
        requestVersion: 3,
        options: {title: "", earthRadius: '3959.0'},
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
    window.prompt = () => { return "trip"};

    title.instance().addTitle();
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

function testDelteItemIndex() {
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

test("Testing Trip's Delete Item", testDelteItemIndex);

function testChangeStartPlace() {
    const trip = shallow(<Trip/>);

    const place1 = {name: 'Las Vegas', lat: 36.17, lng: -115.14};
    trip.instance().addPlace(place1);

    const place2 = {name: 'Pitsburg', lat: 40.44, lng: -80.00};
    trip.instance().changeStartPlace(place2,1);

    const expectedName = 'Pitsburg';
    expect(trip.state().trip.places[0].name).toEqual(expectedName);
}

test("Testing Trip's Change Start Place", testChangeStartPlace);
