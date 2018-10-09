import { mergeTypes } from 'merge-graphql-schemas';
import baseTypes from './base.graphql';
import signTypes from './sign.graphql';
import locationTypes from './location.graphql';
import regulationTypes from './regulation.graphql';

const typeDefs = mergeTypes([
  baseTypes,
  signTypes,
  locationTypes,
  regulationTypes,
]);


export default typeDefs;
