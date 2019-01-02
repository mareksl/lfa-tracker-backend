import { Schema, Model, model, PaginateModel } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from 'mongoose-paginate';
import { IFundDocument } from '../interfaces/fund';

export interface IFund extends IFundDocument {}
export interface IFundModel extends Model<IFund>, PaginateModel<IFund> {}

const toArray = (v: string | string[]) =>
  typeof v === 'string' ? v.split(',') : v;

const FundSchema: Schema = new Schema(
  {
    lipperID: {
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
    iSINCode: {
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
    timeSeriesVerified: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    collation: { locale: 'en_US' }
  }
);

(<any>Schema.Types.Boolean).convertToFalse.add('No');
(<any>Schema.Types.Boolean).convertToTrue.add('Yes');

FundSchema.plugin(uniqueValidator);
FundSchema.plugin(mongoosePaginate);

export const Fund: IFundModel = model<IFund, IFundModel>('Fund', FundSchema);
