import jwt from 'jsonwebtoken';
import UserModel from 'model/user';
import { AuthenticationError } from 'apollo-server-express';

const Query = {};

Query.verifyToken = async (root, { token }) => {
  const data = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await UserModel.findById(data._id);
  if (!user) {
    throw new AuthenticationError('Invalid token.');
  }

  return user;
};


export default Query;