import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import './config/config';
import { connect } from './db/mongoose';
import fundsRoutes from './routes/funds';
import filesRoutes from './routes/files';
import statisticsRoutes from './routes/statistics';
import usersRoutes from './routes/users';

const app = express();
const db = connect();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
  exposedHeaders: ['Content-Disposition', 'x-auth']
};
app.use(cors(corsOptions));
app.options('*', cors());

// logging
const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), 'logs', 'access.log'),
  {
    flags: 'a'
  }
);

app.use(
  morgan('combined', {
    stream: accessLogStream
  })
);

// bodyParser json
app.use(bodyParser.json());

app.use('/funds', fundsRoutes);
app.use('/files', filesRoutes);
app.use('/stats', statisticsRoutes);
app.use('/users', usersRoutes);

// catch all
app.all('*', (_req, res) => {
  res.status(404).send('404 Not Found');
});

export default app;
