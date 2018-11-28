import mongoose from 'mongoose';
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
    type: {}
  },
  statsByDepartment: {
    type: {}
  },
  statsByAssignee: {
    type: {}
  },
  statsByUniverse: {
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
