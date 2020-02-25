package com.tco.server;

import static spark.Spark.secure;

import com.google.gson.Gson;
import com.tco.misc.GreatCircleDistance;
import com.tco.misc.JSONValidator;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;
import spark.Response;
import spark.Spark;

class  MicroServer {

  private final String CONFIG_REQUEST_BODY = "{\"requestType\" : \"config\", \"requestVersion\" : 1}";
  private final Logger log = LoggerFactory.getLogger(MicroServer.class);
  private DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");


  MicroServer(int serverPort) {
    configureServer(serverPort);
    serveStaticPages();
    processRestfulAPIrequests();
    log.info("MicroServer running on port: {}", serverPort);
  }


  private void configureServer(int serverPort) {
    Spark.port(serverPort);
    String keystoreFile = System.getenv("KEYSTORE_FILE");
    String keystorePassword = System.getenv("KEYSTORE_PASSWORD");
    if (keystoreFile != null && keystorePassword != null) {
      secure(keystoreFile, keystorePassword, null, null);
      log.info("Keystore file: {}", keystoreFile);
      log.info("Keystore password: {}", keystorePassword);
      log.info("MicroServer using HTTPS.");
    } else {
      log.info("MicroServer using HTTP.");
    }
  }

  private void serveStaticPages() {
    String path = "/public/";
    Spark.staticFileLocation(path);
    Spark.get("/", (req, res) -> {
      res.redirect("index.html");
      return null;
    });
  }


  private void processRestfulAPIrequests() {
    Spark.get("/api/config", this::processConfigRequest);

    // Configure other restful API requests here
    Spark.post("/api/config", this::processPostConfigRequest);
    Spark.post( "/api/distance", this::processDistanceRequest);
  }

  private String processConfigRequest(Request request, Response response) {
    logRequest(request);
    return processHttpRequest(RequestConfig.class, CONFIG_REQUEST_BODY, response);
  }

  private String processDistanceRequest(Request request, Response response){
   logRequest(request);
   return processHttpRequest(RequestDistance.class, request.body(), response);
  }

  private String processPostConfigRequest(Request request, Response response) {
    logRequest(request);
    return processHttpRequest(RequestConfig.class, request.body(), response);
  }

  private String processHttpRequest(Type type, String requestBody, Response response) {
    setupResponse(response);
    try {
      JSONValidator.validate(type, requestBody);
      Gson jsonConverter = new Gson();
      return buildJSONResponse(jsonConverter.fromJson(requestBody, type));
    } catch (IOException e) {
      log.error("Data request failed validation: {}", requestBody);
      log.error("Reason for failure: {}", e.getMessage());
      response.status(400);
      return requestBody;
    } catch (Exception e) {
      log.error("Exception: {}", e.getMessage());
      response.status(500);
      return requestBody;
    }
  }

  private void setupResponse(Response response) {
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);
  }

  private String buildJSONResponse(RequestHeader request) {
    request.buildResponse();
    Gson jsonConverter = new Gson();
    String responseBody = jsonConverter.toJson(request);
    log.trace("Data Response: {}", responseBody);
    return responseBody;
  }

  private void logRequest(Request request) {
    String message = "Request - "
            + "[" + dateTimeFormat.format(LocalDateTime.now()) + "] "
            + request.ip() + " "
            + "\"" + request.requestMethod() + " "
            + request.pathInfo() + " "
            + request.protocol() + "\" "
            + "[" + request.body() + "]";
    log.error(message);
  }
}
