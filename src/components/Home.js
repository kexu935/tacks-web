import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS, API_ROOT, AUTH_PREFIX, TOKEN_KEY} from '../constants';
import $ from 'jquery';
import {Gallery} from "./Gallery";

const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        loadingPosts: false,
        loadingGeoLocation : false,
        error: '',
        posts:[],
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
        } else if (this.state.loadingPosts) {
            return <Spin tip='Loading posts...'/>;
        } else if (this.state.posts && this.state.posts.length > 0) {
            const images = this.state.posts.map((post) => {
                return ({
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    caption: post.message,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                });
            });
            return <Gallery images={images}/>
        } else
            return null;
        }

    loadNearbyPosts = (position) => {
        const lat = 37.7915953;
        const lon = -122.3937977;
        this.setState({loadingPosts: true});
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            }
        }).then((response) => {
            console.log(response);
            this.setState({posts: response, loadingPosts: false, error: ''});
        }, (response) => {
            console.log(response.responseText);
            this.setState({loadingPosts: false, error: response.responseText});
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