import { mergeResolvers } from 'merge-graphql-schemas';
import signResolvers from './sign';
import locationResolvers from './location';
import authResolvers from './auth';


const resolvers = [
  signResolvers,
  locationResolvers,
  authResolvers,
];

export default mergeResolvers(resolvers);
