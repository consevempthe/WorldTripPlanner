package com.tco.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;

/** The server for the single page web application. */
public class WebApplication {

  private final static int DEFAULT_SERVER_PORT = 8088;
  private final static int MAX_SERVER_PORT = 65535;
  private final static int MIN_SERVER_PORT = 1024;
  private final static Logger log = LoggerFactory.getLogger(WebApplication.class);

  public static void main(String[] commandLineArguments) {

    if (commandLineArguments.length > 1) {
      log.error("Too many command line arguments given. Expected 1 but found {}.", commandLineArguments.length);
      System.exit(1);
    }

    Integer serverPort = getServerPort(commandLineArguments);
    MicroServer server = new MicroServer(serverPort);  // constructor never returns
  }


  private static int getServerPort(String[] commandLineArguments) {

    Integer serverPort = DEFAULT_SERVER_PORT;
    if (commandLineArguments.length > 0) {
      try {
        serverPort = Integer.parseInt(commandLineArguments[0]);
      } catch (Exception e) {
        log.error("Error converting server port: {}", e);
      }
    }
    if(portIsValid(serverPort)) {
      log.info("Server port: {}", serverPort);
    } else {
      log.error("Given port is out of acceptable range ({}-{}), defaulting to {}", MIN_SERVER_PORT, MAX_SERVER_PORT, DEFAULT_SERVER_PORT);
      serverPort = DEFAULT_SERVER_PORT;
    }
    return serverPort;
  }

  private static boolean portIsValid(int port) {
    return port >= MIN_SERVER_PORT && port <= MAX_SERVER_PORT;
  }

}
