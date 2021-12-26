const templateFragmentCard = document.querySelector('#card').content;
const templateAd = templateFragmentCard.querySelector('article');
const fragmentAds = document.createDocumentFragment();

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
const isHtml = true;

const pasteContent = (el, elClass, content, type) => {
  const element = el.querySelector(elClass);
  if (!element) {
    return;
  }
  if (!content) {
    element.style.display = 'none';
    return;
  }
  if (type) {
    element.innerHTML = content;
    return;
  }

  element.textContent = content;
};

const getRoomsAndGuestsText = (rooms, guests) => `${rooms} комнаты для ${guests} гостей`;
const getChecksText = (checkin, checkpout) => `Заезд после ${checkin}, выезд до ${checkpout}`;
const getPriceText = (price) => `${price} <span>₽/ночь</span>`

const generateAds = (randomAds) => {
  randomAds.forEach((ad) => {
    const { offer, author } = ad;
    const adElement = templateAd.cloneNode(true);
    pasteContent(adElement, SELECTORS.title, offer.title);
    pasteContent(adElement, SELECTORS.address, offer.address);
    pasteContent(adElement, SELECTORS.price, getPriceText(offer.price), isHtml)
    pasteContent(adElement, SELECTORS.type, HOUSE_TYPES[offer.type])

    fragmentAds.appendChild(adElement);
  })
}
