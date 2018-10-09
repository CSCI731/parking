import cors from 'cors';
import debug from 'debug';
import morgan from 'morgan';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import schema from '../schema';

const app = express(morgan('combined'));
const log = debug('server');

// env variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nycparking';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(bodyParser.json(), cors());

app.use('/graphql', graphqlExpress({
  schema,
}));

if (process.env.NODE_ENV === 'dev') {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
}

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
    console.log(`Shut down on port: ${PORT}`);
  });
};

export default { start, stop };
