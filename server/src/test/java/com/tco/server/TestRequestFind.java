package com.tco.server;
import com.tco.misc.Database;
import com.tco.misc.Narrow;
import com.tco.misc.Place;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import static org.junit.Assert.*;

public class TestRequestFind {
    private Database test;
    private RequestFind test_query;
    static boolean isTravis;

    @Before
    public void createTestQuery() {
        test = new Database();
        test_query = new RequestFind("kauffman", 4);
    }

    @BeforeClass
    public static void setupLocationRequest() {
        String travis = System.getenv("TRAVIS");
        isTravis = travis != null && travis.equals("true");
    }

    @Test
    public void testSanitizeMatch() {
        RequestFind test1 = new RequestFind("sql++Injection==-", 0);
        String sanitize1 = test1.sanitizeMatch();

        assertEquals(sanitize1, "sql__Injection___");

        RequestFind test2 = new RequestFind("sifwoijefogwwf", 1);
        String sanitize2 = test2.sanitizeMatch();

        assertEquals(sanitize2, "sifwoijefogwwf");
    }

    @Test
    public void testTravis() {
        String query = "denver";
        int limit_test = 30;
        Narrow filters = new Narrow();

        Place[] results = test.query(query, limit_test, filters);
        Integer count = test.getCOUNT();
        System.out.println(count);
        for (Place location : results) {
            System.out.println(location.getPlace());
        }

        test_query.buildResponse();
        Place[] kauffman = test_query.getPlaces();
        Integer countIsOne = test_query.getFound();
        System.out.println(kauffman[0].getPlace());
        System.out.println(countIsOne);
    }

    @Test
    public void testDatabaseFunctions() {
        String query_test = "denver";
        int limit_test = 40;
        Narrow filters = new Narrow();

        String query = test.generateSQL(query_test, filters);
        String query_actual = String.format("Select * FROM world" +
                " WHERE name LIKE '%%%1$s%%'" +
                " OR iso_region LIKE '%%%1$s%%'" +
                " OR iso_country LIKE '%%%1$s%%'" +
                " OR municipality LIKE '%%%1$s%%';", query_test);

        assertEquals(query, query_actual);

        Place[] query_result = test.query(query_test, limit_test, filters);
        Integer query_count = test.getCOUNT();
        Integer expected_Count = isTravis ? 26 : 30;
        assertEquals(expected_Count, query_count);
        int expected_Size = isTravis ? 26 : 30;
        assertEquals(expected_Size, query_result.length);

//        for(Place location : query_result) {
//            System.out.println(location.getPlace());
//        }

    }

    @Test
    public void runRequestFind() {
        test_query.buildResponse();
        assertEquals(Integer.valueOf(4), test_query.getLimit());
        Integer actual_count = test_query.getFound();
        Integer expected = isTravis ? 1 : 2;
        assertEquals(expected, actual_count);

        Place[] actual_places = test_query.getPlaces();
        int length = isTravis ? 1 : 2;
        assertEquals(length, actual_places.length);
    }
}
