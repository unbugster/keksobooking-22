// Returns random integer from the passed range inclusive
const getRandomBetween = (...args) => {
  let [min, max] = args;

  if (isNaN(min) || isNaN(max)) {
    throw new Error('Invalid argument type entered.');
  }
  if (min < 0 || max < 0) {
    throw new Error('A negative value has been entered.');
  }
  if (min === max) {
    return min;
  }
  if (min > max) {
    [min, max] = [max, min];
  }

  return (
    Math.floor(Math.random() * (max - min + 1)) + Math.floor(min));
};

// Returns a random floating point number from the passed range inclusive.
const getRandomFloatBetween = (min, max, decimalPlaces = 0) => {
  if (isNaN(decimalPlaces) || decimalPlaces < 0) {
    throw new Error('Invalid argument entered.');
  }
  const multiplier = Math.pow(10, decimalPlaces);

  return getRandomBetween(min * multiplier, max * multiplier) / multiplier;
};

const getAvatarImg = (i) => {
  const avatarId = `${i}`.padStart(2, '0');

  return `img/avatars/user${avatarId}.png`;
}

// Функция возращает случайный элемент массива
const getRandomArrayElement = (array) => {
  return array[getRandomBetween(0, array.length - 1)];
};
// Функция возращает случайный массив рандомной длины
const shouldTakeNumber = () => Boolean(getRandomBetween(0, 1));
const getRandomArrayList = (array) => {
  let result = [];
  while (!result.length) {
    result = array.filter(shouldTakeNumber)
  }

  return result;
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export { getRandomArrayList, getRandomArrayElement, getRandomFloatBetween, getRandomBetween, getAvatarImg, isEscEvent };
