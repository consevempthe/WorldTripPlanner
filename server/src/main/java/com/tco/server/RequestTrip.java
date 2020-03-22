package com.tco.server;

import com.tco.misc.Place;

import java.util.Map;

public class RequestTrip extends RequestHeader {
    //key: Unit Title value: corresponding Earth radius
    Map<String, String> options;
    Place[] places;
    Integer[] distances;

    @Override
    public void buildResponse() {

    }

    public Integer[] getDistances()
    {
        Integer[] distances = new Integer[this.places.length];
        //Calculate distances here
        return distances;
    }
}
