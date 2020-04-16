package com.tco.server;
import com.tco.misc.OptimizationConfig;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;

/** This class defines the Config response that provides the client
 * with server specific configuration information.
 *  
 * When used with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to set the configuration information.
 * The MicroServer constructs the response JSON from the object using GSON.
 *  
 * When used for testing purposes,
 * An object is created using the constructor below.
 * The buildResponse method is called to set the configuration information.
 * The getDistance method is called to obtain the distance value for comparisons.
 */
public class RequestConfig extends RequestHeader {
  private String serverName;
  protected List<String> supportedRequests = Arrays.asList("config", "distance", "trip");
  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);
  protected OptimizationConfig optimization;

  RequestConfig() {
    this.requestType = "config";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
  }


  @Override
  public void buildResponse() {
    this.serverName = "T03 Hugh-Lit Pack-Herd";
    log.trace("buildResponse -> {}", this);
    this.optimization = new OptimizationConfig();
  }


  String getServerName() {
    return this.serverName;
  }
}
