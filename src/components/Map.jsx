import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import axios from "axios";

const mapConfig = {
    center: [51.505, -0.09],
    zoom: 2,
};

class Map extends React.Component {

    constructor() {
        super();
        this.state = {
            markers: [],
        }
    }

    componentDidMount() {
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
    }

    render() {
        // create an array with marker components
        const LeafletMarkers = this.state.markers.map((marker) => {
            let position = Object.values(marker.address.geo);
            return (
                <Marker position={position} key={`marker_${marker.id}`} >
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
            <div className="map" >
                <LeafletMap
                    center={mapConfig.center}
                    zoom={mapConfig.zoom}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}>
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    {LeafletMarkers}
                </LeafletMap>
            </div>
        );
    }
}

export default Map
