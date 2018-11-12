import { mergeResolvers } from 'merge-graphql-schemas';
import signResolvers from './sign';
import locationResolvers from './location';


const resolvers = [
  signResolvers,
  locationResolvers,
];

export default mergeResolvers(resolvers);
