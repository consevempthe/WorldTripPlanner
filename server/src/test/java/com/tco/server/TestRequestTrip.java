package com.tco.server;

import com.tco.misc.Optimizations;
import org.junit.Before;
import org.junit.Test;

import com.tco.misc.Place;


import com.tco.misc.Options;

import java.util.Optional;

import static org.junit.Assert.*;

public class TestRequestTrip {
    private RequestTrip test1;
    private RequestTrip test2;
    private RequestTrip test3;
    private RequestTrip test4;
    private RequestTrip test5;  // Some -> no improvements
    private RequestTrip test6;  // Some -> 2Opt

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

        /* Testing for "some" */
        Options testSomeOption = new Options("3959.0");
        testSomeOption.optimization = new Optimizations("1", Optimizations.Improvements.none, Optimizations.Constructions.some);

        Place[] places4 = new Place[5];
        places4[4] = new Place("colorado", "40.0", "-105.4");
        places4[1] = new Place("kansas", "38.55", "-98.041");
        places4[3] = new Place("nevada", "39.63", "-117.42");
        places4[2] = new Place("montana", "47.21", "-110.30");
        places4[0] = new Place("texas", "31.31", "-98.96");

        test4 = new RequestTrip(testSomeOption, places4);

        Place[] places5 = new Place[5];
        places5[0] = new Place("colorado", "40.0", "-105.4");
        places5[1] = new Place("kansas", "38.55", "-98.041");
        places5[2] = new Place("nevada", "39.63", "-117.42");
        places5[3] = new Place("montana", "47.21", "-110.30");
        places5[4] = new Place("texas", "31.31", "-98.96");

        test5 = new RequestTrip(testSomeOption, places5);

        // Testing for "some" - 2opt
        Options test2Opt = new Options("3959.0");
        test2Opt.optimization = new Optimizations("1", Optimizations.Improvements.twoOpt, Optimizations.Constructions.some);
        Place[] places6 = new Place[5];
        places6[0] = new Place("colorado", "40.0", "-105.4");
        places6[1] = new Place("kansas", "38.55", "-98.041");
        places6[2] = new Place("nevada", "39.63", "-117.42");
        places6[3] = new Place("montana", "47.21", "-110.30");
        places6[4] = new Place("texas", "31.31", "-98.96");
        test6 = new RequestTrip(test2Opt, places6);
    }

    @Test
    public void voidTestSomeOption() {
        Place[] ogPlaces = test4.places;
        test4.optimizer();
        Place[] newPlaces = test4.places;
        Long[] distancesTest4 = test4.distances;


        Place[] ogPlaces2 = test5.places;
        test5.optimizer();
        Place[] newPlaces2 = test5.places;
        Long[] distancesTest5 = test5.distances;

        System.out.println(test4.places[0].name + " " + test5.places[0].name);

        assertEquals(test4.roundTripDistance(test4.distances), test5.roundTripDistance(test5.distances));
        assertArrayEquals(test4.places, test5.places);

        assertNotEquals(ogPlaces, newPlaces);
        assertNotEquals(ogPlaces2, newPlaces2);

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
        assertEquals(Long.valueOf(481), totalOG);
        assertEquals(Long.valueOf(449), totalNew);
        assertNotEquals(totalNew, totalOG);

        Long[] originalDistance2 = test1.getTripDistances();

        test1.optimizer();

        assertArrayEquals(originalDistance2, test1.distances);

    }
}
