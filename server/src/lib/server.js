import cors from 'cors';
import debug from 'debug';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import schema from '../schema';

const app = express(morgan('combined'));
app.use(helmet());
app.use(express.static(path.join(__dirname , '../../static'), {dotfiles: 'allow'}));

const log = debug('server');

// env variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nycparking';

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const corsOptions = {
  origin: process.env.CORS_ORIGINS.split(','),
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json(), cors(corsOptions));

const apollo = new ApolloServer(schema);
apollo.applyMiddleware({ app });

let server;
if (process.env.HTTPS === '1') {
  console.log('HTTPS', process.env.HTTPS);
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
