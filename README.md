# Tacks: a Geo-index based Social Network
This repository only contains frontend. Backend is here: [https://github.com/kexu935/Tacks](https://github.com/kexu935/Tacks)
* Built a social network website for users to post events (geolocation, image, description) using [ReactJs](https://reactjs.org/)
* Designed an interactive user interfaces using ReactJS libraries (antd, react-google-map, react-grid-gallery, react-router, etc.)
* Developed backend web service in [Go](https://golang.org/) and deployed to [Google Cloud (GAE flex)](https://cloud.google.com/appengine/docs/flexible/) for better scaling
* Employed [ElasticSearch](https://www.elastic.co/) (deployed on GCE) to provide geolocation-based search functions such that users can search nearby posts within a distance 
* Utilized [BigQuery](https://cloud.google.com/bigquery/) to analyze posts dumped from [BigTable](https://cloud.google.com/bigtable/) by using [Cloud Dataflow](https://cloud.google.com/dataflow/) to understand system work load, user distribution, etc.
* Improved the keyword-based spam detection by aggregating the data at the post level and user level
* Implemented authentication using OAuth 2.0 and utilized Redis to improve cache performance

## Screenshots
* Login<p align="center"><img src="/screenshots/screencapture-localhost-3000-login-2018-04-17-14_19_42.png"></p>
* Register<p align="center"><img src="/screenshots/screencapture-localhost-3000-register-2018-04-17-14_20_41.png"></p>
* Upload images<p align="center"><img src="/screenshots/screencapture-localhost-3000-home-2018-04-17-14_24_44.png"></p>
* Gallery of posts<p align="center"><img src="/screenshots/screencapture-localhost-3000-home-2018-04-17-14_25_34.png"></p>
* Click each post to zoom in<p align="center"><img src="/screenshots/screencapture-localhost-3000-home-2018-04-17-14_25_49.png"></p>
* Map<p align="center"><img src="/screenshots/screencapture-localhost-3000-home-2018-04-17-14_29_29.png"></p>
* Zoom out map to get a larger view. Travel and add more tacks to the map!<p align="center"><img src="/screenshots/screencapture-localhost-3000-home-2018-04-17-14_29_58.png"></p>
