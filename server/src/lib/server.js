import cors from 'cors';
import debug from 'debug';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import UserModel from 'model/user';
import resolvers from '../schema/resolvers';
import typeDefs from '../schema/types';

const app = express(morgan('combined'));
app.use(helmet());
app.use(express.static(path.join(__dirname, '../../static'), { dotfiles: 'allow' }));

const log = debug('server');

// env variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nycparking';

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true }, async function (err) {
  if (err) {
    log(err.message);
    throw err;
  }

  const admin = await UserModel.findOne({ email: 'admin@example.com' });

  if (!admin) {
    await UserModel.register(
      { email: 'admin@example.com', roles: ['admin'] },
      'nycparking',
    );
  }
});

const corsOptions = {
  origin: process.env.CORS_ORIGINS.split(','),
  optionsSuccessStatus: 200,
};

const getCurrentUser = async (req) => {
  const authorization = req.headers['authorization'];

  let user;
  if (authorization) {
    // "Bearer [token]"
    const [prefix, token] = authorization.split(' ');
    if (prefix !== 'Bearer') {
      throw new AuthenticationError('Invalid header.');
    }

    try {
      const data = await jwt.verify(token, process.env.JWT_SECRET);
      user = await UserModel.findById(data._id);
    } catch (e) {

    }

    return user;
  }
};

app.use(bodyParser.json(), cors(corsOptions));


const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({ user: await getCurrentUser(req) })
});

apollo.applyMiddleware({ app });

let server;
if (process.env.HTTPS === '1') {
  server = https.createServer(
    {
      key: fs.readFileSync(process.env.SSL_KEY, 'utf8'),
      cert: fs.readFileSync(process.env.SSL_CERT, 'utf8'),
    },
    app
  );
} else {
  server = http.createServer(app);
}

apollo.installSubscriptionHandlers(server);

app.all('*', (request, response) => {
  log('Returning a 404 from the catch-all route');
  return response.sendStatus(404);
});


export const start = () => {
  server.listen({ port: PORT }, () => {
    log(`Listening on port: ${PORT}`);
  });
};

export const stop = () => {
  server.close(() => {
    log(`Shut down on port: ${PORT}`);
  });
};

export default { start, stop };
