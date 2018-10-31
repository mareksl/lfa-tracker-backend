import FundsActions from '../actions/funds.actions';
import StatisticsActions from '../actions/statistics.actions';
import { filenameDateString } from '../utils/utils';

const getFile = (_req, res) => {
  const file = res.locals.file;
  const date = new Date();
  const filename = `LFA_Tracker_Export_${filenameDateString(date)}`;

  res.attachment(`${filename}.xlsx`);
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(file);
};

const post = (_req, res) => {
  const data = res.locals.data;

  FundsActions.addMany(data)
    .then(result => {
      return StatisticsActions.saveStatistics(result);
    })
    .then(statistics => {
      return res.status(201).send({ statistics });
    })
    .catch(err => res.status(500).send(err));
};

export default {
  getFile,
  post
};
