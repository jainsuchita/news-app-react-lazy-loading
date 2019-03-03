import L from 'leaflet';

// export const iconPerson = new L.Icon({
//     iconUrl: require('./image/marker-pin-person.svg'),
//     iconRetinaUrl: require('./image/marker-pin-person.svg'),
//     iconAnchor: null,
//     popupAnchor: null,
//     shadowUrl: null,
//     shadowSize: null,
//     shadowAnchor: null,
//     iconSize: new L.Point(60, 75),
//     className: 'leaflet-div-icon'
// });

export const pointerIcon = new L.Icon({
    iconUrl: require('./images/highlight2.svg'),
    iconRetinaUrl: require('./images/highlight2.svg'),
    iconAnchor: null,
    popupAnchor: [0, -20],
    iconSize: [40, 40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});

export const faceIcon = new L.Icon({
    iconUrl: require('./images/face.svg'),
    iconRetinaUrl: require('./images/face.svg'),
    iconAnchor: null,
    popupAnchor: [0, -20],
    iconSize: [40, 40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});

export const personIcon = new L.Icon({
    iconUrl: require('./images/normal.svg'),
    iconRetinaUrl: require('./images/normal.svg'),
    iconAnchor: null,
    popupAnchor: [0, -20],
    iconSize: [40, 40],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});
