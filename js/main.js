const getRandomIntInclusive = (min, max) => {
  try {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (isNaN(min) || isNaN(max) || min >= max || min < 0)
      throw new Error('Введены некорректные данные');
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } catch (err) {
    alert('Все плохо');
  }
};
getRandomIntInclusive(2,10);

const getRandomInt = (min, max, decimalPlaces = 0) => {
  try {
    if (isNaN(min) || isNaN(max) || min >= max || min < 0)
      throw new Error('Введены некорректные данные');
    return Number(
      (Math.random() * (max - min) + min).toFixed(decimalPlaces));
  } catch (err) {
    alert('Все очень плохо!');
  }
};
getRandomInt(0, 5.12, 3);