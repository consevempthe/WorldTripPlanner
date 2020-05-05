package com.tco.server;

import com.tco.misc.Optimizations;

import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.*;


public class TestOptimizations {
    private Optimizations findClosest;
    private Optimizations unvisited;
    private Optimizations reverse;

    @Before
    public void createObjects() {
        unvisited = new Optimizations("1",
                Optimizations.Improvements.none, Optimizations.Constructions.none);

        findClosest = new Optimizations("1",
                Optimizations.Improvements.none, Optimizations.Constructions.none);

        reverse = new Optimizations("1", Optimizations.Improvements.twoOpt, Optimizations.Constructions.some);
    }

    @Test
    public void testUnvisitedCities() {
        boolean[] allTrue = new boolean[5];
        Arrays.fill(allTrue, true);

        boolean testAllTrue = unvisited.unvisitedCitiesRemain(allTrue);
        assertFalse(testAllTrue);

        boolean[] allFalse = new boolean[5];

        boolean testAllFalse = unvisited.unvisitedCitiesRemain(allFalse);
        assertTrue(testAllFalse);

        boolean[] oneFalse = new boolean[5];

        for(int i = 0; i < oneFalse.length; i++) {
            if(i != 2) {
                oneFalse[i] = true;
            }
        }

        boolean testOneFalse = unvisited.unvisitedCitiesRemain(oneFalse);
        assertTrue(testOneFalse);

        boolean[] oneTrue = new boolean[5];
        oneFalse[4] = true;

        boolean testOneTrue = unvisited.unvisitedCitiesRemain(oneTrue);
        assertTrue(testOneTrue);
    }

    @Test
    public void testFindClosest() {
        Long[] cities = new Long[5];

        cities[0] = 0L;
        cities[1] = 24L;
        cities[2] = 67L;
        cities[3] = 19L;
        cities[4] = 55L;

        boolean[] visited = new boolean[5];

        visited[0] = true;

        Integer nearest = findClosest.findClosestDestination(cities, visited);

        assertEquals(Integer.valueOf(3), nearest);
    }

    /*
    2optReverse(route, i1, k) { // reverse in place
      while(i1 < k) {
        temp = route[i1]
        route[i1] = route[k]
        route[k] = temp
        i1++; k--
      }
    }
    */
    @Test
    public void testTwoOptReverse() {
        Integer[] routeTest = new Integer[3];
        routeTest[0] = 23;
        routeTest[1] = 15;
        routeTest[2] = 3;
        reverse.twoOptReverse(routeTest, 0, 2); // Expected: rT[0] = 3, rT[1] = 15, rT[2] = 23
        assertEquals(routeTest[0], Integer.valueOf(3));
        assertEquals(routeTest[1], Integer.valueOf(15));
        assertEquals(routeTest[2], Integer.valueOf(23));
    }
}
