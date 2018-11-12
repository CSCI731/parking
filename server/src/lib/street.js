/**
 * File: street.js
 * Project: NYCParking
 * -----
 */
import streetTypes from 'street-types';
import find from 'lodash/find';

export const standardizeStreetName = (streetName) => {
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
  return formattedStreetName.toUpperCase();
};

export default {
  standardizeStreetName,
};
