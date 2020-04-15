package com.tco.misc;

import com.google.gson.annotations.SerializedName;

public class Optimizations {
    public enum Improvements {
        @SerializedName("2opt") twoOpt, @SerializedName("3opt") threeOpt, none,
    }

    public enum Constructions {
        none, one, some
    }

    String response;
    Constructions construction;
    Improvements improvement;

    public Optimizations(String response, Improvements improve, Constructions construct) {
        this.response = response;
        this.construction = construct;
        this.improvement = improve;
    }

    public String getResponse() {
        return this.response;
    }
}
