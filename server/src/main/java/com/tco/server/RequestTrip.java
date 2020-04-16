package com.tco.server;

import com.tco.misc.Optimizations;
import com.tco.misc.Place;
import com.tco.misc.Options;

public class RequestTrip extends RequestHeader {
    final Options options;
    Place[] places;
    Long[] distances;

    public RequestTrip(Options o, Place[] p, Long[] d) {
        this.options = o;
        this.places = p;
        this.distances = d;
    }

    @Override
    public void buildResponse() {
        if(this.options.optimization == null) {
            this.distances = this.getDistances();
        } else {
            this.optimizer();
        }
    }

    public void optimizer() {
        Long[][] distanceMatrix = this.distanceMatrix();
        boolean[] visited = new boolean[distanceMatrix.length]; // all false
        Integer[] places = this.createTourIndexes(); // Uses places to create an index


        //One optimizations
        if(Optimizations.Constructions.one.equals(this.options.optimization.construction)) {
            Integer[] optimizedPlaces = this.options.optimization.nearestNeighbor(distanceMatrix, visited, places);
            this.reorderPlaces(optimizedPlaces);

        //Some optimization occurs -- IMPLEMENT
        }
//        else if(Optimizations.Constructions.some.equals(this.options.optimization.construction)) {
//
//            //NOT IMPLEMENTED YET
//
//        }
        else { //If None or no construction just get the distance
            this.distances = this.getDistances();
        }
    }

    public Long[] getDistances()
    {
        Long[] distances = new Long[this.places.length];
        Double earthRadius = Double.parseDouble(options.getEarthRadius());

        for (int i = 0; i < distances.length; i++) {
            if(i == distances.length - 1) {
                RequestDistance distance = new RequestDistance(places[i], places[0], earthRadius);
                distances[i] = distance.getDistance();
            } else {
                RequestDistance distance = new RequestDistance(places[i], places[i + 1], earthRadius);
                distances[i] = distance.getDistance();
            }
        }

        return distances;
    }

    public Long[][] distanceMatrix() {
        Long [][] table = new Long[places.length][places.length];
        double earthRadius = Double.parseDouble(options.getEarthRadius());

        for (int i = 0; i < places.length; i++) {
            for (int j = 0; j < places.length; j++) {
                RequestDistance distance = new RequestDistance(places[i], places[j], earthRadius);
                table[i][j] = distance.getDistance();
            }
        }

        return table;
    }

    public Integer[] createTourIndexes() {
        Integer[] tour = new Integer[this.places.length];

        for(int i = 0; i < this.places.length; i++) {
            tour[i] = i;
        }

        return tour;
    }

    public void reorderPlaces(Integer[] optimizedPlaces) {
        Place[] reorderedPlaces = new Place[this.places.length];

        for(int i = 0; i < optimizedPlaces.length; i++) {
            Integer placeTemp = optimizedPlaces[i];
            reorderedPlaces[i] = this.places[placeTemp];
        }

        this.places = reorderedPlaces;
    }

}
