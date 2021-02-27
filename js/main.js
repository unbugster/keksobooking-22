const OFFERS_COUNT = 10;
const DIGITS_COUNT = 2;
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];

const TITLES = [
  'Апартаменты Villa Ikebukuro.',
  'Дом для отпуска Koenji House с 3 спальнями.',
  'Эко отель Mitsui Garden Ueno.',
  'Комплекс домов для отпуска.',
  'Гостевой дом LY INN Ryogoku Annex.',
  'Отель Annex Katsutaro Ryokan.',
  'Дом для отпуска Araiya в самом центре Токио.',
  'Отель для некурящих Asakusa Ryokan Toukaisou.',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const DESCRIPTIONS = [
  'Из номеров открывается прекрасный вид на гору.',
  'Номера оснащены кондиционером, телевизором с плоским экраном и спутниковыми каналами.',
  'Номера в отеле оформлены с использованием деревянных панелей Хоккайдо и бельем из египетского хлопка.',
  'В числе удобств телевизор с плоским экраном и собственная ванная комната.',
  'Все номера отеля оснащены чайником, кондиционером и телевизором.',
  'Расстояние до международного аэропорта Токио-Ханэда составляет 30 км.',
];
const Guests = {
  min:1,
  max:6,
}
const Coordinates = {
  minX: 35.65,
  maxX: 35.7,
  minY:139.7,
  maxY:139.8,
}

const Prices = {
  min: 5000,
  max: 50000,
}

const Rooms = {
  min:1,
  max:4,
}

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
const getRandomArrayList = (array) => {
  const shouldTakeNumber = () => Boolean(getRandomBetween(0, 1));
  let result = [];
  while (!result.length) {
    result = array.filter(shouldTakeNumber)
  }

  return result;
};

// Функция, возвращающая 1 нужный объект
const createAd = () => {
  const coordX = getRandomFloatBetween(Coordinates.minX, Coordinates.maxX, DIGITS_COUNT);
  const coordY = getRandomFloatBetween(Coordinates.minY, Coordinates.maxY, DIGITS_COUNT);
  const check = getRandomArrayElement(CHECKINS_CHECKOUTS);

  return {
    author: {
      avatar: getAvatarImg(getRandomBetween(0, 8)),
    },
    offer: {
      titles: getRandomArrayElement(TITLES),
      address: {x: coordX, y: coordY},
      price: getRandomBetween(Prices.min, Prices.max),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomBetween(Rooms.min, Rooms.max),
      guests: getRandomBetween(Guests.min, Guests.max),
      checkin:  check,
      checkout: check,
      features: getRandomArrayList(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayList(PHOTOS),
    },
    location: {
      x: coordX,
      y: coordY,
    },
  };
};
// Функция, возвращающая любое количество наших нужных объектов.
const createAds = (offersCount) => {
  let ads = []
  for (let i = 0; i < offersCount; i++) {
    ads.push(createAd());
  }

  return ads;
};
/* eslint-disable no-console */
console.log(createAds(OFFERS_COUNT))
