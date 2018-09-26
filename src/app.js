import bodyParser from 'body-parser';
import express from 'express';
import fundsController from './controllers/funds.controller';


const app = express();

app.use(bodyParser.json());

// /funds
app.get('/funds', fundsController.get);
app.get('/funds/:id', fundsController.getByID);
app.post('/funds', fundsController.post);
app.patch('/funds/:id', fundsController.patch);
app.delete('/funds/:id', fundsController.delete);

export default app;
