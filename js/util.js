const getRandomInt = (min, max) => {
  if (isNaN(min) || isNaN(max)) {
    throw new Error('Invalid argument type entered.');
  }

  if (min < 0 || max < 0) {
    throw new Error('Invalid argument, one of the arguments is less than zero.');
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  if (min === max) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatBetween = (min, max, decimalPlaces = 0) => {
  if (isNaN(decimalPlaces) || decimalPlaces < 0) {
    throw new Error('Invalid argument entered.');
  }

  const multiplier = Math.pow(10, decimalPlaces);

  return getRandomInt(min * multiplier, max * multiplier) / multiplier;
};

const getRandomList = (array) => {
  const newArray = array.filter((el) => {
    if (getRandomInt(0, 50) > 25) {
      return el;
    }
  })

  return newArray;
};

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

let formattedNumber = (num) => {
  return ('0' + num).slice(-2);
};

export { getRandomArrayElement, getRandomInt, getRandomFloatBetween, getRandomList, formattedNumber }
