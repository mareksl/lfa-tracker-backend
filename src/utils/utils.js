const padNumber = number => {
  return `${number}`.padStart(2, '0');
};

export const filenameDateString = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${padNumber(day)}.${padNumber(month)}.${padNumber(year)}_${padNumber(
    hours
  )}.${padNumber(minutes)}`;
};

export const toCamelCase = str =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
