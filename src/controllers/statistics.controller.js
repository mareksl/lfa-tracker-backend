import StatisticsActions from '../actions/statistics.actions';

const getLatest = (_req, res) => {
  StatisticsActions.getLatestStatistics()
    .then(statistics => {
      return res.send({ statistics });
    })
    .catch(err => res.status(500).send(err));
};

const getHistory = (_req, res) => {
  StatisticsActions.getHistoricalStatistics()
    .then(statistics => {
      return res.send({ statistics });
    })
    .catch(err => res.status(500).send(err));
};

const deleteById = (req, res) => {
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
