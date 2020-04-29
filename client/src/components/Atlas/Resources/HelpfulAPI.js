import log from "../../../utils/globals";
import {Input} from "reactstrap";
import React from "react";
import {Polyline} from "react-leaflet";

let place = {name: "home", lat:0, lng:0};

let locationAvailable = false;

export function numberToString(number) {
    return number.toFixed(2).toString();
}

export function validateName(event) {
    const name = event.target.value;

    if(name.length > 0 && name.charAt(0) !== ' ' && name.charAt(name.length - 1) !== ' ') {
        return 'success';
    } else {
        return 'failure';
    }
}

export function getMarkerPosition(position) {
    let markerPosition = '';
    if(position)
        markerPosition = position.lat.toFixed(2) + ', ' + position.lng.toFixed(2);
    return markerPosition;
}

export function createPlace(point) {
    return {name: point.name, latitude: point.lat.toString(), longitude: point.lng.toString()}
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

export function polyLineWrap(marker1, marker2) {
    if (Math.abs(marker1.lng - marker2.lng) > 180) {
        let coordinate1 = {lat: marker1.lat, lng: coordinate360(marker1.lng)};
        let coordinate2 = {lat: marker2.lat, lng: coordinate360(marker2.lng)};

        return (
            [
            <Polyline positions={[marker1, coordinate2]}/>, <Polyline positions={[marker2, coordinate1]}/>
            ]
        )
    } else {
        return (
            <Polyline positions={[marker1, marker2]}/>
        )
    }
}

export function coordinate360(number) {
    return number > 0 ? number - 360 : number + 360;
}