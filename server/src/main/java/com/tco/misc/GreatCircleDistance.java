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
        double place1LongitudeRadians = Math.toRadians(this.place1Longitude);
        double place1LatitudeRadians = Math.toRadians(this.place1Latitude);
        double place2LongitudeRadians = Math.toRadians(this.place2Longitude);
        double place2LatitudeRadians = Math.toRadians(this.place2Latitude);

        double lambda = Math.abs(place1LongitudeRadians - place2LongitudeRadians);
        double sinLambda = Math.sin(lambda);
        double costheta2 = Math.cos(place2LatitudeRadians);

        double costheta1 = Math.cos(place1LatitudeRadians);
        double sintheta2 = Math.sin(place2LatitudeRadians);
        double sintheta1 = Math.sin(place1LatitudeRadians);
        double coslamda = Math.cos(lambda);

        double leftNumerator = Math.pow((costheta2 * sinLambda), 2);
        double rightNumerator = Math.pow(((costheta1 * sintheta2) - (sintheta1 * costheta2 * coslamda)), 2);
        double numerator = Math.sqrt(leftNumerator + rightNumerator);


        double leftDenominator = (sintheta1 * sintheta2);
        double rightDenominator = (costheta1 * costheta2 * coslamda);
        double denominator = leftDenominator + rightDenominator;

        return Math.atan((numerator / denominator));
    }

    public Double calculateDistance()
    {
        return (this.vincentyFormula() * this.earthRadius);
    }
}
