import FundsActions from '../actions/funds.actions';

const getAll = (_req, res) => {
  const funds = FundsActions.getAll();
  return res.send({ funds });
};

const getByID = (req, res) => {
  const id = +req.params.id;
  const fund = FundsActions.findById(id);

  if (!fund) {
    return res.status(404).send();
  }
  return res.send({ fund });
};

const post = (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 0) {
    return res.status(400).send();
  }
  const fund = FundsActions.add(data);
  return res.status(201).send({ fund });
};

const patch = (req, res) => {
  const id = +req.params.id;
  const data = req.body;
  const fundToModify = FundsActions.findById(id);

  if (!fundToModify) {
    return res.status(404).send();
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).send();
  }

  const fund = FundsActions.modify(fundToModify, data);

  return res.send({ fund });
};

const deleteById = (req, res) => {
  const id = +req.params.id;
  const fund = FundsActions.removeById(id);
  if (!fund) {
    return res.status(404).send();
  }
  return res.send({ fund });
};

export default {
  getAll,
  getByID,
  post,
  patch,
  deleteById
};
