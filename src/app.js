import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import './config/config';
import filesController from './controllers/files.controller';
import fundsController from './controllers/funds.controller';
import statisticsController from './controllers/statistics.controller';
import usersController from './controllers/users.controller';
import { connect } from './db/mongoose';
import { authenticate } from './middleware/authenticate';
import excelProcessor from './middleware/excelProcessor';

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype === 'application/vnd.ms-excel'
    ) {
      cb(null, true);
    }
    cb(null, false);
  }
});

const app = express();

// database

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

// funds
app.get('/funds', authenticate, fundsController.getByQuery);
app.get('/funds/:id', authenticate, fundsController.getByID);
app.post('/funds', authenticate, fundsController.post);
app.patch('/funds/:id', authenticate, fundsController.patch);
app.delete('/funds', authenticate, fundsController.deleteAll);
app.delete('/funds/:id', authenticate, fundsController.deleteById);

// files
app.get(
  '/files',
  authenticate,
  excelProcessor.exportFile,
  filesController.getFile
);
app.post(
  '/files',
  authenticate,
  upload.single('file'),
  excelProcessor.importFile,
  filesController.post
);

// statistics
app.get('/stats', authenticate, statisticsController.getLatest);
app.get('/stats/history', authenticate, statisticsController.getHistory);
app.delete('/stats/:id', authenticate, statisticsController.deleteById);

// users
app.get('/users/me', authenticate, usersController.getUser);
app.post('/users', usersController.createUser);
app.post('/users/login', usersController.login);
app.delete('/users/me/token', authenticate, usersController.logout);
app.patch('/users/me', authenticate, usersController.patch);

// catch all
app.all('*', (_req, res) => {
  res.status(404).send('404 Not Found');
});

export default app;