import { Document } from 'mongoose';

export interface IStatisticsCollection {
  count: number;
  extendedLGCVerified: number;
  performanceVerified: number;
  profileDataVerified: number;
  timeSeriesVerified: number;
  complete: number;
  completeWithPerformance: number;
}

export interface IStatisticsByRank {
  [name: string]: IStatisticsCollection;
}

export interface IStatisticsItem {
  total: IStatisticsCollection;
  rank123: IStatisticsCollection;
  byRank: IStatisticsByRank;
}

export interface IStatisticsByProperty {
  [name: string]: IStatisticsItem;
}

export interface IStatisticsData extends IStatisticsItem {
  byRank: IStatisticsByRank;
  byDepartment: IStatisticsByProperty;
  byFundOwner: IStatisticsByProperty;
  byUniverse: IStatisticsByProperty;
  date?: Date;
}

export interface IStatisticsDocument extends IStatisticsData, Document {}
