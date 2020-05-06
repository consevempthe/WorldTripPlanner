package com.tco.misc;

import com.google.gson.annotations.SerializedName;

public class Optimizations {
    public enum Improvements {
        @SerializedName("2opt") twoOpt, @SerializedName("3opt") threeOpt, none,
    }

    public enum Constructions {
        none, one, some
    }

    public String response;
    public Constructions construction;
    public Improvements improvement;

    public Optimizations(String response, Improvements improve, Constructions construct) {
        this.response = response;
        this.construction = construct;
        this.improvement = improve;
    }

    public String getResponse() {
        return this.response;
    }

    /*
        @param distanceMatrix holds the matrix of distances for the tour
        @param visited is how we determine if we have visited a place
        @param places contains the indexes of our trip
     */
    public Integer[] nearestNeighbor(int start, Long[][] distanceMatrix) {
        int count = 0;
        int length = distanceMatrix.length;
        Integer[] newOrder = new Integer[length];

        //set the first index of the new order to START, increment count
        newOrder[count++] = start;
        boolean[] visited = new boolean[length];
        visited[start] = true; // set the first index of visited to true.

        while(unvisitedCitiesRemain(visited)) {
            Long[] nearestCities = distanceMatrix[start]; // get vector of all the other distances to our START
            Integer nearestCity = findClosestDestination(nearestCities, visited); // find the nearest city
            newOrder[count++] = nearestCity; // add nearest city to our new order

            start = nearestCity;
            visited[start] = true; // new START is visited

        }

        return newOrder;
    }

    public boolean unvisitedCitiesRemain(boolean[] visited) {
        for(boolean isVisited : visited) {
            if(!isVisited) {
                return true;
            }
        }

        return false;
    }

    public Integer findClosestDestination(Long[] nearestCities, boolean[] visited) {
        Long minimum = Long.MAX_VALUE;
        int index = -1;

            for(int i = 0; i < nearestCities.length; i++) {
                if(!visited[i] && nearestCities[i] < minimum) {
                    minimum = nearestCities[i];
                    index = i;
                }
            }

        return index;
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
    public void twoOptOptimize(Integer[] optimizedRoute, boolean improvement) {
        improvement = false;
        int routeLen = optimizedRoute.length;
        // rl = 5
        assert(routeLen > 4);
        for(int i = 0; i <= routeLen - 3; i++) {
            for(int k = i + 2; k <= routeLen - 1; k++) {
                int delta;
                if(k + 1 > (routeLen - 1)) {
                    break;
                }
                int dis1 = optimizedRoute[i + 1] - optimizedRoute[i];
                int dis2 = optimizedRoute[k + 1] - optimizedRoute[k];
                int dis3 = optimizedRoute[k] - optimizedRoute[i];
                int dis4 = optimizedRoute[k + 1] - optimizedRoute[i + 1];
                delta = -dis1 - dis2 + dis3 + dis4;
                if(delta < 0) {
                    twoOptReverse(optimizedRoute, i + 1, k);
                    improvement = true;
                }
            }
        }
    }

    // Reverse the matrix.
    public void twoOptReverse(Integer[] route, int a, int b) {
        while(a < b) {
            int temp = route[a];
            route[a] = route[b];
            route[b] = temp;
            a++;
            b--;
        }
    }
}
