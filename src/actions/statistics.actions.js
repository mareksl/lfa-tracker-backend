import FundsActions from './funds.actions';

const checkFundStatus = fund =>
  fund.extendedLGCVerified &&
  fund.performanceVerified &&
  fund.profileDataVerified &&
  fund.timeseriesDataVerified;

const calculatePercentageDone = funds => {
  const amountDone = funds.reduce(
    (total, fund) => (checkFundStatus(fund) ? ++total : total),
    0
  );
  return amountDone / funds.length;
};

const calculateStatistics = funds => {
  return {
    totalFundCount: funds.length,
    percentageDone: calculatePercentageDone(funds)
  };
};

const getStatistics = () => {
  const funds = FundsActions.getAll();
  const statistics = calculateStatistics(funds);
  return statistics;
};

export default {
  getStatistics
};
