package com.tco.server;

import com.tco.misc.GreatCircleDistance;

import java.util.Map;

public class RequestDistance extends RequestHeader {
    Map<String, String> place1;
    Map<String, String> place2;
    Double earthRadius;
    Long distance;

    public RequestDistance(Map<String,String> p1, Map<String,String> p2, Double earthRadius)
    {
        this.place1 = p1;
        this.place2 = p2;
        this.earthRadius = earthRadius;
    }

    @Override
    public void buildResponse() {

    }
}
