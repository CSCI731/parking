import Location from 'model/location';
import Geonames from 'geonames.js';
import Street from 'lib/street';

const geonames = new Geonames({ username: process.env.GN_USERNAME, lan: 'en', encoding: 'JSON' });

const Query = {};

Query.location = async (root, args) => {
  const { _id } = args;
  return Location.findOne({ _id }).exec();
};


Query.locations = async (root, args) => {
  const { boro, main_st: mainSt } = args;
  let selector = { boro };
  if (mainSt) {
    selector = Object.assign({}, selector, { main_st: mainSt });
  }
  return Location.find(selector, null, { limit: 50 }).exec();
};

Query.locationsByLatLng = async (root, args) => {
  const { lat, lng } = args;
  // get near street
  const response = await geonames.findNearbyStreets({ lat, lng, maxRows: 10 });
  const streetNames = [];
  response.streetSegment.forEach(street => {
    const { name } = street;
    if (name.trim()) {
      const streetName = Street.standardizeStreetName(name.trim());
      if (!streetNames[streetName]) {
        streetNames.push(streetName);
      }
    }
  });

  return Location.find({ main_st: { $in: streetNames } }).exec();
};

export default Query;
