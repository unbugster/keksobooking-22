// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInt = (min, max) => {
  if (isNaN(min) || isNaN(max)) {
    throw new Error('Invalid argument type entered.');
  }

  if (min < 0 || max < 0) {
    throw new Error('Invalid argument, one of the arguments is less than zero.');
  }

  if (min < max) {
    [min, max] = [max, min];
  }

  if (min === max) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomFloatBetween = (min, max, floatingPoint = 0) => {
  if (isNaN(floatingPoint) || floatingPoint < 0) {
    throw new Error('Invalid argument entered.');
  }
  const decimalPlaces = Math.pow(10, floatingPoint);

  return getRandomInt(min * decimalPlaces, max * decimalPlaces) / decimalPlaces;
};
