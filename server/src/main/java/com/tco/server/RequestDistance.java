package com.tco.server;

import java.util.Map;

public class RequestDistance extends RequestHeader {
    Map<String, String> place1;
    Map<String, String> place2;
    Double earthRadius;
    Integer distance;

    @Override
    public void buildResponse() {

    }
}
