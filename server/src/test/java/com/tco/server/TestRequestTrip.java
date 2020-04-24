package com.tco.server;

import com.tco.misc.Optimizations;
import org.junit.Before;
import org.junit.Test;

import com.tco.misc.Place;


import com.tco.misc.Options;

import static org.junit.Assert.*;

public class TestRequestTrip {
    private RequestTrip test1;
    private RequestTrip test2;
    private RequestTrip test3;

    @Before
    public void populateTests() {

        Options test1Option = new Options("3959.0");
        test1Option.optimization = new Optimizations("1",
                Optimizations.Improvements.none, Optimizations.Constructions.none);

        Place[] places = new Place[3];
        places[0] = new Place("denver", "39.7", "-105.0");
        places[1] = new Place("boulder", "40.0", "-105.4");
        places[2] = new Place("fort collins", "40.6", "-105.1");


        test1 = new RequestTrip(test1Option, places);

        Options test2Option = new Options("3959.0");
        test2Option.optimization = new Optimizations("1",
                Optimizations.Improvements.none, Optimizations.Constructions.one);

        Place[] places2 = new Place[5];
        places2[0] = new Place("boulder", "40.0", "-105.4");
        places2[1] = new Place("fort collins", "40.6", "-105.1");
        places2[2] = new Place("denver", "39.7", "-105.0");
        places2[3] = new Place("pueblo", "38.3", "-104.6");
        places2[4] = new Place("cheyenne", "41.1", "-104.8");

        test2 = new RequestTrip(test2Option, places2);

        Place[] places3 = new Place[3];
        places3[0] = new Place("fort collins", "40.6", "-105.1");
        places3[1] = new Place("fort collins", "40.6", "-105.1");
        places3[2] = new Place("fort collins", "40.6", "-105.1");

        test3 = new RequestTrip(test1Option, places3);
    }

    @Test
    public void testGetEarthRadius() {
        Double earth = test1.getEarthRadius();
        assertEquals(Double.valueOf(3959.0), earth);
    }

    @Test
    public void testingTrip() {
        //Test the getDistances function --> used to find a normal round trip distance
        Long[] testingTripDistance = test1.getTripDistances();

        assertEquals(3, testingTripDistance.length, 0);
        assertEquals(30, testingTripDistance[0], 0);
        assertEquals(44, testingTripDistance[1], 0);
        assertEquals(62, testingTripDistance[2], 0);

        //Tests the distanceMatrix function
        Long[][] testMatrix = test1.distanceMatrix();

        assertEquals(3, testMatrix.length);
        assertEquals(3, testMatrix[0].length);

        Long[][] testZeroMatrix = test3.distanceMatrix();

        for(int i = 0; i < testMatrix.length; i++) {
            for(int j = 0; j < testMatrix.length; j++) {
                assertEquals(testMatrix[i][j], testMatrix[j][i]);
                assertEquals(testZeroMatrix[i][j], testZeroMatrix[j][i]);
            }
        }

    }

    @Test
    public void testNearestNeighbor() {

        Long[] originalDistance1 = test2.getTripDistances();

        Long totalOG = test2.roundTripDistance(originalDistance1);

        test2.optimizer();

        Long totalNew = test2.roundTripDistance(test2.distances);

        assertNotEquals(totalNew, totalOG);

        Long[] originalDistance2 = test1.getTripDistances();

        test1.optimizer();

        assertArrayEquals(originalDistance2, test1.distances);

    }
}
