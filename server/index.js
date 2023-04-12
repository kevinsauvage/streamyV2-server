import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import http from 'node:http';

import './config/mongo.js';

import config from './config/cors.js';
import { decode } from './middlewares/jwt.js';
import authRouter from './routes/auth.js';
import commentRouter from './routes/comment.js';
import userRouter from './routes/user.js';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

/** Get port from environment and store in Express. */
const port = process.env.PORT || '5000';

app.set('port', port);

// cors whitelist
app.use(
  cors({
    origin: (origin, callback) => {
      if (config.cors.includes(origin)) {
        callback(undefined, true);
        return;
      }
      const error = new Error('Not allowed by CORS');
      error.status = 403;
      callback(error);
    },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/users', decode, userRouter);
app.use('/comments', decode, commentRouter);

/** catch 404 and forward to error handler */
app.use('*', (_, response) =>
  response.status(404).json({ message: 'API endpoint doesnt exist', success: false })
);

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on('listening', () => console.warn(`Listening on port:: http://localhost:${port}/`));
