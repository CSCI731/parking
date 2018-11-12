import cors from 'cors';
import debug from 'debug';
import morgan from 'morgan';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import schema from '../schema';

const app = express(morgan('combined'));
const log = debug('server');

// env variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nycparking';

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(bodyParser.json(), cors());

const server = new ApolloServer(schema);
server.applyMiddleware({ app });

app.all('*', (request, response) => {
  log('Returning a 404 from the catch-all route');
  return response.sendStatus(404);
});


export const start = () => {
  app.listen(PORT, () => {
    log(`Listening on port: ${PORT}`);
  });
};

export const stop = () => {
  app.close(PORT, () => {
    log(`Shut down on port: ${PORT}`);
  });
};

export default { start, stop };
