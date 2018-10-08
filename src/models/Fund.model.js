import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import upsertMany from '@meanie/mongoose-upsert-many';

const toArray = v => (typeof v === 'string' ? v.split(',') : v);

const FundSchema = new mongoose.Schema({
  lipperId: {
    type: Number,
    required: true,
    unique: true
  },
  awardUniverse: {
    type: [String],
    required: true,
    set: toArray
  },
  awardPeriod: {
    type: [Number],
    required: true,
    set: toArray
  },
  highestRank: {
    type: Number,
    required: true
  },
  fundName: {
    type: String
  },
  domicile: {
    type: String
  },
  advisorCompanyCode: {
    type: Number
  },
  advisorCompanyName: {
    type: String
  },
  promoterCompanyCode: {
    type: Number
  },
  promoterCompanyName: {
    type: String
  },
  fundOwner: {
    type: String,
    required: true,
    default: 'Not Provided'
  },
  department: {
    type: String,
    required: true,
    default: 'Not Provided'
  },
  classificationScheme: {
    type: String
  },
  isinCode: {
    type: String
  },
  assetTypeName: {
    type: String
  },
  classificationName: {
    type: String
  },
  awardVerifiedNoteDate: {
    type: Date
  },
  awardVerifiedNoteText: {
    type: String
  },
  extendedLGCVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  performanceVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  profileDataVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  timeseriesDataVerified: {
    type: Boolean,
    required: true,
    default: false
  }
});

FundSchema.plugin(uniqueValidator);
FundSchema.plugin(upsertMany);

export const Fund = mongoose.model('Fund', FundSchema);
