import LocationModel from 'model/location';
import { isAdmin } from "../../../lib/auth";
import { AuthenticationError } from 'apollo-server-express';

const Mutation = {};

Mutation.addLocation = async (parent, { input }, { user }) => {
  if (!isAdmin(user)) {
    throw new AuthenticationError('Permission Deny');
  }

  return await LocationModel.insertOne(input);
};

Mutation.removeLocation = async (parent, { input }, { user }) => {
  if (!isAdmin(user)) {
    throw new AuthenticationError('Permission Deny');
  }

  await LocationModel.deleteOne(input);
  return true;
};

Mutation.updateLocation = async (parent, { input }, { user }) => {
  const { _id, ...rest } = input;
  if (!isAdmin(user)) {
    throw new AuthenticationError('Permission Deny');
  }

  return await LocationModel.updateOne({ _id }, rest);
};

export default Mutation;
