import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import filesController from './controllers/files.controller';
import fundsController from './controllers/funds.controller';
import excelProcessor from './middleware/excelProcessor';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

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

export default app;
