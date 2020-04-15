import {isJsonResponseValid} from "../../../utils/restfulAPI";
import {HTTP_OK} from "../../Constants";
import log from "../../../utils/globals";
import {Input} from "reactstrap";
import React from "react";

let place = {name: "home", lat:0, lng:0};

let locationAvailable = false;

export function numberToString(number) {
    return number.toFixed(2).toString();
}

export function validateName(event) {
    const name = event.target.value;

    if(name.length > 0 && name.charAt(0) !== ' ') {
        return 'success';
    } else {
        return 'failure';
    }
}

export function createPlace(point) {
    return {name: point.name, latitude: point.lat.toString(), longitude: point.lng.toString()}
}

export function processProtocolResponse(response, schema) {
    if(!isJsonResponseValid(response.body, schema)) {

    } else if(response.statusCode === HTTP_OK) {
        return response.body;
    }
}

export function geolocationAvailable() {
    return locationAvailable;
}

function processGeolocation(geolocation, updateLocation) {
    place.lat = geolocation.coords.latitude;
    place.lng = geolocation.coords.longitude;
    locationAvailable = true;
    updateLocation(place);
    log.trace("Geolocation response:", geolocation);
}

export function renderInput(name, placeholder, validate, changeFunction) {
    return (
        <Input
            name={name}
            placeholder={placeholder}
            valid={validate === 'success'}
            invalid={validate === 'failure'}
            onChange={(event) => {
                changeFunction(event);
            }}
        />
    )
}

function processErrorGeolocation(error) {
    locationAvailable = false;
    log.error("Geolocation request failed", error);
}

export function getClientLocation(updateLocation) {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>
        processGeolocation(position, updateLocation), processErrorGeolocation);
    }
}