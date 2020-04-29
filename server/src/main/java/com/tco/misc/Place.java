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

    public boolean equals(Object anObject) {
        if(anObject instanceof Place) {
            Place otherPlace = (Place)anObject;
            return this.name.equals(otherPlace.name) &&
                    this.latitude.equals(otherPlace.latitude) &&
                    this.longitude.equals(otherPlace.longitude);
        }
        return false;
    }

}
