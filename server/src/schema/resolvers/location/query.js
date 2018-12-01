import find from 'lodash/find';
import first from 'lodash/first';
import filter from 'lodash/filter';
import uniq from 'lodash/uniq';
import Location from 'model/location';
import Geonames from 'geonames.js';
import Street from 'lib/street';
import { createClient } from '@google/maps';

const googleMapsClient = createClient({
  key: process.env.GMAPS_API_KEY,
  Promise: global.Promise,
});

const geonames = new Geonames({ username: process.env.GN_USERNAME, lan: 'en', encoding: 'JSON' });

const Query = {};

Query.location = async (root, args) => {
  const { _id } = args;
  return Location.findOne({ _id }).exec();
};


Query.locations = async (root, { input }) => {
  return await Location.find(input, null, { limit: 50 });
};

Query.reverseGeocode = async (root, args) => {
  const { lat, lng } = args;
  const response = await googleMapsClient.reverseGeocode({
    latlng: [lat, lng],
    location_type: 'ROOFTOP',
  }).asPromise();

  const { results } = response.json;

  const result = first(results);
  const { address_components } = result;
  const street = find(address_components, address_component => address_component.types.includes('route'));
  return Street.standardizeStreetName(street.long_name);
};

Query.locationsByLatLng = async (root, args) => {
  const { lat, lng } = args;
  // get boro first
  let response = await googleMapsClient.reverseGeocode({
    latlng: [lat, lng],
    // location_type: 'ROOFTOP',
    result_type: 'sublocality',
  }).asPromise();
  const { results } = response.json;
  const address_components = results[0].address_components;
  const component = find(address_components, component => component.types.includes('sublocality'));

  let boro;
  switch (component.long_name) {
    case 'Bronx':
      boro = 'B';
      break;
    case 'Brooklyn':
      boro = 'K';
      break;
    case 'Queens':
      boro = 'Q';
      break;
    case 'Manhattan':
      boro = 'M';
      break;
    case 'Staten Island':
      boro = 'S';
      break;
  }

  // get near streets
  response = await geonames.findNearbyStreets({ lat, lng, maxRows: 10 });
  const streetNames = response.streetSegment.map((street) => {
    const { name } = street;
    const tName = name.trim();
    return tName ? Street.standardizeStreetName(tName.trim()) : tName;
  });

  return {
    boro,
    streetNames: uniq(filter(streetNames)),
  };
};

export default Query;
