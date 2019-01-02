import mongoose from 'mongoose';
import moment from 'moment';

const StatisticsSchema = mongoose.Schema({
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
  const doc = this;
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

export const Statistics = mongoose.model('Statistics', StatisticsSchema);
