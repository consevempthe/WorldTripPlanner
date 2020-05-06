package com.tco.misc;

public class Narrow {
    public enum Types {
        airport, balloonport, heliport
    }
    public Types[] type;
    public String where;

    public Narrow() {
        type = new Types[]{};
        where = "";
    }

    public boolean typeIsEmpty() {
        return type.length == 0;
    }

    public boolean whereIsEmpty() {
        return where.isEmpty();
    }
}
