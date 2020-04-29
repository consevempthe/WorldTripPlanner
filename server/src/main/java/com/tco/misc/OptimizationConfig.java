package com.tco.misc;

import java.util.Arrays;
import java.util.List;

public class OptimizationConfig {
    protected List<String> construction;
    protected List<String> improvement;

    public OptimizationConfig() {
        this.construction = Arrays.asList("none", "one", "some");
        this.improvement = Arrays.asList("none", "2opt");
    }
}
