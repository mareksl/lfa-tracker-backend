import moment from 'moment';
import { model, Model, Schema } from 'mongoose';
import { IStatisticsDocument } from '../interfaces/statistics';

export interface IStatistics extends IStatisticsDocument {}
export interface IStatisticsModel extends Model<IStatistics> {}

const StatisticsSchema: Schema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },

  total: {
    count: Number,
    extendedLGCVerified: Number,
    performanceVerified: Number,
    profileDataVerified: Number,
    timeSeriesVerified: Number,
    complete: Number,
    completeWithPerformance: Number
  },

  rank123: {
    count: Number,
    extendedLGCVerified: Number,
    performanceVerified: Number,
    profileDataVerified: Number,
    timeSeriesVerified: Number,
    complete: Number,
    completeWithPerformance: Number
  },

  byRank: {
    type: {}
  },
  byUniverse: {
    type: {}
  },
  byDepartment: {
    type: {}
  },
  byFundOwner: {
    type: {}
  }
});

StatisticsSchema.pre('save', function(next) {
  const doc = <IStatisticsDocument>this;
  const start = moment(doc.date).startOf('day');
  const end = moment(doc.date).endOf('day');

  Statistics.deleteMany({
    date: {
      $gte: start,
      $lt: end
    }
  }).then(_result => {
    next();
  });
});

export const Statistics: IStatisticsModel = model<
  IStatistics,
  IStatisticsModel
>('Statistics', StatisticsSchema);
