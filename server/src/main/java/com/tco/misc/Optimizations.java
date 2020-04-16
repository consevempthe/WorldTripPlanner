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
    public Integer[] nearestNeighbor(Long[][] distanceMatrix, boolean[] visited, Integer[] places) {
        Long bestDistance = Long.MAX_VALUE;
        visited[0] = true;

        for(int i = 0; i < distanceMatrix.length; i++) {
            if(distanceMatrix[0][i] < bestDistance && distanceMatrix[0][i] != 0) {
                if(!visited[i]) {
                    bestDistance = distanceMatrix[0][i];
                }
            }
        }
        return places;
    }

}
