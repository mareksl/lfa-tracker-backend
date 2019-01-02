import { SearchQuery } from '../interfaces/query';

const padNumber = (number: number) => {
  return `${number}`.padStart(2, '0');
};

export const filenameDateString = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${padNumber(day)}.${padNumber(month)}.${padNumber(year)}_${padNumber(
    hours
  )}.${padNumber(minutes)}`;
};

export const toCamelCase = (str: string) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');

export const makeSearchQuery = (q: SearchQuery) => {
  const stringParams = ['fundName', 'fundOwner', 'department', 'awardUniverse'];
  const numberParams = ['lipperID'];
  const arrayParams = ['highestRank'];

  return Object.keys(q).reduce(
    (result: { [key: string]: number | RegExp | string[] }, key) => {
      if (stringParams.includes(key)) {
        result[key] = new RegExp(q[key], 'i');
      } else if (numberParams.includes(key)) {
        result[key] = +q[key];
      } else if (arrayParams.includes(key)) {
        result[key] = q[key].split(',');
      }

      return result;
    },
    {}
  );
};

export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const ret: any = {};
  keys.forEach(key => {
    if (obj[key] !== undefined && obj[key] !== null) {
      ret[key] = obj[key];
    }
  });
  return ret;
};

export function hasKey<O>(
  obj: O,
  key: string
): key is Extract<keyof O, string> {
  return key in obj;
}
