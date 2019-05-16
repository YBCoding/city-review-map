import {BBox, Feature, GeoJsonProperties, Polygon} from "geojson";

export enum Rating {
    ENVIRONMENT = 'ENVIRONMENT',
    TRANSPORTS = 'TRANSPORTS',
    SAFETY = 'SAFETY',
    HEALTH_CARE = 'HEALTH_CARE',
    SPORTS_AND_LEISURES = 'SPORTS_AND_LEISURES',
    CULTURE = 'CULTURE',
    EDUCATION = 'CULTURE',
    SHOPS = 'SHOPS',
    QUALITY_OF_LIFE = 'QUALITY_OF_LIFE'
}

export class CityRating {
    code: String;
    name: String;
    inseeCode: String;
    ratings: Map<Rating, number>;

    constructor(code: String, name: String, inseeCode: String, ratings: Map<Rating, number>) {
        this.code = code;
        this.name = name;
        this.inseeCode = inseeCode;
        this.ratings = ratings;
    }
}

export class CityRatingFeature implements Feature<Polygon, GeoJsonProperties> {
    geometry: Polygon;
    id: string | number;
    properties: GeoJsonProperties;
    type: "Feature";
    bbox: BBox;

    constructor(geometry: Polygon,
                inseeCode: string,
                properties: { [p: string]: any } | null) {
        this.geometry = geometry;
        this.id = inseeCode;
        this.properties = properties;
        this.type = "Feature";
        this.bbox = [0, 0, 0, 0];
    }
}


