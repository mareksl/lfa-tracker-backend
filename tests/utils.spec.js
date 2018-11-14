import {
  filenameDateString,
  toCamelCase,
  makeRegexObject,
  pick
} from '../src/utils/utils';

const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  );
};

describe('utils', () => {
  describe('filenameDateString', () => {
    it('should generate date string from date object', () => {
      const timestamp = 1540817615582;
      const dateString = `29.10.2018_13.53`;

      expect(filenameDateString(new Date(timestamp))).toBe(dateString);
    });
  });

  describe('toCamelCase', () => {
    it('should convert string to camelCase', () => {
      const stringToConvert = 'Lorem Ipsum';
      const camelCaseString = 'loremIpsum';

      expect(toCamelCase(stringToConvert)).toBe(camelCaseString);
    });
  });

  describe('makeRegexObject', () => {
    it('should create object with regex values', () => {
      const objectToConvert = {
        a: 'lorem',
        b: 'ipsum'
      };

      const regexObject = {
        a: /lorem/i,
        b: /ipsum/i
      };

      const result = makeRegexObject(objectToConvert);

      expect(regexEqual(regexObject.a, result.a)).toBeTruthy();
      expect(regexEqual(regexObject.b, result.b)).toBeTruthy();
    });
  });

  describe('pick', () => {
    it('should return new object with picked properties', () => {
      const original = {
        one: 'one',
        two: true,
        three: {
          one: 1,
          two: 2
        },
        four: 4
      };
      const result = {
        one: 'one',
        three: { one: 1, two: 2 }
      };
      expect(pick(original, ['one', 'three'])).toEqual(result);
    });
  });
});
