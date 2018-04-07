import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap} from 'react-google-maps';


class AroundMap extends React.Component {

    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}/>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));