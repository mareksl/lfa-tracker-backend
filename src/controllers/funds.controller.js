import { funds } from '../data/data';
import { Fund } from '../models/Fund.model';

const getAll = (_req, res) => {
  return res.send({ funds });
};

const getByID = (req, res) => {
  const id = req.params.id;
  const fund = funds.find(result => result.id === id);

  if (!fund) {
    return res.status(404).send();
  }
  return res.send({ fund });
};

const post = (req, res) => {
  const data = req.body;
  if (!data.id || !data.name) {
    return res.status(400).send();
  }

  const fund = new Fund(data.id, data.name);

  funds.push(fund);
  return res.status(201).send({ fund });
};

const patch = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const fund = funds.find(result => result.id === id);

  if (!fund) {
    return res.status(404).send();
  }
  
  if (!name) {
    return res.status(400).send();
  }

  fund.name = name;

  return res.send({ fund });
};

const deleteById = (req, res) => {
  const id = req.params.id;
  const pos = funds.findIndex(result => result.id === id);
  if (pos === -1) {
    return res.status(404).send();
  }
  const fund = funds.splice(pos, 1)[0];

  return res.send({ fund });
};

export default {
  getAll,
  getByID,
  post,
  patch,
  deleteById
};
