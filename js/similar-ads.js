const TEMPLATE_FRAGMENT_CARD = document.querySelector('#card').content;
const TEMPLATE_AD = TEMPLATE_FRAGMENT_CARD.querySelector('article');
const FRAGMENT_ADS = document.createDocumentFragment();

const TEMPLATE_PHOTO = document.querySelector('#popup__img-photo');
const TEMPLATE_CONTENT = TEMPLATE_PHOTO.content;
const TEMPLATE_IMAGE = TEMPLATE_CONTENT.querySelector('.popup__photo');

const HOUSE_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const SELECTORS = {
  title: '.popup__title',
  address: '.popup__text--address',
  price: '.popup__text--price',
  type: '.popup__type',
  capacity: '.popup__text--capacity',
  time: '.popup__text--time',
  features: '.popup__features',
  description: '.popup__description',
  photos: '.popup__photos',
  avatar: '.popup__avatar',
  feature: '.popup__feature',
};

const pasteContent = (el, selector, content, isHtml) => {
  const element = el.querySelector(selector);
  if (!element) {
    return;
  }

  if (!content) {
    element.style.display = 'none';
    return;
  }

  if (isHtml) {
    element.innerHTML = content;
    return;
  }

  element.textContent = content;
};

const getRoomsAndGuestsText = (rooms, guests) => `${rooms} комнаты для ${guests} гостей`;
const getChecksText = (checkin, checkpout) => `Заезд после ${checkin}, выезд до ${checkpout}`;
const getPriceHtml = (price) => `${price} <span>₽/ночь</span>`;

const displayFeatures = (el, selector, features) => {
  features.forEach((feature) => {
    const f = el.querySelector(`${selector}--${feature}`);
    f.style.display = 'inline-block';
  });
};

const pastePhotos = (el, photos) => {
  const photosFragment = document.createDocumentFragment();
  const photosParent = el.querySelector('.popup__photos');

  photos.forEach((imgSrc) => {
    const photo = TEMPLATE_IMAGE.cloneNode(true);
    photo.src = imgSrc;
    photosFragment.appendChild(photo);
  });

  photosParent.appendChild(photosFragment);
};

const pasteAvatar = (el, selector, content) => {
  const child = el.querySelector(selector);
  if (!child) {
    return;
  }

  if (!content) {
    child.style.display = 'none';
    return;
  }

  child.src = content;
};

const generateAdElement = (ad) => {
  const { offer, author } = ad;
  const adElement = TEMPLATE_AD.cloneNode(true);

  pasteContent(adElement, SELECTORS.title, offer.title);
  pasteContent(adElement, SELECTORS.address, offer.address);
  pasteContent(adElement, SELECTORS.price, getPriceHtml(offer.price), true);
  pasteContent(adElement, SELECTORS.type, HOUSE_TYPES[offer.type]);
  pasteContent(adElement, SELECTORS.capacity, getRoomsAndGuestsText(offer.rooms, offer.guests));
  pasteContent(adElement, SELECTORS.time, getChecksText(offer.checkin, offer.checkout));
  pasteContent(adElement, SELECTORS.description, offer.description);
  displayFeatures(adElement, SELECTORS.feature, offer.features);
  pastePhotos(adElement, offer.photos);
  pasteAvatar(adElement, SELECTORS.avatar, author.avatar);

  return adElement;
};

const generateAds = (randomAds) => {
  randomAds.forEach((ad) => {
    const adElement = generateAdElement(ad);
    FRAGMENT_ADS.appendChild(adElement);
  });

  return FRAGMENT_ADS;
};

export { generateAds, generateAdElement };
