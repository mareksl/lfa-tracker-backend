import { Statistics } from '../models/Statistics.model';

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

const checkFlagCount = (funds, flag) => {
  return funds.reduce((result, fund) => {
    return fund[flag] ? ++result : result;
  }, 0);
};

const calculateFlagStatistics = funds => {
  return {
    extendedLGCVerified: checkFlagCount(funds, 'extendedLGCVerified'),
    performanceVerified: checkFlagCount(funds, 'performanceVerified'),
    profileDataVerified: checkFlagCount(funds, 'profileDataVerified'),
    timeseriesDataVerified: checkFlagCount(funds, 'timeseriesDataVerified')
  };
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

const calculateGroupedStats = grouped => {
  const statsByProperty = {};

  for (const inner in grouped) {
    const funds = grouped[inner];
    statsByProperty[inner] = {
      statsByRank: calculateStatsByRank(funds),
      totalCount: funds.length,
      doneCount: calculateAmountDone(funds),
      percentageDone: calculatePercentageDone(funds),
      ...calculateFlagStatistics(funds)
    };
  }

  return statsByProperty;
};

const calculateStatsByProperty = (funds, property) => {
  const fundsByProperty = groupByProperty(funds, property);
  return calculateGroupedStats(fundsByProperty);
};

const calculateStatsByPropertyArray = (funds, property) => {
  const fundsByProperty = groupByPropertyArray(funds, property);
  return calculateGroupedStats(fundsByProperty);
};

const calculateStatsByRank = funds => {
  const property = 'highestRank';
  return funds.reduce((result, fund) => {
    if (!(fund[property] in result)) {
      result[fund[property]] = {
        totalCount: 0,
        doneCount: 0,
        percentageDone: 0,
        extendedLGCVerified: 0,
        performanceVerified: 0,
        profileDataVerified: 0,
        timeseriesDataVerified: 0
      };
    }

    result[fund[property]].totalCount += 1;
    result[fund[property]].doneCount = checkFundStatus(fund)
      ? result[fund[property]].doneCount + 1
      : result[fund[property]].doneCount;
    result[fund[property]].percentageDone =
      result[fund[property]].doneCount / result[fund[property]].totalCount;

    result[fund[property]].extendedLGCVerified = fund.extendedLGCVerified
      ? result[fund[property]].extendedLGCVerified + 1
      : result[fund[property]].extendedLGCVerified;
    result[fund[property]].performanceVerified = fund.performanceVerified
      ? result[fund[property]].performanceVerified + 1
      : result[fund[property]].performanceVerified;
    result[fund[property]].profileDataVerified = fund.profileDataVerified
      ? result[fund[property]].profileDataVerified + 1
      : result[fund[property]].profileDataVerified;
    result[fund[property]].timeseriesDataVerified = fund.timeseriesDataVerified
      ? result[fund[property]].timeseriesDataVerified + 1
      : result[fund[property]].timeseriesDataVerified;
      
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

const getLatestStatistics = () => {
  return Statistics.findOne()
    .sort({ date: -1 })
    .lean();
};

const getHistoricalStatistics = () => {
  return Statistics.find()
    .sort({ date: -1 })
    .lean();
};

const saveStatistics = (stats, date) => {
  const statistics = calculateStatistics(stats);
  statistics.date = date;
  const statisticsDoc = new Statistics(statistics);
  return statisticsDoc.save();
};

const removeById = id => {
  return Statistics.findByIdAndDelete(id);
};

const removeAll = id => {
  return Statistics.deleteMany({});
};

export default {
  getLatestStatistics,
  getHistoricalStatistics,
  saveStatistics,
  removeById,
  removeAll
};
