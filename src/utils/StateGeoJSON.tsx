import React, {MutableRefObject, useRef} from "react";
import {CityRatingFeature} from "../model/model";
import {GeoJSON, Map,} from "react-leaflet";
import {getColor} from "./color";
import {Feature, GeoJsonProperties, GeometryObject} from "geojson";
import {Layer, LeafletEvent} from "leaflet";


export class StateGeoJSONProps {
    cityRatingFeature: CityRatingFeature;
    refMap: React.MutableRefObject<Map | any>;

    constructor(cityRatingFeature: CityRatingFeature,
                refContext: React.MutableRefObject<Map | undefined>) {
        this.cityRatingFeature = cityRatingFeature;
        this.refMap = refContext;
    }
}

const StateGeoJSON: React.FC<StateGeoJSONProps> = (props: StateGeoJSONProps) => {
    const {cityRatingFeature, refMap} = props;
    const style = cityRatingFeature.properties ? toStyle(cityRatingFeature.properties.meanRating) : undefined;
    const ref: MutableRefObject<GeoJSON | any> = useRef();
    return <GeoJSON
        data={cityRatingFeature}
        style={style}
        onEachFeature={onEachFeature(ref, refMap)}
        ref={ref}
    />
};


const toStyle = (meanRating: number) => {
    return {
        fillColor: getColor(meanRating),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
};

const onEachFeature = (refGeoJSON: MutableRefObject<GeoJSON | any>,
                       refMap: React.MutableRefObject<Map | any>) =>
    (feature: Feature<GeometryObject, GeoJsonProperties>, layer: Layer) => {

        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight(refGeoJSON),
            click: zoomToFeature(refMap)
        });
    };

const zoomToFeature = (refMap: React.MutableRefObject<Map | any>) => (e: LeafletEvent) => {
    refMap.current && refMap.current.leafletElement &&
    refMap.current.contextValue && refMap.current.contextValue.map &&
    refMap.current.contextValue.map.fitBounds(e.target.getBounds());
};

const highlightFeature = (e: LeafletEvent) => {
    const layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
};

const resetHighlight = (refGeoJSON: MutableRefObject<GeoJSON | any>) => (e: LeafletEvent) => {
    refGeoJSON && refGeoJSON.current &&
    refGeoJSON.current.leafletElement.resetStyle(e.target)
};


export default StateGeoJSON;
