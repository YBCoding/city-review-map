import React from 'react';
import './App.css';
import {GeoJSON, LayerGroup, Map, TileLayer, ZoomControl} from 'react-leaflet';
import {LatLngTuple} from 'leaflet';
import 'leaflet/dist/leaflet.css'
import cityRatingFeatures from './model/cityRatingFeatures';
import {CityRatingFeature} from "./model/model";
import {getColor} from "./utils/color";

function toGeoJSON(cityRatingFeature: CityRatingFeature) {
    const style = cityRatingFeature.properties ? toStyle(cityRatingFeature.properties.meanRating) : undefined;
    return <GeoJSON
        key={cityRatingFeature.id}
        data={cityRatingFeature}
        style={style}
    />
}

function toStyle(meanRating: number) {
    return {
        fillColor: getColor(meanRating),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

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
            <LayerGroup>
                {cityRatingFeatures.map(toGeoJSON)}
            </LayerGroup>
        </Map>
    );
};

export default App;
