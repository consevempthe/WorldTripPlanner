import './enzyme.config.js';
import React from 'react';
import {mount} from 'enzyme';

import Trip from '../src/components/Atlas/Trip';

function testRender() {
    const trip = mount(<Trip/>);

    expect(trip.find('Table').length).toEqual(1);
    expect(trip.find('Container').length).toEqual(1);
}

test("Testing the render", testRender);
