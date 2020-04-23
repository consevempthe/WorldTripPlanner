package com.tco.misc;

public class Options {
    public String title;
    public String earthRadius;
    public Optimizations optimization;

    public Options(String earthRadius) {
        this.earthRadius = earthRadius;
    }

    public String getEarthRadius() {
        return this.earthRadius;
    }

}
