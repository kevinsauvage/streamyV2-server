import mongoose from 'mongoose';

import config from './index.js';

console.warn(config.db.url);

mongoose.connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.warn('Mongo has connected succesfully');
});
mongoose.connection.on('reconnected', () => {
  console.warn('Mongo has reconnected');
});
mongoose.connection.on('error', (error) => {
  console.warn('Mongo connection has an error', error);
  mongoose.disconnect();
});
mongoose.connection.on('disconnected', () => {
  console.warn('Mongo connection is disconnected');
});
