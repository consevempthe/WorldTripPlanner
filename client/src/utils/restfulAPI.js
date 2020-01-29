import log from "./globals";


export function sendServerRequest(requestType, serverPort=getOriginalServerPort()) {
  const restfulAPI = `${serverPort}/api/${requestType}`;
  const requestOptions = {method: "GET"};
  return processRestfulAPI(restfulAPI, requestOptions);
}


export function sendServerRequestWithBody(requestType, requestBody, serverPort=getOriginalServerPort()) {
  const restfulAPI = `${serverPort}/api/${requestType}`;
  const requestOptions = {method: "POST", body: JSON.stringify(requestBody)};
  return processRestfulAPI(restfulAPI, requestOptions);
}


async function processRestfulAPI(restfulAPI, requestOptions) {
  try {
    let response = await fetch(restfulAPI, requestOptions);
    return {
      statusCode: response.status,
      statusText: response.statusText,
      body: await response.json()
    };
  }
  catch(err) {
    log.error("Request failed: ", "Status Code: ", err.status, " ", err );
    return { statusCode: 0, statusText: 'Client failure', body: null };
  }
}


export function getOriginalServerPort() {
  const serverProtocol = location.protocol;
  const serverHost = location.hostname;
  const serverPort = location.port;
  const alternatePort = process.env.dev;
  return `${serverProtocol}\/\/${serverHost}:${(!alternatePort ? serverPort : alternatePort)}`;
}

export function isJsonResponseValid(object, schema) {
  let Ajv = require('ajv');
  let anotherJsonValidator = new Ajv();
  let validate = anotherJsonValidator.compile(schema);
  return validate(object);
}