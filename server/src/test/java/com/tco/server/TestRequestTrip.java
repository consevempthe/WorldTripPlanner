package com.tco.server;

import com.tco.misc.Optimizations;
import org.junit.Before;
import org.junit.Test;

import com.tco.misc.Place;


import static org.junit.Assert.assertEquals;

import com.tco.misc.Options;

public class TestRequestTrip {
    private RequestTrip test1;

    @Before
    public void populateTests() {

        Options test1Option = new Options("3959.0");
        test1Option.optimization = new Optimizations("1",
                Optimizations.Improvements.none, Optimizations.Constructions.one);

        Place[] places = new Place[3];
        places[0] = new Place("denver", "39.7", "-105.0");
        places[1] = new Place("boulder", "40.0", "-105.4");
        places[2] = new Place("fort collins", "40.6", "-105.1");

        Long[] distances = new Long[3];

        test1 = new RequestTrip(test1Option, places, distances);
    }

    @Test
    public void testingTrip() {
        //Test the getDistances function --> used to find a normal round trip distance
        Long[] test1Dist = test1.getDistances();

        assertEquals(3, test1Dist.length, 0);
        assertEquals(30, test1Dist[0], 0);
        assertEquals(44, test1Dist[1], 0);
        assertEquals(62, test1Dist[2], 0);

        //Tests the distanceMatrix function
        Long[][] testMatrix = test1.distanceMatrix();

        assertEquals(3, testMatrix.length);
        assertEquals(3, testMatrix[0].length);

        assertEquals(0, testMatrix[0][0], 0);
        assertEquals(0, testMatrix[1][1], 0);
        assertEquals(0, testMatrix[2][2], 0);
        assertEquals(30, testMatrix[0][1], 0);
        assertEquals(62, testMatrix[0][2], 0);
        assertEquals(30, testMatrix[1][0], 0);
        assertEquals(44, testMatrix[1][2], 0);
        assertEquals(62, testMatrix[2][0], 0);
        assertEquals(44, testMatrix[2][1], 0);

        Integer[] tourIndex = test1.createTourIndexes();
        assertEquals(tourIndex.length, 3);

    }
}
