export interface SearchQuery {
  fundName: string;
  fundOwner: string;
  department: string;
  awardUniverse: string;
  lipperID: string;
  highestRank: string;

  [key: string]: string;
}
