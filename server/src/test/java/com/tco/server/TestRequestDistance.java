package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class TestRequestDistance {
    private RequestDistance fortCollins2Chicago;
    private RequestDistance fortCollins2Cheyenne;
    private RequestDistance australia2Singapore;
    private RequestDistance losAngeles2DaytonaBeach;
    private RequestDistance fortCollins2FortCollins;
    private RequestDistance fortCollins2ZeroZero;

    private Map<String,String> buildCity(Map<String,String> city, String longitude, String latitude)
    {
        city.put("longitude", longitude);
        city.put("latitude", latitude);
        return city;
    }

    private Double formatDistance(Double oldDistance)
    {
        Double newDistance = Double.parseDouble(new DecimalFormat("##.####").format(oldDistance));
        return newDistance;
    }

    @Before
    public void createDistanceForTestCases()
    {
        Double earthRadiusMiles = 3959.0;
        Double earthRadiusKM = 6371.0;
        Double earthRadiusNM =  3440.0;

        Map<String,String> fortCollins = new HashMap<String,String>();
        Map<String,String> chicago = new HashMap<String,String>();
        Map<String,String> cheyenne = new HashMap<String,String>();
        Map<String,String> australia = new HashMap<String,String>();
        Map<String,String> singapore = new HashMap<String,String>();
        Map<String,String> losAngeles = new HashMap<String,String>();
        Map<String,String> daytonaBeach = new HashMap<String,String>();
        Map<String,String> zeroZero = new HashMap<String,String>();

        this.buildCity(fortCollins, "-105.08442", "40.5826");
        this.buildCity(chicago, "-87.65005", "41.85003");
        this.buildCity(cheyenne, "-104.82025", "41.13998");
        this.buildCity(australia, "133.77513", "-25.27440");
        this.buildCity(singapore, "103.81984", "1.35208");
        this.buildCity(losAngeles, "-118.24368", "34.05223");
        this.buildCity(daytonaBeach, "-81.02283", "29.21081");
        this.buildCity(zeroZero, "0", "0");

        fortCollins2Chicago = new RequestDistance(fortCollins, chicago, earthRadiusMiles);
        fortCollins2Cheyenne = new RequestDistance(fortCollins, cheyenne, earthRadiusNM);
        australia2Singapore = new RequestDistance(australia, singapore, earthRadiusKM);
        losAngeles2DaytonaBeach = new RequestDistance(losAngeles,daytonaBeach,earthRadiusKM);
        fortCollins2FortCollins = new RequestDistance(fortCollins,fortCollins,earthRadiusMiles);
        fortCollins2ZeroZero = new RequestDistance(fortCollins, zeroZero, earthRadiusMiles);
    }

    @Test
    public void testEarthRadius()
    {
        Double earthRadius = this.fortCollins2Chicago.getEarthRadius();
        assertEquals(3959.0, earthRadius, 0);
    }

    @Test
    public void testGetDistanceFortCollins2Chicago()
    {
        //Testing in miles
        Double calculatedDistance = this.fortCollins2Chicago.getDistance();
        Double distance = this.formatDistance(this.fortCollins2Chicago.getDistance());
        assertEquals(908.831, distance,0);
    }

    @Test
    public void testDistanceFortCollinsToCheyenne()
    {
        //Testing in nautical miles
        Double calculatedDistance = this.fortCollins2Cheyenne.getDistance();
        Double distance = this.formatDistance(this.fortCollins2Cheyenne.getDistance());
        assertEquals(35.5496, distance, 0);
    }

    @Test
    public void testDistanceAustralia2Singapore()
    {
        //Testing in kilometers
        Double distance = this.formatDistance(this.australia2Singapore.getDistance());
        assertEquals(4376.5596, distance, 0);
    }

    @Test
    public void testDistancelosAngeles2DaytonaBeach()
    {
        //Testing in kilometers
        Double distance = this.formatDistance(this.losAngeles2DaytonaBeach.getDistance());
        assertEquals(3545.1995, distance, 0);
    }

    @Test
    public void testDistanceFortCollins2FortCollins()
    {
        Double distance = this.formatDistance(this.fortCollins2FortCollins.getDistance());
        assertEquals(0.0000 , distance,0);
    }
    @Test
    public void testDistanceFortCollins2ZeroZero()
    {
        Double distance = this.formatDistance(this.fortCollins2ZeroZero.getDistance());
        assertEquals(7006.448, distance, 0);
    }
}