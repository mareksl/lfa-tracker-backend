import StatisticsActions from '../actions/statistics.actions';

const getAll = (req, res) => {
  const statistics = StatisticsActions.getStatistics();
  res.send({ statistics });
};

export default {
  getAll
};
