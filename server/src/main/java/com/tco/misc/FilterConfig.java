package com.tco.misc;

import java.util.Arrays;
import java.util.List;

public class FilterConfig {
    protected List<String> type;
    protected List<String> where;

    public FilterConfig() {
        this.type = Arrays.asList("airport", "balloonport", "heliport");
        this.where = Arrays.asList("");
    }
}
