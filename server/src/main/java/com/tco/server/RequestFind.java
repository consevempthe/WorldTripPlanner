package com.tco.server;

import com.tco.misc.Database;
import com.tco.misc.Place;
import com.tco.misc.Narrow;

public class RequestFind extends RequestHeader {
    String match;
    Narrow narrow;
    Integer limit;
    Integer found;
    Place[] places;

    public RequestFind(String s, Integer l) {
        this.match = s;
        this.limit = l;
    }

    public Place[] getPlaces() {
        return places;
    }

    public Integer getFound() {
        return found;
    }

    public Integer getLimit() {
        return limit;
    }

    @Override
    public void buildResponse() {
        Database db = new Database();

        if(limit == null) {
            limit = 0;
        }

        this.places = db.query(sanitizeMatch(), this.limit, narrow).clone();
        this.found = db.getCOUNT();
    }

    public String sanitizeMatch() {
        return this.match.replaceAll("[^a-zA-z0-9]", "_");
    }
}
