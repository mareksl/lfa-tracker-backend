import { Document } from 'mongoose';

export interface IFundData {
  lipperID: number;
  awardUniverse: string[];
  awardPeriod: number[];
  highestRank: number;

  fundName: string;
  domicile: string;
  advisorCompanyCode: number;
  advisorCompanyName: string;
  promoterCompanyCode: number;
  promoterCompanyName: string;

  fundOwner: string;
  department: string;
  classificationScheme: string;
  iSINCode: string;
  assetTypeName: string;
  classificationName: string;
  awardVerifiedNoteDate: Date;
  awardVerifiedNoteText: string;
  extendedLGCVerified: boolean;
  performanceVerified: boolean;
  profileDataVerified: boolean;
  timeSeriesVerified: boolean;
}

export interface IFundDocument extends IFundData, Document {}
