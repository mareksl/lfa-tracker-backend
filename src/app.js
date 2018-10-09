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
import cors from 'cors';

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

const app = express();

// database

const db = connect();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
  exposedHeaders: ['Content-Disposition']
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
app.get('/funds', fundsController.getAll);
app.get('/funds/:id', fundsController.getByID);
app.post('/funds', fundsController.post);
app.patch('/funds/:id', fundsController.patch);
app.delete('/funds', fundsController.deleteAll);
app.delete('/funds/:id', fundsController.deleteById);

// files
app.get('/files', excelProcessor.exportFile, filesController.getFile);
app.post(
  '/files',
  upload.single('file'),
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
