package com.tco.server;

import com.tco.misc.Place;

import java.util.Map;

public class RequestTrip extends RequestHeader {
    //key: Unit Title value: corresponding Earth radius
    final Map<String, String> options;
    final Place[] places;
    Long[] distances;

    public RequestTrip(Map<String, String> o, Place[] p, Long[] d) {
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
        Double earthRadius = Double.parseDouble(options.get("earthRadius"));

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
}
