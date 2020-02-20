import './enzyme.config.js';
import React from 'react';
import {shallow, mount} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';

function testInitialAppState() {

  const app = shallow(<Atlas />);

  let actualMarkerPosition = app.state().markerPosition;

  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
}

function testIsValidPosition() {
  let validPosition = "40.48, -105.8";
  let invalidPosition = "foo bar";

  const validate = mount(<Atlas />);
  let validResult = validate.instance().isValidPosition(validPosition);

  expect(validResult).toEqual(true);

  let invalidResult = validate.instance().isValidPosition(invalidPosition);

  expect(invalidResult).toEqual(false);
}

test("Testing Atlas's Initial State", testInitialAppState);
test("Testing Atlas's IsValidPosition function", testIsValidPosition);