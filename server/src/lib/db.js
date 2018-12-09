import debug from 'debug' ;
import mongoose from 'mongoose';

const logger = debug('server');

export const db = mongoose.connection;

export const connect = (callback) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true }, async function (error) {
    if (error) {
      logger('MongoDB connection error.');
      throw error;
    }

    logger('MongoDB connected.');

    if (callback && typeof callback === 'function') {
      callback();
    }

  });
};

export const disconnect = (callback) => {
  mongoose.disconnect(callback);
};

export default {
  connect,
  disconnect,
  connection: db,
}
