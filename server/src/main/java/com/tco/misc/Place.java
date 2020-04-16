package com.tco.misc;

public class Place {
    public final String name;
    public final String latitude;
    public final String longitude;

    public Place(String n, String lat, String lng) {
        this.name = n;
        this.latitude = lat;
        this.longitude = lng;
    }

    public String getName() {
        return name;
    }

    public String getLatitude() {
        return latitude;
    }

    public String getLongitude() {
        return longitude;
    }
}
