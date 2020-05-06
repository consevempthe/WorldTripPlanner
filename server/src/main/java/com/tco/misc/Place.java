package com.tco.misc;

public class Place {
    public String name;
    public String latitude;
    public String longitude;

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

    public String getPlace() {
        return name + " " + latitude + " " + longitude;
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
