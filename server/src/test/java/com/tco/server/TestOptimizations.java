package com.tco.server;

import com.tco.misc.Optimizations;

import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.*;


public class TestOptimizations {
    private Optimizations findClosest;
    private Optimizations unvisited;

    @Before
    public void createObjects() {
        unvisited = new Optimizations("1",
                Optimizations.Improvements.none, Optimizations.Constructions.none);

        findClosest = new Optimizations("1",
                Optimizations.Improvements.none, Optimizations.Constructions.none);
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
}
