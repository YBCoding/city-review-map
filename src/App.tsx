import React, {MutableRefObject, useRef} from 'react';
import './App.css';
import {LayerGroup, Map, TileLayer} from 'react-leaflet';
import {LatLngTuple} from 'leaflet';
import 'leaflet/dist/leaflet.css'
import cityRatingFeatures from './model/cityRatingFeatures';
import StateGeoJSON from "./utils/StateGeoJSON";

const App: React.FC = () => {
    const position: LatLngTuple = [48.8534, 2.3488];
    const zoom = 13;
    let style = {width: '100%', height: '600px'};
    const refMap: MutableRefObject<Map | any> = useRef();
    return (
        <Map
            center={position}
            zoom={zoom}
            style={style}
            onClick={''}
            ref={refMap}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <LayerGroup>
                {cityRatingFeatures.map(cityRatingFeature =>
                    <StateGeoJSON
                        key={cityRatingFeature.id}
                        cityRatingFeature={cityRatingFeature}
                        refMap={refMap}/>)}
            </LayerGroup>
        </Map>
    );
};

export default App;
