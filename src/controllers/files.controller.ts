import FundsActions from '../actions/funds.actions';
import StatisticsActions from '../actions/statistics.actions';
import { filenameDateString } from '../utils/utils';
import moment from 'moment';
import { Fund } from '../models/Fund.model';
import { Request, Response } from 'express';
import { IFundData } from '../interfaces/fund';

const getFile = (_req: Request, res: Response) => {
  const file = res.locals.file;
  const date = new Date();
  const filename = `LFA_Tracker_Export_${filenameDateString(date)}`;

  res.attachment(`${filename}.xlsx`);
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(file);
};

const post = (req: Request, res: Response) => {
  const data = res.locals.data;

  const date = req.body.date
    ? moment(req.body.date).toDate()
    : moment().toDate();
  const overwriteFunds = req.body.overwriteFunds === 'true';

  if (!overwriteFunds) {
    const funds = data.map((fund: IFundData) => new Fund(fund));
    return StatisticsActions.saveStatistics(funds, date)
      .then(statistics => {
        return res.status(201).send({ statistics });
      })
      .catch(err => res.status(500).send(err));
  } else {
    return FundsActions.addMany(data)
      .then(result => {
        return StatisticsActions.saveStatistics(result, date);
      })
      .then(statistics => {
        return res.status(201).send({ statistics });
      })
      .catch(err => res.status(500).send(err));
  }
};

export default {
  getFile,
  post
};
