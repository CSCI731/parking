import { mergeResolvers } from 'merge-graphql-schemas';
import signResolvers from './sign';
import locationResolvers from './location';
import regulationResolvers from './regulation';


const resolvers = [
  signResolvers,
  locationResolvers,
  regulationResolvers,
];

export default mergeResolvers(resolvers);
