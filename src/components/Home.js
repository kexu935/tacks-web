import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS, API_ROOT, AUTH_PREFIX, TOKEN_KEY} from '../constants';
import $ from 'jquery';

const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        loadingGeoLocation : false,
        error: '',
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
        this.setState({loadingGeoLocation:false, error:''});
        const {latitude, longitude} = position.coords;
        localStorage.setItem('POS_KEY', JSON.stringify({lat: latitude, lon: longitude}));
        this.loadNearbyPosts(position);
    }

    onFailedLoadGeoLocation = () => {
        this.setState({loadingGeoLocation:true, error:'Failed to load geo location!'});
        console.log('failed get geolocation');
    }

    componentDidMount() {
        this.setState({loadingGeoLocation:true});
        this.getGeoLocation();
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip='Loading geo location...'/>;
        } else {
            return <div>content</div>
        }
    }

    loadNearbyPosts = (position) => {
        const lat = 37.7915953;
        const lon = -122.3937977;
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            }
        }).then((response) => {
            console.log(response);
        }, (response) => {
            console.log(response.responseText);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const operations = <Button type="primary">Create New Post</Button>;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.getGalleryPanelContent()}</TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
            </Tabs>
        );
    }
}