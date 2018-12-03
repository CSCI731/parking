import jwt from 'jsonwebtoken';
import UserModel from 'model/user';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

const Mutation = {};

const createToken = async (user, secret, expiresIn = '2h') => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    secret,
    { expiresIn }
  );

};

Mutation.login = async (parent, { email, password }, { user }) => {
  if (user) {
    throw new AuthenticationError('Already logged in.');
  }

  const result = await UserModel.authenticate()(email, password);

  if(result.error) {
    throw new UserInputError('Credentials do not match.');
  }

  return {token: createToken(result.user, process.env.JWT_SECRET)}

};

export default Mutation;