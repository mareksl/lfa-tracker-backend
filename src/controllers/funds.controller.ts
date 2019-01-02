import FundsActions from '../actions/funds.actions';
import { pick } from '../utils/utils';
import { Request, Response } from 'express';

const getByID = (req: Request, res: Response) => {
  const id = +req.params.id;
  if (!id) {
    return res.status(404).send();
  }
  FundsActions.findById(id)
    .then(fund => {
      if (!fund) {
        return res.status(404).send();
      }
      return res.send({ fund });
    })
    .catch(err => res.status(500).send(err));
};

const getByQuery = (req: Request, res: Response) => {
  const query = pick(req.query, [
    'fundName',
    'lipperID',
    'fundOwner',
    'department',
    'awardUniverse',
    'highestRank'
  ]);

  const page = +req.query.page || 1;

  const limit =
    (+req.query.limit === 0 ? Number.MAX_SAFE_INTEGER : +req.query.limit) || 10;

  const orderBy: { [key: string]: number } = req.query.orderBy
    ? { [req.query.orderBy]: +req.query.desc === 1 ? -1 : 1 }
    : { fundName: 1 };

  return FundsActions.getByQuery(page, limit, query, orderBy)
    .then(result => {
      const toSend = {
        funds: result.docs,
        page: result.page,
        limit: result.limit,
        pages: result.pages,
        count: result.total
      };
      res.send(toSend);
    })
    .catch(err => res.status(500).send(err));
};

const post = (req: Request, res: Response) => {
  const data = req.body;

  if (Object.keys(data).length === 0) {
    return res.status(400).send();
  }

  FundsActions.add(data)
    .then(fund => res.status(201).send({ fund }))
    .catch(err => res.status(400).send(err));
};

const patch = (req: Request, res: Response) => {
  const id = +req.params.id;
  if (!id) {
    return res.status(404).send();
  }
  const data = req.body;

  FundsActions.modify(id, data)
    .then(fund => {
      if (!fund) {
        return res.status(404).send();
      }

      return res.send({ fund });
    })
    .catch(err => res.status(500).send(err));
};

const deleteAll = (_req: Request, res: Response) => {
  FundsActions.removeAll()
    .then(response => res.send(response))
    .catch(err => res.status(500).send(err));
};

const deleteById = (req: Request, res: Response) => {
  const id = +req.params.id;
  if (!id) {
    return res.status(404).send();
  }
  FundsActions.removeById(id)
    .then(fund => {
      if (!fund) {
        return res.status(404).send();
      }
      return res.send({ fund });
    })
    .catch(err => res.status(500).send(err));
};

export default {
  getByID,
  getByQuery,
  post,
  patch,
  deleteAll,
  deleteById
};
