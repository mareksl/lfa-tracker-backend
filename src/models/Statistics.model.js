import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const StatisticsSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  totalCount: {
    type: Number
  },
  doneCount: {
    type: Number
  },
  percentageDone: {
    type: Number
  },
  statsByRank: {
    type: Schema.Types.Mixed
  },
  statsByDepartment: {
    type: Schema.Types.Mixed
  },
  statsByAssignee: {
    type: Schema.Types.Mixed
  },
  statsByUniverse: {
    type: Schema.Types.Mixed
  }
});

StatisticsSchema.pre('save', function(next) {
  const today = moment().startOf('day');

  Statistics.deleteMany({
    date: {
      $gte: today.toDate()
    }
  }).then(_result => {
    next();
  });
});

export const Statistics = mongoose.model('Statistics', StatisticsSchema);
