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
    static boolean isTravis;

    @Before
    public void createTestQuery() {
        test = new Database();
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
    public void testDatabaseFunctions() {
        String query_test = "denver";
        int limit_test = 40;
        Narrow filters = new Narrow();

        String query = test.generateSQL(query_test, filters);
        String query_actual = String.format("SELECT * FROM continent" +
                " INNER JOIN country ON continent.id = country.continent" +
                " INNER JOIN region ON country.id = region.iso_country" +
                " INNER JOIN world ON region.id = world.iso_region" +
                " WHERE country.name LIKE '%%%1$s%%'" +
                " OR region.name LIKE '%%%1$s%%'" +
                " OR world.name LIKE '%%%1$s%%'" +
                " OR world.municipality LIKE '%%%1$s%%'" +
                ";", query_test);

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
}
