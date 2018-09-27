import { funds } from '../data/data';

export default {
  get: (_req, res) => {
    return res.send({ funds });
  },
  getByID: (req, res) => {
    const id = req.params.id;

    const fund = funds.find(result => result.id === id);

    if (!fund) {
      return res.status(404).send();
    }
    return res.send({ fund });
  },
  post: (req, res) => {
    const fund = req.body.fund;
    if (!fund) {
      return res.status(400).send();
    }

    funds.push(fund);
    return res.status(201).send({ fund });
  },
  patch: (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    const fund = funds.find(result => result.id === id);
    if (!fund) {
      return res.status(404).send();
    }

    fund.name = name;

    return res.send({ fund });
  },
  delete: (req, res) => {
    const id = req.params.id;
    const pos = funds.findIndex(result => result.id === id);
    if (pos === -1) {
      return res.status(404).send();
    }
    const fund = funds.splice(pos, 1)[0];

    return res.send({ fund });
  }
};
