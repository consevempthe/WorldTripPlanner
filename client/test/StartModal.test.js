import './enzyme.config.js'
import React from 'react'
import {shallow, mount} from 'enzyme'

import StartModal from "../src/components/Atlas/StartModal";

function testInitialState() {
    const initial = shallow(<StartModal/>);
    let expectedState = {name: '', latitude: '', longitude: ''};
    expect(initial.state().newStart).toEqual(expectedState);
    expect(initial.state().validName).toEqual('');
    expect(initial.state().validCoordinate).toEqual('');
}

test("test the initial state", testInitialState);

function testValidateSuccess() {
    const validate = mount(<StartModal
        newStart={() => {return 0}}
    />);

    let addName1 = {target: {value: "hello"}};
    validate.instance().newStartName(addName1);
    expect(validate.state().validName).toEqual('success');
    expect(validate.state().newStart.name).toEqual('hello');

    let addCoordinate1 = {target: {value: '40.0150° N, 105.2705° W'}};
    validate.instance().setCoordinate(addCoordinate1);
    expect(validate.state().validCoordinate).toEqual('success');
    expect(validate.state().newStart.latitude).toEqual('40.02');
    expect(validate.state().newStart.longitude).toEqual('-105.27');

    validate.instance().newStartPlace();

    expect(validate.state().validName).toEqual('');
    expect(validate.state().validCoordinate).toEqual('');
}

test("testing the validate function for success", testValidateSuccess);

function testValidateFailure() {
    const validate = shallow(<StartModal/>);

    let addNameBad = {target: {value: ''}};
    validate.instance().newStartName(addNameBad);
    expect(validate.state().validName).toEqual('failure');

    let badCoordinate1 = {target: {value: 'this is not a coordinate'}};
    validate.instance().setCoordinate(badCoordinate1);
    expect(validate.state().validCoordinate).toEqual('failure');
}

test("testing the validate function for failure", testValidateFailure);