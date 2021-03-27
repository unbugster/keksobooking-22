//import { createAds, OFFERS_COUNT } from './data.js';

const cardTemplateFragment = document.querySelector('#card').content;
const popup = cardTemplateFragment.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

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
  feature: 'popup__feature',
};

const getRoomsAndGuestsText = (rooms, guests) => `${rooms} комнаты для ${guests} гостей`;
const getChecksText = (checkin, checkpout) => `Заезд после ${checkin}, выезд до ${checkpout}`;
const getPriceText = (price) => `${price} <span>₽/ночь</span>`

const pasteTextContent = (el, cl, content) => {
  const child = el.querySelector(cl);
  if (!child) {
    return;
  }
  if (!content) {
    child.style.display = 'none';
    return;
  }
  child.textContent = content;
};

const pasteHtmlContent = (el, cl, content) => {
  const child = el.querySelector(cl);
  if (!child) {
    return;
  }
  if (!content) {
    child.style.display = 'none';
    return;
  }
  child.innerHTML = content;
};

const displayFeatures = (el, cl, features) => {
  features.forEach((feature) => {
    const f = el.querySelector(`.${cl}--${feature}`);
    f.style.display = 'inline-block';
  })
}

const pastPhotos = (el, photos) => {
  const fragment = document.createDocumentFragment();
  const photosParent = el.querySelector('.popup__photos')
  photos.forEach((imgSrc) => {
    const img = document.createElement('img')
    img.src = imgSrc;
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    fragment.appendChild(img)
  })
  photosParent.appendChild(fragment);
};

const pastAvatar = (el, cl, content) => {
  const child = el.querySelector(cl);
  if (!child) {
    return;
  }
  if (!content) {
    child.style.display = 'none';
    return;
  }
  child.src = content;
};


const getCardElement = (ad) => {
  const { offer, author } = ad;
  const cardElement = popup.cloneNode(true);
  pasteTextContent(cardElement, SELECTORS.title, offer.title);
  pasteTextContent(cardElement, SELECTORS.address, offer.address);
  pasteHtmlContent(cardElement, SELECTORS.price, getPriceText(offer.price));
  pasteTextContent(cardElement, SELECTORS.type, HOUSE_TYPES[offer.type]);
  pasteTextContent(cardElement, SELECTORS.capacity, getRoomsAndGuestsText(offer.rooms, offer.guests));
  pasteTextContent(cardElement, SELECTORS.time, getChecksText(offer.checkin, offer.checkout));
  displayFeatures(cardElement, SELECTORS.feature, offer.features);
  pasteTextContent(cardElement, SELECTORS.description, offer.description);
  pastPhotos(cardElement, offer.photos)
  pastAvatar(cardElement, SELECTORS.avatar, author.avatar);
  return cardElement;
}
/*
const renderAd = (i) => {
  mapCanvas.appendChild(getCardElement(ads[i]))
}
*/
//const ads = createAds(OFFERS_COUNT);

export { getCardElement };
