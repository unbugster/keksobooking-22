// Returns random integer from the passed range inclusive
const getRandomBetween = (min, max) => {
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
    Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + 1)) +
    Math.floor(min)
  );
};

try {
  getRandomBetween(2, 10);
} catch (err) {
  alert('Something went wrong, contact your administrator');
  /* eslint-disable no-console */
  console.error(err.name + ':' + err.message);
}

// Returns a random floating point number from the passed range inclusive.
const getRandomFloatBetween = (min, max, decimalPlaces = 0) => {
  if (isNaN(decimalPlaces) || decimalPlaces < 0) {
    throw new Error('Invalid argument entered.');
  }
  const multiplier = Math.pow(10, decimalPlaces);

  return getRandomBetween(min * multiplier, max * multiplier) / multiplier;
};

try {
  getRandomFloatBetween(0, 5.12, 3);
} catch (err) {
  alert('Something went wrong, contact your administrator');
  /* eslint-disable no-console */
  console.error(err.name + ':' + err.message);
}

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

const TYPES = ['palace', 'flat', 'house', 'bungalow'];

const CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];

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
const OFFERS_COUNT = 10;
const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 6;
const MIN_LOCATION_X = 35.65;
const MAX_LOCATION_X = 35.7;
const MIN_LOCATION_Y = 139.7;
const MAX_LOCATION_Y = 139.8;
const MIN_PRICE = 5000;
const MAX_PRICE = 50000;
const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 4;
const DIGITS_COUNT = 2;



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

  return array.filter(shouldTakeNumber);
};

// Функция, возвращающая 1 нужный объект
const createAd = () => {
  const coordX = getRandomFloatBetween(MIN_LOCATION_X, MAX_LOCATION_X, DIGITS_COUNT);
  const coordY = getRandomFloatBetween(MIN_LOCATION_Y, MAX_LOCATION_Y, DIGITS_COUNT);
  const checkin = getRandomArrayElement(CHECKINS_CHECKOUTS);
  const checkout = getRandomArrayElement(CHECKINS_CHECKOUTS);
  return {
    author: {
      avatar: getAvatarImg(getRandomBetween(0, 8)),
    },
    offer: {
      titles: getRandomArrayElement(TITLES),
      address: {x: coordX, y: coordY},
      price: getRandomBetween(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomBetween(MIN_ROOM_COUNT , MAX_ROOM_COUNT),
      guests: getRandomBetween(MIN_GUEST_COUNT, MAX_GUEST_COUNT),
      checkin:  checkin,
      checkout: checkout,
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
