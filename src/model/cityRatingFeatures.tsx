import {CityRating, CityRatingFeature, Rating} from "./model";
import JSONReviews from '../json-data/ratings.json';
import GEOJSON_94 from '../json-data/94.json';
import GEOJSON_93 from '../json-data/93.json';
import GEOJSON_92 from '../json-data/92.json';

function toRatings(cityRev: any) {
    const ratings: Map<Rating, number> = new Map();
    Object.entries(cityRev.ratings)
        .forEach((val: Array<any>) => {
            const key: keyof typeof Rating = val[0];
            const value: number = val[1];
            ratings.set(Rating[Rating[key]], value)
        });
    return ratings;
}

function toCityRatings(stateData: any) {
    return stateData.cityRatings
        .map((cityRev: any) => new CityRating(cityRev.code, cityRev.name, cityRev.inseeCode, toRatings(cityRev)));
}

function getMean(cityRating: CityRating) {
    const ratings: Array<number> = Array.from(cityRating.ratings.values());
    return ratings.length ? ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / ratings.length : null
}

function toFeature(geojsonCity: any, cityRatingsByINSEECode: Map<string, CityRating>): CityRatingFeature {
    const inseeCode = geojsonCity.properties.code;
    const cityRating = cityRatingsByINSEECode.get(inseeCode);
    let properties = geojsonCity.properties || {};
    if(cityRating) {
        const meanRating = getMean(cityRating);
        properties = {
            ...properties,
            postalCode: cityRating.code,
            ratings: cityRating.ratings,
            meanRating
        };
    }
    return new CityRatingFeature(geojsonCity.geometry, inseeCode, properties)

}

function toData(): Array<CityRatingFeature> {
    const cityRatingsByINSEECode: Map<string, CityRating> = new Map<string, CityRating>();
    const geojsonCities = [...GEOJSON_94.features, ...GEOJSON_93.features, ...GEOJSON_92.features];

    JSONReviews.flatMap(toCityRatings)
        .forEach(cityRating => cityRatingsByINSEECode.set(cityRating.inseeCode, cityRating));

    return geojsonCities.map(geojsonCity => toFeature(geojsonCity, cityRatingsByINSEECode));
}

export default toData();