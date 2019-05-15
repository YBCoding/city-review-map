import React from 'react';
import './App.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {LatLngTuple} from "leaflet";
import 'leaflet/dist/leaflet.css'

const App: React.FC = () => {
    const position: LatLngTuple = [48.8534, 2.3488];
    const zoom = 13;
    let style = {width: '100%', height: '600px'};
    return (
        <Map center={position} zoom={zoom} style={style}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </Map>
    );
};

export default App;
