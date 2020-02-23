package com.tco.misc;

import java.util.Map;

public class GreatCircleDistance {
    Double place1Longitude;
    Double place1Latitude;
    Double place2Longitude;
    Double place2Latitude;
    Double earthRadius;

    public GreatCircleDistance()
    {
        this.place1Longitude = 0.0;
        this.place1Latitude = 0.0;
        this.place2Longitude = 0.0;
        this.place2Latitude = 0.0;
    }

    public GreatCircleDistance(Map<String,String> place1, Map<String,String> place2, Double earthRadius)
    {
        //Initialize points for place1
        this.place1Longitude = Double.parseDouble(place1.get("longitude"));
        this.place1Latitude = Double.parseDouble(place1.get("latitude"));

        //Initialize points for place2
        this.place2Longitude = Double.parseDouble(place2.get("longitude"));
        this.place2Latitude = Double.parseDouble(place2.get("latitude"));

        this.earthRadius = earthRadius;
    }

    public Double vincentyFormula()
    {
        Double place1LongitudeRadians = Math.toRadians(this.place1Longitude);
        Double place1LatitudeRadians = Math.toRadians(this.place1Latitude);
        Double place2LongitudeRadians = Math.toRadians(this.place2Longitude);
        Double place2LatitudeRadians = Math.toRadians(this.place2Latitude);

        Double lambda = Math.abs(place1LongitudeRadians - place2LongitudeRadians);
        Double sinLambda = Math.sin(lambda);
        Double costheta2 = Math.cos(place2LatitudeRadians);

        Double costheta1 = Math.cos(place1LatitudeRadians);
        Double sintheta2 = Math.sin(place2LatitudeRadians);
        Double sintheta1 = Math.sin(place1LatitudeRadians);
        Double coslamda = Math.cos(lambda);

        Double leftNumerator = Math.pow((costheta2 * sinLambda), 2);
        Double rightNumerator = Math.pow(((costheta1 * sintheta2) - (sintheta1 * costheta2 * coslamda)), 2);
        Double numerator = Math.sqrt(leftNumerator + rightNumerator);


        Double leftDenominator = (sintheta1 * sintheta2);
        Double rightDenominator = (costheta1 * costheta2 * coslamda);
        Double denominator = leftDenominator + rightDenominator;

        Double vincentyFormula = Math.atan((numerator / denominator));

        return vincentyFormula;
    }

    public Double calculateDistance()
    {
        return this.vincentyFormula() * this.earthRadius;
    }
}
