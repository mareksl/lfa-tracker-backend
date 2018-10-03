import FundsActions from './funds.actions';

const checkFundStatus = fund =>
  fund.extendedLGCVerified &&
  fund.performanceVerified &&
  fund.profileDataVerified &&
  fund.timeseriesDataVerified;

const calculateAmountDone = funds => {
  return funds.reduce(
    (total, fund) => (checkFundStatus(fund) ? ++total : total),
    0
  );
};

const calculatePercentageDone = funds => {
  const amountDone = calculateAmountDone(funds);
  return amountDone / funds.length;
};

const calculateStatistics = funds => {
  return {
    totalCount: funds.length,
    doneCount: calculateAmountDone(funds),
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
