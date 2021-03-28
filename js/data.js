import { getRandomArrayList, getRandomArrayElement, getRandomFloatBetween, getRandomBetween, getAvatarImg } from './util.js';

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
  min: 1,
  max: 6,
}
const Coordinates = {
  minX: 35.65,
  maxX: 35.7,
  minY: 139.7,
  maxY: 139.8,
}

const Prices = {
  min: 5000,
  max: 50000,
}

const Rooms = {
  min: 1,
  max: 4,
}

// Функция, возвращающая 1 нужный объект - объявление
const createAd = () => {
  const coordX = getRandomFloatBetween(Coordinates.minX, Coordinates.maxX, DIGITS_COUNT);
  const coordY = getRandomFloatBetween(Coordinates.minY, Coordinates.maxY, DIGITS_COUNT);
  const check = getRandomArrayElement(CHECKINS_CHECKOUTS);

  return {
    author: {
      avatar: getAvatarImg(getRandomBetween(1, 8)),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${coordX}, ${coordY}`,
      price: getRandomBetween(Prices.min, Prices.max),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomBetween(Rooms.min, Rooms.max),
      guests: getRandomBetween(Guests.min, Guests.max),
      checkin: check,
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
// Функция, возвращающая любое количество наших нужных объектов - объявлений.
const createAds = (offersCount) => {
  const ads = []
  for (let i = 0; i < offersCount; i++) {
    ads.push(createAd());
  }

  return ads;
};

export { createAds, createAd, OFFERS_COUNT };


