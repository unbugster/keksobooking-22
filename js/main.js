// Функция, возвращающая случайное целое число из переданного диапазона включительно.
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

  return Math.floor(Math.random() * (max - min + 1)) + Math.floor(min);
};


// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomFloatBetween = (min, max, floatingPoint = 0) => {
  if (isNaN(floatingPoint) || floatingPoint < 0) {
    throw new Error('Invalid argument entered.');
  }
  const decimalPlaces = Math.pow(10, floatingPoint);

  return getRandomInt(min * decimalPlaces, max * decimalPlaces) / decimalPlaces;
};

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
}

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
]
const ROOMS = {
  min: 1,
  max: 4,
}

const GUESTS = {
  min: 1,
  max: 6,
}

const CHECKS = [
  '12:00',
  '13:00',
  '14:00',
]

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]

const DESCRIPTION = [
  'good view',
  'city center',
  'beside the beach',
  'best sunsets ever',
]

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]

const LOCATIONS = {
  minX: 35.65000,
  maxX: 35.70000,
  minY: 139.70000,
  maxY: 139.80000,
}

const DIGITS_COUNT = 2;

const getRandomList = (array) => {
  const newArray = array.filter((el) => {
    if (getRandomInt(0, 50) > 25) {
      return el;
    }
  })
  return newArray;
}

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};


let formattedNumber = (num) => {
  return ('0' + num).slice(-2);
}

const getRandomAd = () => {
  let myNumber = getRandomInt(1, 8);
  const locationX = getRandomFloatBetween(LOCATIONS.minX, LOCATIONS.maxX, DIGITS_COUNT);
  const locationY = getRandomFloatBetween(LOCATIONS.minY, LOCATIONS.maxY, DIGITS_COUNT);

  return {
    author: {
      avatar: `img/avatars/user${formattedNumber(myNumber)}.png`,
    },

    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${locationX} + ${locationY}`,
      price: getRandomInt(PRICE.min, PRICE.max),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomInt(ROOMS.min, ROOMS.max),
      guests: getRandomInt(GUESTS.min, GUESTS.max),
      checkin: getRandomArrayElement(CHECKS),
      checkout: getRandomArrayElement(CHECKS),
      features: getRandomList(FEATURES),
      description: DESCRIPTION[getRandomInt(0, 3)],
      photos: getRandomList(PHOTOS),
    },

    location: {
      x: locationX,
      y: locationY,
    },
  }
}
const getTenRandomAds = () => {
  let result = [];
  for (let i = 1; i <= 10; i++) {
    result.push(getRandomAd());
  }
  return result;
}
console.log(getTenRandomAds())
