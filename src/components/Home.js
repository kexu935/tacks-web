import React from 'react';
import { Tabs, Spin } from 'antd';
import {GEO_OPTIONS, API_ROOT, AUTH_PREFIX, TOKEN_KEY, POS_KEY } from '../constants';
import $ from 'jquery';
import {Gallery} from "./Gallery";
import {CreatePostButton} from "./CreatePostButton"
import {WrappedAroundMap} from "./AroundMap"

const TabPane = Tabs.TabPane;

export class Home extends React.Component {
    state = {
        loadingPosts: false,
        loadingGeoLocation : false,
        error: '',
        posts:[],
    }

    onSuccessGetGeoLocation = (position) => {
        this.setState({loadingGeoLocation: false, error: ''});
        const { latitude: lat, longitude: lon } = position.coords;
        const location = {lat: lat, lon: lon};
        localStorage.setItem(POS_KEY, JSON.stringify(location));
        this.loadNearbyPosts(location);
    }

    onFailedLoadGeoLocation = () => {
        this.setState({loadingGeoLocation:true, error:'Failed to load geo location!'});
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            this.setState({ loadingGeoLocation: true, error: '' });
            navigator.geolocation.getCurrentPosition(
                this.onSuccessGetGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            this.setState({ error: 'Your browser does not support geolocation!'});
        }
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

    loadNearbyPosts = (location, radius) => {
        const { lat, lon } = location ? location : JSON.parse(localStorage.getItem(POS_KEY));
        const range = radius ? radius : 20;
        this.setState({loadingPosts: true});
        return $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=${range}`,
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
        const operations = <CreatePostButton loadNearbyPosts={this.loadNearbyPosts}/>;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.getGalleryPanelContent()}</TabPane>
                <TabPane tab="Map" key="2">
                    <WrappedAroundMap
                        posts={this.state.posts}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </TabPane>
            </Tabs>
        );
    }
}