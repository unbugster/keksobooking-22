import { getRandomArrayElement, getRandomInt, getRandomFloatBetween, getRandomList, addZeroBeforeFigure } from './util.js';

const DIGITS_COUNT = 2;
const ADS_COUNT = 10;

const TITLES = [
  'Title1',
  'Title2',
  'Title3',
  'Title4',
  'Title5',
];

const PRICE = {
  min: 2000,
  max: 50000,
};

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const ROOMS = {
  min: 1,
  max: 4,
};

const GUESTS = {
  min: 1,
  max: 6,
};

const CHECKS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'good view',
  'city center',
  'beside the beach',
  'best sunsets ever',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const LOCATIONS = {
  minX: 35.65000,
  maxX: 35.70000,
  minY: 139.70000,
  maxY: 139.80000,
};

const getRandomAd = () => {
  let myNumber = getRandomInt(1, 8);
  const locationX = getRandomFloatBetween(LOCATIONS.minX, LOCATIONS.maxX, DIGITS_COUNT);
  const locationY = getRandomFloatBetween(LOCATIONS.minY, LOCATIONS.maxY, DIGITS_COUNT);
  const checkIn = getRandomArrayElement(CHECKS);
  const checkOut = checkIn;

  return {
    author: {
      avatar: `img/avatars/user${addZeroBeforeFigure(myNumber)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${locationX} + ${locationY}`,
      price: getRandomInt(PRICE.min, PRICE.max),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomInt(ROOMS.min, ROOMS.max),
      guests: getRandomInt(GUESTS.min, GUESTS.max),
      checkin: checkIn,
      checkout: checkOut,
      features: getRandomList(FEATURES),
      description: DESCRIPTION[getRandomInt(0, 3)],
      photos: getRandomList(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const generateRandomAds = () => {
  return new Array(ADS_COUNT).fill(null).map(() => getRandomAd());
};

export { generateRandomAds };
