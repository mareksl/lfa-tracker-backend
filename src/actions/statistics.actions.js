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

const groupByProperty = (funds, property) => {
  return funds.reduce((result, fund) => {
    if (!(fund[property] in result)) {
      result[fund[property]] = [];
    }

    result[fund[property]].push(fund);
    return result;
  }, {});
};

const groupByPropertyArray = (funds, property) => {
  return funds.reduce((result, fund) => {
    fund[property].forEach(item => {
      if (!(item in result)) {
        result[item] = [];
      }

      result[item].push(fund);
    });
    return result;
  }, {});
};

const calculateStatsByProperty = (funds, property) => {
  const fundsByProperty = groupByProperty(funds, property);
  const statsByProperty = {};

  for (const inner in fundsByProperty) {
    const funds = fundsByProperty[inner];
    statsByProperty[inner] = {
      statsByRank: calculateStatsByRank(funds),
      totalCount: funds.length,
      doneCount: calculateAmountDone(funds),
      percentageDone: calculatePercentageDone(funds)
    };
  }
  return statsByProperty;
};

const calculateStatsByPropertyArray = (funds, property) => {
  const fundsByProperty = groupByPropertyArray(funds, property);
  const statsByProperty = {};

  for (const inner in fundsByProperty) {
    const funds = fundsByProperty[inner];
    statsByProperty[inner] = {
      statsByRank: calculateStatsByRank(funds),
      totalCount: funds.length,
      doneCount: calculateAmountDone(funds),
      percentageDone: calculatePercentageDone(funds)
    };
  }
  return statsByProperty;
};

const calculateStatsByRank = funds => {
  const property = 'highestRank';
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

const calculateStatsByDepartment = funds => {
  return calculateStatsByProperty(funds, 'department');
};

const calculateStatsByAssignee = funds => {
  return calculateStatsByProperty(funds, 'fundOwner');
};

const calculateStatsByUniverse = funds => {
  return calculateStatsByPropertyArray(funds, 'awardUniverse');
};

const calculateStatistics = funds => {
  return {
    totalCount: funds.length,
    doneCount: calculateAmountDone(funds),
    percentageDone: calculatePercentageDone(funds),
    statsByRank: calculateStatsByRank(funds),
    statsByDepartment: calculateStatsByDepartment(funds),
    statsByAssignee: calculateStatsByAssignee(funds),
    statsByUniverse: calculateStatsByUniverse(funds)
  };
};

const getStatistics = () => {
  return FundsActions.getAll().then(funds => {
    return calculateStatistics(funds);
  });
};

export default {
  getStatistics
};
