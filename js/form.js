import { DEFAULT_LAT_LNG, defaultMarkerPosition } from './map.js';
import { sendUserFormData } from './data.js';

const FIELD_PRICE = document.querySelector('#price');
const FIELD_TIME_OUT = document.querySelector('#timeout');
const FIELD_ROOMS_NUMBER = document.querySelector('#room_number');
const FIELD_CAPACITY = document.querySelector('#capacity');
const FIELD_HOUSE_TYPE = document.querySelector('#type');
const FIELD_TIME_IN = document.querySelector('#timein');
const AD_FORM = document.querySelector('.ad-form');
const AD_FORM_FIELDSETS = AD_FORM.querySelectorAll('fieldset');
const MAP_FILTER_FORM = document.querySelector('.map__filters');
const MAP_FILTER_FORM_SELECTS = MAP_FILTER_FORM.querySelectorAll('select');
const MAP_FORM_FIELDSET = MAP_FILTER_FORM.querySelector('fieldset');
const MAX_PRICE_FOR_NIGHT = 1000000;
const ADDRESS = document.querySelector('#address');
const TITLE_INPUT = document.querySelector('#title');
const RESET_BUTTON = document.querySelector('.ad-form__reset');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MIN_PRICE_FOR_HOUSE_TYPE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const getValuesRoomsByGuest = (guests) => {
  switch (guests) {
    case '1':
      return [1, 2, 3];
    case '2':
      return [2, 3];
    case '3':
      return [3];
    case '0':
      return [100];
  }
};

const getValuesGuestByRooms = (rooms) => {
  switch (rooms) {
    case '1':
      return [1];
    case '2':
      return [1, 2];
    case '3':
      return [1, 2, 3];
    case '100':
      return [0];
  }
};

const runCustomCapacityValidation = (value, validValues) => {
  if (!validValues.includes(value)) {
    FIELD_CAPACITY.setCustomValidity('Количество гостей не соответствует количеству комнат');
  } else {
    FIELD_CAPACITY.setCustomValidity('');
  }

  FIELD_CAPACITY.reportValidity();
};

const fieldCapacityChangeHandler = (evt) => {
  const guestsValue = Number(FIELD_ROOMS_NUMBER.value);
  const validGuestValues = getValuesRoomsByGuest(evt.target.value);

  runCustomCapacityValidation(guestsValue, validGuestValues);
};

const fieldRoomsChangeHandler = (evt) => {
  const roomsValue = Number(FIELD_CAPACITY.value);
  const validRoomsValues = getValuesGuestByRooms(evt.target.value);

  runCustomCapacityValidation(roomsValue, validRoomsValues);
};

const fieldTitleHandler = (evt) => {
  const titleValueLength = evt.target.value.length;

  if (TITLE_INPUT.validity.valueMissing) {
    TITLE_INPUT.setCustomValidity('Обязательное поле');
  } else if (titleValueLength < MIN_TITLE_LENGTH) {
    TITLE_INPUT.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - titleValueLength) + ' симв.');
  } else if (titleValueLength > MAX_TITLE_LENGTH) {
    TITLE_INPUT.setCustomValidity('Удалите лишние ' + (titleValueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    TITLE_INPUT.setCustomValidity('');
  }

  TITLE_INPUT.reportValidity();
};

const setFormAddress = (latLng) => {
  const { lat, lng } = latLng;
  ADDRESS.value = `${lat.toFixed(5)},${lng.toFixed(5)}`;
};

const fieldHouseTypeChangeHandler = (evt) => {
  const value = evt.target.value;
  const minPrice = MIN_PRICE_FOR_HOUSE_TYPE[value];
  FIELD_PRICE.placeholder = minPrice;
};

const fieldTimeInChangeHandler = (evt) => {
  const value = evt.target.value;
  FIELD_TIME_OUT.value = value;
};

const fieldTimeOutChangeHandler = (evt) => {
  const value = evt.target.value;
  FIELD_TIME_IN.value = value;
};

const setMinPriceByTypeOfHouse = (houseType) => {
  return MIN_PRICE_FOR_HOUSE_TYPE[houseType];
};

const fieldHouseTypeChangeHanler = (evt) => {
  const houseType = evt.target.value;
  const minPrice = setMinPriceByTypeOfHouse(houseType);
  const price = FIELD_PRICE.value;

  runCustomPriceValidation(price, minPrice);
};

const fieldPriceChangeHangler = (evt) => {
  const price = evt.target.price;
  const houseType = FIELD_HOUSE_TYPE.value;
  const minPrice = setMinPriceByTypeOfHouse(houseType);

  runCustomPriceValidation(price, minPrice);
};

const runCustomPriceValidation = (verifiablePrice, minPriceLimit) => {
  if (FIELD_PRICE.validity.valueMissing) {
    FIELD_PRICE.setCustomValidity('Обязательное поле');
  } else if (verifiablePrice > MAX_PRICE_FOR_NIGHT) {
    FIELD_PRICE.setCustomValidity('Максимальная цена за ночь ' + MAX_PRICE_FOR_NIGHT);
  } else if (verifiablePrice < minPriceLimit) {
    FIELD_PRICE.setCustomValidity('Минимальная цена за ночь ' + minPriceLimit);
  } else {
    FIELD_PRICE.setCustomValidity('');
  }

  FIELD_PRICE.reportValidity();
};

const addFormListeners = () => {
  FIELD_HOUSE_TYPE.addEventListener('change', fieldHouseTypeChangeHandler);
  FIELD_TIME_IN.addEventListener('change', fieldTimeInChangeHandler);
  FIELD_TIME_OUT.addEventListener('change', fieldTimeOutChangeHandler);
  FIELD_CAPACITY.addEventListener('change', fieldCapacityChangeHandler);
  FIELD_ROOMS_NUMBER.addEventListener('change', fieldRoomsChangeHandler);
  FIELD_PRICE.addEventListener('input', fieldPriceChangeHangler);
  FIELD_HOUSE_TYPE.addEventListener('change', fieldHouseTypeChangeHanler);
  TITLE_INPUT.addEventListener('input', fieldTitleHandler);
  RESET_BUTTON.addEventListener('click', adFormResetHandler);
};

const toggleAdMainFormActiveState = (on) => {
  AD_FORM.classList[on ? 'remove' : 'add']('ad-form--disabled');

  if (on) {
    AD_FORM_FIELDSETS.forEach((el) => el.removeAttribute('disabled'));
  } else {
    AD_FORM_FIELDSETS.forEach((el) => el.setAttribute('disabled', true));
  }
};

const toggleAdMapFormActiveState = (on) => {
  MAP_FILTER_FORM.classList[on ? 'remove' : 'add']('map__filters--disabled');

  if (on) {
    MAP_FORM_FIELDSET.removeAttribute('disabled');
    MAP_FILTER_FORM_SELECTS.forEach((el) => el.removeAttribute('disabled'));
  } else {
    MAP_FORM_FIELDSET.setAttribute('disabled', true);
    MAP_FILTER_FORM_SELECTS.forEach((el) => el.setAttribute('disabled', true));
  }
};

const resetAdForm = () => {
  AD_FORM.reset();
  defaultMarkerPosition();
  setFormAddress(DEFAULT_LAT_LNG);
};

const adFormResetHandler = () => {
  setTimeout(() => setFormAddress(DEFAULT_LAT_LNG), 0);
  defaultMarkerPosition();
};

const toggleAdFormsActivation = (on) => {
  toggleAdMainFormActiveState(on);
  toggleAdMapFormActiveState(on);
};

const setUserFormSubmit = (onSuccess, onError) => {
  AD_FORM.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendUserFormData(new FormData(evt.target))
      .then(() => {
        onSuccess();
        resetAdForm();
      })
      .catch(() => onError('Не удалось отправить форму. Попробуйте еще раз'));
  });
};

export { addFormListeners, toggleAdFormsActivation, setFormAddress, setUserFormSubmit };
