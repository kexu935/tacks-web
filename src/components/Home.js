import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS} from '../constants';

const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        loadingGeoLocation : false,
    }
    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessGetGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS);
        } else {
            /* geolocation IS NOT available */
        }

    }

    onSuccessGetGeoLocation = (position) => {
        this.setState({loadingGeoLocation:false});
        const {latitude, longitude} = position.coords;
        localStorage.setItem('POS_KEY', JSON.stringify({lat: latitude, lon: longitude}));
    }

    onFailedLoadGeoLocation = () => {
        this.setState({loadingGeoLocation:false});
        console.log('failed');
    }

    componentDidMount() {
        this.setState({loadingGeoLocation:true});
        this.getGeoLocation();
    }

    render() {
        const operations = <Button type="primary">Create New Post</Button>;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.state.loadingGeoLocation ? <Spin tip="Loading geo location..."/> : null}</TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
            </Tabs>
        );
    }
}