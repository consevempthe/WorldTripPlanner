package com.tco.server;

import com.tco.misc.Place;
import com.tco.misc.Narrow;

public class RequestFind extends RequestHeader {
    String match;
    Narrow narrow;
    Integer limit;
    Integer found;
    Place[] places;

    @Override
    public void buildResponse() {

    }
}
