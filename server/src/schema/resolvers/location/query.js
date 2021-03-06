import find from 'lodash/find';
import first from 'lodash/first';
import filter from 'lodash/filter';
import uniq from 'lodash/uniq';
import Location from 'model/location';
import Geonames from 'geonames.js';
import Street from 'lib/street';
import { createClient } from '@google/maps';
import { UserInputError } from 'apollo-server-express';

const googleMapsClient = createClient({
  key: process.env.GMAPS_API_KEY,
  Promise: global.Promise,
});

const geonames = new Geonames({ username: process.env.GN_USERNAME, lan: 'en', encoding: 'JSON' });

const Query = {};

Query.location = async (root, args) => {
  const { _id } = args;
  const location = await Location.findById(_id);
  if (!location) {
    throw new UserInputError('Location not found.');
  }

  return location;
};


Query.locations = async (root, { input, offset, limit }) => {
  const count = await Location.countDocuments(input);

  const selector = input;
  if (selector.boro !== undefined) {
    selector.boro = { $in: selector.boro };
  }
  const query = Location.find(selector).sort({ _id: 1 });

  if (offset) {
    query.skip(offset);
  }

  if (limit) {
    query.limit(limit);
  }

  return {
    totalCount: count,
    locations: query.exec(),
  };
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
