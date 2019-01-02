import { Statistics } from '../models/Statistics.model';

const checkComplete = fund =>
  fund.extendedLGCVerified &&
  fund.profileDataVerified &&
  fund.timeSeriesVerified;

const checkCompleteWithPerformance = fund =>
  checkComplete(fund) && fund.performanceVerified;

const calculateComplete = funds => {
  return funds.reduce(
    (total, fund) => (checkComplete(fund) ? ++total : total),
    0
  );
};

const calculateCompleteWithPerformance = funds => {
  return funds.reduce(
    (total, fund) => (checkCompleteWithPerformance(fund) ? ++total : total),
    0
  );
};

const checkFlagCount = (funds, flag) => {
  return funds.reduce((result, fund) => {
    return fund[flag] ? ++result : result;
  }, 0);
};

const calculateBaseStatistics = funds => {
  return {
    count: funds.length,
    extendedLGCVerified: checkFlagCount(funds, 'extendedLGCVerified'),
    performanceVerified: checkFlagCount(funds, 'performanceVerified'),
    profileDataVerified: checkFlagCount(funds, 'profileDataVerified'),
    timeSeriesVerified: checkFlagCount(funds, 'timeSeriesVerified'),
    complete: calculateComplete(funds),
    completeWithPerformance: calculateCompleteWithPerformance(funds)
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

const calculateStatsByRank = funds => {
  const grouped = groupByProperty(funds, 'highestRank');
  const statsByProperty = {};

  for (const inner in grouped) {
    const funds = grouped[inner];
    statsByProperty[inner] = {
      ...calculateBaseStatistics(funds)
    };
  }

  return statsByProperty;
};

const calculateGroupedStats = grouped => {
  const statsByProperty = {};

  for (const inner in grouped) {
    const funds = grouped[inner];
    statsByProperty[inner] = {
      total: calculateBaseStatistics(funds),
      rank123: calculateBaseStatistics(
        funds.filter(fund => fund.highestRank <= 3)
      ),
      byRank: calculateStatsByRank(funds)
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

const calculateStatsByUniverse = funds => {
  return calculateStatsByPropertyArray(funds, 'awardUniverse');
};

const calculateStatsByDepartment = funds => {
  return calculateStatsByProperty(funds, 'department');
};

const calculateStatsByFundOwner = funds => {
  return calculateStatsByProperty(funds, 'fundOwner');
};

const calculateStatistics = funds => {
  return {
    total: calculateBaseStatistics(funds),
    rank123: calculateBaseStatistics(
      funds.filter(fund => fund.highestRank <= 3)
    ),
    byRank: calculateStatsByRank(funds),
    byUniverse: calculateStatsByUniverse(funds),
    byDepartment: calculateStatsByDepartment(funds),
    byFundOwner: calculateStatsByFundOwner(funds)
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

const removeAll = () => {
  return Statistics.deleteMany({});
};

export default {
  getLatestStatistics,
  getHistoricalStatistics,
  saveStatistics,
  removeById,
  removeAll
};
