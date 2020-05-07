package com.tco.misc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

public class Database {

    private final Logger log = LoggerFactory.getLogger(Database.class);

    private static String DB_URL;
    private static String DB_USER;
    private static String DB_PASSWORD;
    private static Integer COUNT = 0;

    public void setIsDevelopment() { // add 'export CS314_ENV=development' to your ~/.bashrc
        String isDevelopment = System.getenv("CS314_ENV");
        String travis = System.getenv("TRAVIS");
        if(travis != null && travis.equals("true")) {
            DB_URL = "jdbc:mysql://127.0.0.1/cs314";
            DB_USER = "root";
            DB_PASSWORD = null;
        } else if(isDevelopment != null && isDevelopment.equals("development")) {
            DB_URL = "jdbc:mysql://127.0.0.1:56247/cs314";
            DB_USER = "cs314-db";
            DB_PASSWORD = "eiK5liet1uej";
        } else {
            DB_URL = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            DB_USER = "cs314-db";
            DB_PASSWORD = "eiK5liet1uej";
        }
    }

    public Place[] query(String match, Integer limit, Narrow narrow) {
        this.setIsDevelopment();

        Place[] PLACES = new Place[limit];

        String QUERY = generateSQL(match, narrow);

        try (
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement query = conn.createStatement();
            ResultSet results = query.executeQuery(QUERY)
        ) {
            int query_count = setCount(results, limit);
            PLACES = new Place[query_count];
            int count=0;
            while(results.next()) {
                if(count < query_count) {
                    String name = results.getString("world.name");
                    String latitude = results.getString("latitude");
                    String longitude = results.getString("longitude");

                    Place place = new Place(name, latitude, longitude);
                    PLACES[count++] = place;
                }
            }

        } catch (Exception e) {
            log.error("exception with sql: " + e.getMessage());
        }

        return PLACES;
    }

    public int setCount(ResultSet result, Integer limit) throws SQLException {
        result.last();
        COUNT = result.getRow();
        result.beforeFirst();

        if(limit == 0) {
            return 20;
        } else if(COUNT < limit) {
            return COUNT;
        } else {
            return limit;
        }
    }

    public Integer getCOUNT() {
        return COUNT;
    }

    public String generateSQL(String query, Narrow narrow) {
        String sql = String.format("Select name, latitude, longitude FROM world" +
                " WHERE (name LIKE '%%%1$s%%'" +
                " OR iso_region LIKE '%%%1$s%%'" +
                " OR iso_country LIKE '%%%1$s%%'" +
                " OR municipality LIKE '%%%1$s%%')", query);
        if(!narrow.typeIsEmpty()){
            StringBuilder string = new StringBuilder(" AND (type LIKE ");
            for(Narrow.Types type : narrow.type) {
                string.append(String.format("'%%%1$s%%' OR type LIKE ", type));
            }
            string.delete(string.length()-14, string.length());
            sql += string + ")";
        }

        sql += ";";

        return sql;

    }

}
