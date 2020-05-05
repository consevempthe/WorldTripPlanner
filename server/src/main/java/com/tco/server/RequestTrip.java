package com.tco.server;

import com.tco.misc.Optimizations;
import com.tco.misc.Place;
import com.tco.misc.Options;

public class RequestTrip extends RequestHeader {
    final Options options;
    Place[] places;
    Long[] distances;

    public RequestTrip(Options o, Place[] p) {
        this.options = o;
        this.places = p;
    }

    @Override
    public void buildResponse() {
        if(this.options.optimization == null) {
            this.distances = this.getTripDistances();
        } else {
            this.optimizer();
        }
    }

    public Double getEarthRadius() {
        return Double.parseDouble(options.getEarthRadius());
    }

    public void optimizer() {
        Long[][] distanceMatrix = this.distanceMatrix();
        //One optimizations
        if(Optimizations.Constructions.one.equals(this.options.optimization.construction)) {
            Integer[] optimizedPlaces = this.options.optimization.nearestNeighbor(0, distanceMatrix);
            this.places = this.reorderPlaces(optimizedPlaces);
            this.distances = this.getTripDistances();
        //Some optimization occurs -- IMPLEMENT
        }
        else if(Optimizations.Constructions.some.equals(this.options.optimization.construction)) {

            Place[] bestRoute = null;
            Long[] bestDistances = null;
            Long bestDistance = Long.MAX_VALUE;

            for (int i = 0; i < places.length; i++) {
                Integer[] optimizedRoute = this.options.optimization.nearestNeighbor(i, this.distanceMatrix());
                // If improvements were set to 2opt, use the result from nearest neighbor to calculate 2opt.
                if(Optimizations.Improvements.twoOpt.equals((this.options.optimization.improvement))) {
                    this.options.optimization.twoOptOptimize(optimizedRoute);
                }
                //Compare distances here before reinitializing the distances array.
                this.places = reorderPlaces(optimizedRoute);
                this.distances = this.getTripDistances();
                Long currRoundTrip = roundTripDistance(this.distances);


                if (currRoundTrip <= bestDistance) {
                    bestDistance = currRoundTrip;
                    bestRoute = this.places;
                    bestDistances = this.distances;
                }
            }
            this.distances = bestDistances;
            this.places = bestRoute;

        } else { //If None or no construction just get the distance
            this.distances = this.getTripDistances();
        }
    }

    public Long[] getTripDistances()
    {
        Long[] distances = new Long[this.places.length];

        for (int i = 0; i < distances.length; i++) {
            if(i == distances.length - 1) {
                RequestDistance distance = new RequestDistance(places[i], places[0], getEarthRadius());
                distances[i] = distance.getDistance();
            } else {
                RequestDistance distance = new RequestDistance(places[i], places[i + 1], getEarthRadius());
                distances[i] = distance.getDistance();
            }
        }

        return distances;
    }

    public Long roundTripDistance(Long[] distances) {
        Long total = 0L;
        for(Long distance : distances) {
            total += distance;
        }
        return total;
    }

    public Long[][] distanceMatrix() {
        Long [][] table = new Long[places.length][places.length];

        for (int i = 0; i < places.length; i++) {
            for (int j = 0; j < places.length; j++) {
                if(table[i][j] == null) {
                    RequestDistance distance = new RequestDistance(places[i], places[j], getEarthRadius());
                    table[i][j] = distance.getDistance();
                    table[j][i] = table[i][j];
                }
            }
        }

        return table;
    }

    public Place[] reorderPlaces(Integer[] optimizedPlaces) {
        Place[] reorderedPlaces = new Place[this.places.length];

        for(int i = 0; i < optimizedPlaces.length; i++) {
            Integer placeTemp = optimizedPlaces[i];
            reorderedPlaces[i] = this.places[placeTemp];
        }

        return reorderedPlaces;
    }

}
