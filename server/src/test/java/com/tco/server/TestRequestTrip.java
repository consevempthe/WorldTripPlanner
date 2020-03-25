package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import com.tco.misc.Place;

import java.util.Map;
import java.util.HashMap;

import static org.junit.Assert.assertEquals;

public class TestRequestTrip {
    private RequestTrip test1;

    @Before
    public void populateTests() {
        Map<String, String> test1Option = new HashMap<>();
        test1Option.put("title", "testing");
        test1Option.put("earthRadius", "3959.0");

        Place[] places = new Place[3];
        places[0] = new Place("denver", "39.7", "-105.0");
        places[1] = new Place("boulder", "40.0", "-105.4");
        places[2] = new Place("fort collins", "40.6", "-105.1");

        Long[] distances = new Long[3];

        test1 = new RequestTrip(test1Option, places, distances);
    }

    @Test
    public void testingTrip() {
        Long[] test1Dist = this.test1.getDistances();

        assertEquals(3, test1Dist.length, 0);
        assertEquals(30, test1Dist[0], 0);
        assertEquals(44, test1Dist[1], 0);
        assertEquals(62, test1Dist[2], 0);

    }
}
