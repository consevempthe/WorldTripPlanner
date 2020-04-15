package com.tco.server;

import com.tco.misc.Place;
import com.tco.misc.Options;

public class RequestTrip extends RequestHeader {
    final Options options;
    final Place[] places;
    Long[] distances;

    public RequestTrip(Options o, Place[] p, Long[] d) {
        this.options = o;
        this.places = p;
        this.distances = d;
    }

    @Override
    public void buildResponse() {
        this.distances = this.getDistances();
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

}
