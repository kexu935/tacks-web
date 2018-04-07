import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import {AroundMarker} from "./AroundMarker"


class AroundMap extends React.Component {

    render() {
        const arrPos = [
            { lat: -34.397, lng: 150.644 },
            { lat: -34.377, lng: 150.664 },
            { lat: -34.357, lng: 150.684 },
        ];
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}>
                {arrPos.map((pos) => {
                    return (<AroundMarker pos={pos}/>);
                })}
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));