import React from 'react'
import axios from "axios";
import {
    Map as LeafletMap, TileLayer, Marker, Popup, Tooltip, CircleMarker
} from 'react-leaflet';

import Form from "./Form";
import { pointerIcon, faceIcon, personIcon } from "./icon";


class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            hasLocation: false,
            center: [0, 0],
            zoom: 2,
            markers: [],
            result: [],
            searchedUser: ''
        }
        this.mapRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.highlightUser = this.highlightUser.bind(this);
    }

    componentDidMount() {
        // Get all the users with their information
        let url = "https://jsonplaceholder.typicode.com/users";
        axios
            .get(url)
            .then(response => {
                let markerArr = []
                response.data.map((user) => {
                    return markerArr.push(user);
                })
                this.setState({ markers: markerArr })
            })
            .catch(err => {
                console.log("Opps", err.message);
            });

        // Locate the current user location
        const map = this.mapRef.current;
        if (map != null) {
            map.leafletElement.locate();
        }
    }

    handleLocationFound = (e) => {
        let radius = e.accuracy / 2;
        this.setState({
            hasLocation: true,
            center: e.latlng,
            radius: radius
        })
    }

    handleLocationError = (e) => {
        alert(e.message);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSearch(event) {
        event.preventDefault();
        const { markers } = this.state;
        let users = markers;
        let user = this.state.searchedUser;
        users = users.filter((item) => {
            return item.name.toLowerCase().search(
                user.toLowerCase()) !== -1;
        });

        this.setState({ result: users });
    }

    highlightUser() {
        if (this.state.result && this.state.result.length > 0) {
            return this.state.result.map((user) => {
                return (
                    <Marker key={`marker_${user.id}`} icon={pointerIcon} position={Object.values(user.address.geo)}>
                        <Popup>
                            <span>Name: {user.name}</span><br />
                            <span>Email: {user.email}</span><br />
                            <span>Phone: {user.phone}</span><br />
                            <span>Website: {user.website}</span><br />
                            <span>Company Name: {user.company.name}</span><br />
                            <span>Address: {user.address.city}</span><br />
                        </Popup>
                    </Marker>
                )
            })
        }
        else {
            return null;
        }
    }

    render() {

        let filteredMarkers = this.state.markers.filter((marker) => {
            return !this.state.result.includes(marker)
        })

        // create an array with marker components
        const LeafletMarkers = filteredMarkers.map((marker) => {
            let position = Object.values(marker.address.geo);

            return (
                <Marker position={position} icon={personIcon} key={`marker_${marker.id}`} >
                    <Popup>
                        <span>Name: {marker.name}</span><br />
                        <span>Email: {marker.email}</span><br />
                        <span>Phone: {marker.phone}</span><br />
                        <span>Website: {marker.website}</span><br />
                        <span>Company Name: {marker.company.name}</span><br />
                        <span>Address: {marker.address.city}</span><br />
                    </Popup>
                    <Tooltip>
                        {marker.name}
                    </Tooltip>
                </Marker >
            );

        });

        return (
            <div style={{ textAlign: 'center' }}>
                <Form
                    handleSearch={this.handleSearch}
                    handleChange={this.handleChange}
                    result={this.state.result} />
                <LeafletMap
                    ref={this.mapRef}
                    onLocationfound={this.handleLocationFound}
                    onLocationError={this.handleLocationError}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}>
                    <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />

                    <CircleMarker center={this.state.center} fillColor="blue" radius={100}>
                        <Marker icon={faceIcon} position={this.state.center} >
                            <Popup>
                                You are within {this.state.radius} meters from this point
                             </Popup>
                        </Marker>
                    </CircleMarker>
                    {this.highlightUser()}
                    {LeafletMarkers}
                </LeafletMap>
            </div>
        );
    }
}

export default Map
