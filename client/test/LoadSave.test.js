import './enzyme.config.js';
import './setupJest'
import React from 'react';
import {mount, shallow} from 'enzyme';

import LoadSave from "../src/components/Atlas/LoadSave";

function testState() {
    const state = shallow(<LoadSave/>);

    let expectedState = {
        showLoadFile: false,
        showSaveFile: false,
        validFileName: '',
        fileName: '',
        fileType: ".KML"
    };

    expect(state.state()).toEqual(expectedState);

}

test("testing initial state", testState);

function testRenderLoadSave() {
    const loadSave = mount(<LoadSave/>);

    expect(loadSave.find('UncontrolledDropdown').length).toEqual(1);

    loadSave.find('UncontrolledDropdown').at(0).simulate('click');
    loadSave.find('DropdownItem').at(0).simulate('click');
    loadSave.find('DropdownItem').at(1).simulate('click');

    expect(loadSave.find('ModalHeader').length).toEqual(2);
    expect(loadSave.find('ModalFooter').length).toEqual(2);
    expect(loadSave.find('ModalBody').length).toEqual(2);
    expect(loadSave.find('Form').length).toEqual(2);
    expect(loadSave.find('Button').length).toEqual(5);
    expect(loadSave.find('Input').length).toEqual(4);

}

test("testing render of Load", testRenderLoadSave);

function testModals() {
    const modal = mount(<LoadSave/>);

    modal.find('DropdownItem').at(0).simulate('click');
    expect(modal.state().showLoadFile).toEqual(true);
    expect(modal.find('Button').length).toEqual(3);

    modal.find('DropdownItem').at(1).simulate('click');
    expect(modal.state().showSaveFile).toEqual(true);
    expect(modal.find('[name="radio1"]').length).toEqual(4);

}

test("test the modals", testModals);

function testFunctions() {
    const test = shallow(<LoadSave/>);

    const event = {target: {value: 'nameOfFile'}};

    test.instance().setFileName(event);

    expect(test.state().validFileName).toEqual('success');
    expect(test.state().fileName).toEqual('nameOfFile');

    test.instance().toggleSaveModal();

    expect(test.state().validFileName).toEqual('');

    let kml = test.instance().getFileType();

    expect(kml).toEqual(".KML");

    let dummyPlaces = [{latitude: 34.23, longitude: 54.66, name:"pt1"}, {latitude: 64.32, longitude: 67.88, name: "pt2"}];
    let output = test.instance().buildKML(dummyPlaces);
    expect(output).toEqual("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<kml xmlns=\"http://www.opengis.net/kml/2.2\" xmlns:gx=\"http://www.google.com/kml/ext/2.2\" xmlns:kml=\"http://www.opengis.net/kml/2.2\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n" +
        "  <Document>\n" +
        "    <name>Single Simple Line</name>\n" +
        "    <open>1</open>\n" +
        "    <description>Just a single blue line across Colorado</description>\n" +
        "    <Style id=\"CrossStyle\">\n" +
        "      <LineStyle>\n" +
        "        <color>ffffffb6</color>\n" +
        "        <width>4</width>\n" +
        "      </LineStyle>\n" +
        "    </Style>\n" +
        "<Placemark><name>Cross-corner line</name><styleUrl>#CrossStyle</styleUrl><LineString><coordinates>54.66,34.23,0\n" +
        "67.88,64.32,0\n" +
        "</coordinates></LineString></Placemark>    </Document>\n" +
        "</kml>");

    let arr = test.instance().buildPlaceMarks(dummyPlaces);
    expect(arr.toString()).toEqual("<Placemark><name>Cross-corner line</name><styleUrl>#CrossStyle</styleUrl><LineString><coordinates>54.66,34.23,0\n" +
        "67.88,64.32,0\n" +
        "</coordinates></LineString></Placemark>");

    let radioSelector = 0;
    test.instance().handleChange(radioSelector);
    expect(test.state().fileType).toEqual(".KML");
    radioSelector = 1;
    test.instance().handleChange(radioSelector);
    expect(test.state().fileType).toEqual(".JSON");

}

test("Performing LoadSave.js Functional tests", testFunctions);

