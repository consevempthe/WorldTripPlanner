package com.tco.server;

import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;
import com.tco.misc.Place;

import static org.junit.Assert.assertEquals;

public class TestRequestDistance {
    //Request Distance for Map objects
    private RequestDistance fortCollins2Chicago;
    private RequestDistance fortCollins2Cheyenne;
    private RequestDistance australia2Singapore;
    private RequestDistance losAngeles2DaytonaBeach;
    private RequestDistance fortCollins2FortCollins;
    private RequestDistance fortCollins2ZeroZero;

    //Request Distance for Place objects
    private RequestDistance fortCollins2ChicagoPO;
    private RequestDistance fortCollins2CheyennePO;

    void buildCity(Map<String,String> city, String longitude, String latitude)
    {
        city.put("longitude", longitude);
        city.put("latitude", latitude);
    }

    @Before
    public void createDistanceForTestCases()
    {
        Double earthRadiusMiles = 3959.0;
        Double earthRadiusKM = 6371.0;
        Double earthRadiusNM =  3440.0;

        /*Test with Map object start*/
        Map<String,String> fortCollins = new HashMap<>();
        Map<String,String> chicago = new HashMap<>();
        Map<String,String> cheyenne = new HashMap<>();
        Map<String,String> australia = new HashMap<>();
        Map<String,String> singapore = new HashMap<>();
        Map<String,String> losAngeles = new HashMap<>();
        Map<String,String> daytonaBeach = new HashMap<>();
        Map<String,String> zeroZero = new HashMap<>();

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
        /*Test with Map object end*/

        /*Test with Place object start*/
        Place fortCollinsPO = new Place("fort collins", "-105.08442", "40.5826");
        Place chicagoPO = new Place("chicago", "-87.65005", "41.85003");
        Place cheyennePO = new Place("cheyenne", "-104.82025", "41.13998");
        /*Test with Place object end*/
        fortCollins2ChicagoPO = new RequestDistance(fortCollinsPO, chicagoPO, earthRadiusMiles);
        fortCollins2CheyennePO = new RequestDistance(fortCollinsPO, cheyennePO, earthRadiusMiles);
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
        Long distance = this.fortCollins2Chicago.getDistance();
        assertEquals(909.0, distance,0);
    }

    @Test
    public void testDistanceFortCollinsToCheyenne()
    {
        //Testing in nautical miles
        Long distance = this.fortCollins2Cheyenne.getDistance();
        assertEquals(36.0, distance, 0);
    }

    @Test
    public void testDistanceAustralia2Singapore()
    {
        //Testing in kilometers
        Long distance = this.australia2Singapore.getDistance();
        assertEquals(4377.0, distance, 0);
    }

    @Test
    public void testDistanceLosAngeles2DaytonaBeach()
    {
        //Testing in kilometers
        Long distance = this.losAngeles2DaytonaBeach.getDistance();
        assertEquals(3545.0, distance, 0);
    }

    @Test
    public void testDistanceFortCollins2FortCollins()
    {
        Long distance = this.fortCollins2FortCollins.getDistance();
        assertEquals(0.0000 , distance,0);
    }
    @Test
    public void testDistanceFortCollins2ZeroZero()
    {
        Long distance = this.fortCollins2ZeroZero.getDistance();
        this.fortCollins2ZeroZero.buildResponse();
        assertEquals(7006.0, distance, 0);
    }

    @Test
    public void testGetDistanceFortCollins2ChicagoPO()
    {
        //Testing in miles
        Long distance = this.fortCollins2ChicagoPO.getDistance();
        assertEquals(1205.0, distance,0);
    }

    @Test
    public void testDistanceFortCollinsToCheyennePO()
    {
        //Testing in nautical miles
        Long distance = this.fortCollins2CheyennePO.getDistance();
        assertEquals(21.0, distance, 0);
    }
}
