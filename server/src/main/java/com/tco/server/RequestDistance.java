package com.tco.server;

import com.tco.misc.GreatCircleDistance;
import com.tco.misc.Place;

import java.util.HashMap;
import java.util.Map;

public class RequestDistance extends RequestHeader {
    final Map<String, String> place1;
    final Map<String, String> place2;
    final Double earthRadius;
    Long distance;

    public RequestDistance(Map<String,String> p1, Map<String,String> p2, Double earthRadius)
    {
        this.place1 = p1;
        this.place2 = p2;
        this.earthRadius = earthRadius;
    }

    public RequestDistance(Place destination1, Place destination2, Double earthRadius)
    {
        Map<String, String> p1 = new HashMap<>();
        Map<String, String> p2 = new HashMap<>();
        p1.put("latitude", destination1.latitude);
        p1.put("longitude", destination1.longitude);

        p2.put("latitude", destination2.latitude);
        p2.put("longitude", destination2.longitude);

        this.place1 = p1;
        this.place2 = p2;
        this.earthRadius = earthRadius;
    }

    @Override
    public void buildResponse() {
        GreatCircleDistance greatCircleDistance = new GreatCircleDistance(place1, place2, earthRadius);
        this.distance = greatCircleDistance.calculateDistance().longValue();
    }

    Double getEarthRadius()
    {
        return this.earthRadius;
    }

    Double getDistance()
    {
        GreatCircleDistance greatCircleDistance = new GreatCircleDistance(place1, place2, earthRadius);
        return greatCircleDistance.calculateDistance();
    }
}
