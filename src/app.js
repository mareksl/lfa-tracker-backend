import express from 'express';
import fundsController from './controllers/funds.controller';

const app = express();

app.get('', fundsController.get);
app.get('/:id', fundsController.getByID);

export default app;
