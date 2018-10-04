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

const calculateStatsByProperty = (funds, property) => {
  return funds.reduce((result, fund) => {
    if (!(fund[property] in result)) {
      result[fund[property]] = {
        totalCount: 0,
        doneCount: 0,
        percentageDone: 0
      };
    }

    result[fund[property]].totalCount += 1;
    result[fund[property]].doneCount = checkFundStatus(fund)
      ? result[fund[property]].doneCount + 1
      : result[fund[property]].doneCount;
    result[fund[property]].percentageDone =
      result[fund[property]].doneCount / result[fund[property]].totalCount;
    return result;
  }, {});
};

const calculateStatsByRank = funds => {
  return calculateStatsByProperty(funds, 'highestRank');
};

const calculateStatsByDepartment = funds => {
  return calculateStatsByProperty(funds, 'department');
};

const calculateStatsByAssignee = funds => {
  return calculateStatsByProperty(funds, 'fundOwner');
};

const calculateStatistics = funds => {
  return {
    totalCount: funds.length,
    doneCount: calculateAmountDone(funds),
    percentageDone: calculatePercentageDone(funds),
    statsByRank: calculateStatsByRank(funds),
    statsByDepartment: calculateStatsByDepartment(funds),
    statsByAssignee: calculateStatsByAssignee(funds)
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
