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
    private Optimizations twoOpt;

    @Before
    public void createObjects() {
        unvisited = new Optimizations("1",
                Optimizations.Improvements.none, Optimizations.Constructions.none);

        findClosest = new Optimizations("1",
                Optimizations.Improvements.none, Optimizations.Constructions.none);

        reverse = new Optimizations("1", Optimizations.Improvements.twoOpt, Optimizations.Constructions.some);

        twoOpt = new Optimizations("1", Optimizations.Improvements.twoOpt, Optimizations.Constructions.some);
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
/*
    improvement = true
            while improvement {
        improvement = false
        for (i = 0; i <= n-3; i++) {  // assert n>4
            for (k = i + 2; k <= n-1; k++) {
                delta = -dis(route,i,i+1)-dis(route,k,k+1)+dis(route,i,k)+dis(route,i+1,k+1)
                if (delta < 0) { //improvement?
                    2optReverse(route, i+1, k)
                    improvement = true
                }
            }
        }
    }
 */
    @Test
    public void testTwoOpt() {
        Integer[] routeTest = new Integer[5];
        routeTest[0] = 23;  //
        routeTest[1] = 15;  // i
        routeTest[2] = 3;   // i + 1
        routeTest[3] = 9;   // k
        routeTest[4] = 2;   // k + 1
        Integer[] routeTest2 = new Integer[5];
        routeTest2 = routeTest;
        // First round:
        // i -> i + 1 = 8, k -> k + 1 = 6, sum = -14
        // i -> k = 20, i + 1 -> k + 1 = 6, sum = 26
        // delta > 0 -> no Optimization required.
        // Second round:
        // i = 1, i -> i + 1 = 12, k -> k + 1 = 7, i -> k = 6, i + 1 -> k + 1 = 1
        // delta = 7 - 19 = -12
        // delta < 0 -> Optimization = true!!!
        // swap: 15, 9, 3, 2
        // Final: 23, 3, 9, 15, 2
        twoOpt.twoOptOptimize(routeTest, false);
        assertEquals(routeTest[0], Integer.valueOf(23));
        assertEquals(routeTest[1], Integer.valueOf(3));
        assertEquals(routeTest[2], Integer.valueOf(9));
        assertEquals(routeTest[3], Integer.valueOf(15));
        assertEquals(routeTest[4], Integer.valueOf(2));
    }
}
