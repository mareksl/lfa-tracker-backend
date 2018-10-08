import StatisticsActions from '../actions/statistics.actions';

const getAll = (req, res) => {
  StatisticsActions.getStatistics()
    .then(statistics => {
      return res.send({ statistics });
    })
    .catch(err => res.status(500).send(err));
};

export default {
  getAll
};
