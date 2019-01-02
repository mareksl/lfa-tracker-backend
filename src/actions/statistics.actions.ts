import { Statistics } from '../models/Statistics.model';
import { IFund } from '../models/Fund.model';
import { hasKey } from '../utils/utils';
import {
  IStatisticsByRank,
  IStatisticsByProperty,
  IStatisticsData
} from '../interfaces/statistics';

const checkComplete = (fund: IFund) =>
  fund.extendedLGCVerified &&
  fund.profileDataVerified &&
  fund.timeSeriesVerified;

const checkCompleteWithPerformance = (fund: IFund) =>
  checkComplete(fund) && fund.performanceVerified;

const calculateComplete = (funds: IFund[]) => {
  return funds.reduce(
    (total, fund) => (checkComplete(fund) ? ++total : total),
    0
  );
};

const calculateCompleteWithPerformance = (funds: IFund[]) => {
  return funds.reduce(
    (total, fund) => (checkCompleteWithPerformance(fund) ? ++total : total),
    0
  );
};

const checkFlagCount = (funds: IFund[], flag: string) => {
  return funds.reduce((result, fund) => {
    if (hasKey(fund, flag)) {
      return fund[flag] ? ++result : result;
    }
    return result;
  }, 0);
};

const calculateBaseStatistics = (funds: IFund[]) => {
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

const groupByProperty: (
  funds: IFund[],
  property: string
) => { [key: string]: IFund[] } = (funds: IFund[], property: string) => {
  return funds.reduce((result: { [key: string]: IFund[] }, fund) => {
    if (hasKey(fund, property)) {
      if (!(fund[property] in result)) {
        result[fund[property]] = [];
      }

      result[fund[property]].push(fund);
    }
    return result;
  }, {});
};

const groupByPropertyArray = (funds: IFund[], property: string) => {
  return funds.reduce((result: { [key: string]: IFund[] }, fund) => {
    if (hasKey(fund, property)) {
      fund[property].forEach((item: string) => {
        if (!(item in result)) {
          result[item] = [];
        }

        result[item].push(fund);
      });
    }
    return result;
  }, {});
};

const calculateStatsByRank = (funds: IFund[]) => {
  const grouped = groupByProperty(funds, 'highestRank');
  const statsByProperty: IStatisticsByRank = {};

  for (const inner in grouped) {
    const funds = grouped[inner];
    statsByProperty[inner] = {
      ...calculateBaseStatistics(funds)
    };
  }

  return statsByProperty;
};

const calculateGroupedStats = (grouped: { [key: string]: IFund[] }) => {
  const statsByProperty: IStatisticsByProperty = {};

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

const calculateStatsByProperty = (funds: IFund[], property: string) => {
  const fundsByProperty = groupByProperty(funds, property);
  return calculateGroupedStats(fundsByProperty);
};

const calculateStatsByPropertyArray = (funds: IFund[], property: string) => {
  const fundsByProperty = groupByPropertyArray(funds, property);
  return calculateGroupedStats(fundsByProperty);
};

const calculateStatsByUniverse = (funds: IFund[]) => {
  return calculateStatsByPropertyArray(funds, 'awardUniverse');
};

const calculateStatsByDepartment = (funds: IFund[]) => {
  return calculateStatsByProperty(funds, 'department');
};

const calculateStatsByFundOwner = (funds: IFund[]) => {
  return calculateStatsByProperty(funds, 'fundOwner');
};

const calculateStatistics = (funds: IFund[]) => {
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

const saveStatistics = (funds: IFund[], date: Date) => {
  const statistics: IStatisticsData = calculateStatistics(funds);
  statistics.date = date;
  const statisticsDoc = new Statistics(statistics);
  return statisticsDoc.save();
};

const removeById = (id: string) => {
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
