import { mergeTypes } from 'merge-graphql-schemas';
import baseTypes from './base.graphql';
import signTypes from './sign.graphql';
import userTypes from './user.graphql';
import authTypes from './auth.graphql';
import locationTypes from './location.graphql';

const typeDefs = mergeTypes([
  baseTypes,
  signTypes,
  locationTypes,
  userTypes,
  authTypes,
]);


export default typeDefs;
