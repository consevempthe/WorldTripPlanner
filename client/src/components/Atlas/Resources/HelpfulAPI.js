import {isJsonResponseValid} from "../../../utils/restfulAPI";
import {HTTP_OK} from "../../Constants";
import log from "../../../utils/globals";

let place = {name: "home", lat:0, lng:0};

let locationAvailable = false;

export function numberToString(number) {
    return number.toFixed(2).toString();
}

export function validateName(event) {
    const name = event.target.value;

    if(name.length > 0) {
        return 'success';
    } else {
        return 'failure';
    }
}

export function createPlace(point) {
    return {name: point.name, latitude: point.lat.toString(), longitude: point.lng.toString()}
}

export function createPoint(place) {
    return {name: place.name, lat: place.latitude.toString(), lng: place.longitude.toString()}
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