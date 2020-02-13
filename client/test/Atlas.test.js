import './enzyme.config.js';
import React from 'react';
import {shallow} from 'enzyme';

import Atlas from '../src/components/Atlas/Atlas';

function testInitialAppState() {

  const app = shallow(<Atlas />);

  let actualMarkerPosition = app.state().markerPosition;

  let expectedMarkerPosition = null;

  expect(actualMarkerPosition).toEqual(expectedMarkerPosition);
}
test("Testing Atlas's Initial State", testInitialAppState);