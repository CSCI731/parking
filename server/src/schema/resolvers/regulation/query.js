import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import streetTypes from 'street-types';
import Location from 'model/location';
import Sign from 'model/sign';
import Geonames from 'geonames.js';

const geonames = new Geonames({ username: process.env.GN_USERNAME, lan: 'en', encoding: 'JSON' });

const log = require('debug')('regulation');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS_API_KEY,
  Promise,
});

const standardizeStreetName = (streetName) => {
  // remove ordinals from street names (e.g. 145th Ave => 145 Ave)
  const ordinalRE = /(?<=[0-9])(?:st|nd|rd|th)/i;
  let formattedStreetName = streetName.replace(ordinalRE, '');

  // change Street Suffix Abbreviations to street suffix full name
  const components = formattedStreetName.split(' ');

  if (components.length > 1) {
    const abbr = components.pop();

    const streetType = find(streetTypes, type => type.standardAbbr === abbr.toUpperCase());

    if (streetType) {
      formattedStreetName = [...components, streetType.suffix].join(' ');
    } else {
      formattedStreetName = [...components, abbr].join(' ');
    }
  }

  // to upper case
  const result = formattedStreetName.toUpperCase();
  log(result);
  return result;
};

const Query = {};

Query.regulations = async (root, args) => {
  return [];
};

export default Query;
