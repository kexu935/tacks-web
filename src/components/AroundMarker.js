import React from 'react';
import { Marker, InfoWindow} from 'react-google-maps';

export class AroundMarker extends React.Component {
    state = {
        isOpen:false,
    }

    onToggleOpen = () => {
        this.setState((prevState) => {
            return {isOpen: !prevState.isOpen};
        });
    }
    render() {
        const {lat, lng} = this.props.pos;
        return (
            <Marker
                position={{lat, lng}}
                onClick={this.onToggleOpen}
            >
                {this.state.isOpen ? <InfoWindow onCloseClick={this.onToggleOpen}>
                <div>aaa</div>
            </InfoWindow> : null}
        </Marker>);
    }
}