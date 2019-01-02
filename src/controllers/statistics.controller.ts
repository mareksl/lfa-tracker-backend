import StatisticsActions from '../actions/statistics.actions';
import { Request, Response } from 'express';

const getLatest = (_req: Request, res: Response) => {
  StatisticsActions.getLatestStatistics()
    .then(statistics => {
      return res.send({ statistics });
    })
    .catch(err => res.status(500).send(err));
};

const getHistory = (_req: Request, res: Response) => {
  StatisticsActions.getHistoricalStatistics()
    .then(statistics => {
      return res.send({ statistics });
    })
    .catch(err => res.status(500).send(err));
};

const deleteById = (req: Request, res: Response) => {
  const id = req.params.id;
  StatisticsActions.removeById(id)
    .then(statistics => {
      return res.send({ statistics });
    })
    .catch(err => res.status(500).send(err));
};

export default {
  getLatest,
  getHistory,
  deleteById
};
