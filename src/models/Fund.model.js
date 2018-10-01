export class Fund {
  constructor(data) {
    this.lipperId = data.lipperId;
    this.awardUniverse = data.awardUniverse;
    this.awardPeriod = data.awardPeriod;
    this.highestRank = data.highestRank;
    this.fundName = data.fundName;
    this.domicile = data.domicile;
    this.advisorCompanyCode = data.advisorCompanyCode;
    this.advisorCompanyName = data.advisorCompanyName;
    this.promoterCompanyCode = data.promoterCompanyCode;
    this.promoterCompanyName = data.promoterCompanyName;
    this.fundOwner = data.fundOwner;
    this.department = data.department;
    this.classificationScheme = data.classificationScheme;
    this.isinCode = data.isinCode;
    this.assetTypeName = data.assetTypeName;
    this.classificationName = data.classificationName;
    this.awardVerifiedNoteDate = data.awardVerifiedNoteDate;
    this.awardVerifiedNoteText = data.awardVerifiedNoteText;
    this.extendedLGCVerified = data.extendedLGCVerified;
    this.performanceVerified = data.performanceVerified;
    this.profileDataVerified = data.profileDataVerified;
    this.timeseriesDataVerified = data.timeseriesDataVerified;
  }
  
  modify(data) {
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        this[prop] = data[prop];
      }
    }
  }
}
