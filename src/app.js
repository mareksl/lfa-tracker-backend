import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import './config/config';
import filesController from './controllers/files.controller';
import fundsController from './controllers/funds.controller';
import statisticsController from './controllers/statistics.controller';
import { connect } from './db/mongoose';
import excelProcessor from './middleware/excelProcessor';
import chalk from 'chalk';

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

const app = express();

// database

const db = connect();

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth'
  );
  next();
});

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
app.get('/funds', fundsController.getAll);
app.get('/funds/:id', fundsController.getByID);
app.post('/funds', fundsController.post);
app.patch('/funds/:id', fundsController.patch);
app.delete('/funds/:id', fundsController.deleteById);

// files
app.get('/files', excelProcessor.exportFile, filesController.getFile);
app.post(
  '/files',
  upload.single('book'),
  excelProcessor.importFile,
  filesController.post
);

// statistics
app.get('/stats', statisticsController.getAll);

// catch all
app.all('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

export default app;
