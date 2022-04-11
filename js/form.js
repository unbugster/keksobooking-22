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

const fieldCapacityHandler = (evt) => {
  const guestsValue = Number(FIELD_ROOMS_NUMBER.value);
  const validGuestValues = getValuesRoomsByGuest(evt.target.value);

  runCustomCapacityValidation(guestsValue, validGuestValues);
};

const fieldRoomsHandler = (evt) => {
  const roomsValue = Number(FIELD_CAPACITY.value);
  const validRoomsValues = getValuesGuestByRooms(evt.target.value);

  runCustomCapacityValidation(roomsValue, validRoomsValues);
};

const fieldTitleHandler = (evt) => {
  const valueLength = evt.target.value.length;

  if (TITLE_INPUT.validity.valueMissing) {
    TITLE_INPUT.setCustomValidity('Обязательное поле');
  } else if (valueLength < MIN_TITLE_LENGTH) {
    TITLE_INPUT.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    TITLE_INPUT.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
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

const checkFieldPriceValidityHandler = () => {
  const previouslySetValue = FIELD_PRICE.value;
  const chosenFieldHouseTypeValue = FIELD_HOUSE_TYPE.value;
  const minPrice = MIN_PRICE_FOR_HOUSE_TYPE[chosenFieldHouseTypeValue];

  if (FIELD_PRICE.validity.valueMissing) {
    FIELD_PRICE.setCustomValidity('Обязательное поле');
  } else if (previouslySetValue > MAX_PRICE_FOR_NIGHT) {
    FIELD_PRICE.setCustomValidity('Максимальная цена за ночь ' + MAX_PRICE_FOR_NIGHT);
  } else if (previouslySetValue < minPrice) {
    FIELD_PRICE.setCustomValidity('Минимальная цена за ночь ' + minPrice);
  } else {
    FIELD_PRICE.setCustomValidity('');
  }

  FIELD_PRICE.reportValidity();
};

const addFormListeners = () => {
  FIELD_HOUSE_TYPE.addEventListener('change', fieldHouseTypeChangeHandler);
  FIELD_TIME_IN.addEventListener('change', fieldTimeInChangeHandler);
  FIELD_TIME_OUT.addEventListener('change', fieldTimeOutChangeHandler);
  FIELD_CAPACITY.addEventListener('change', fieldCapacityHandler);
  FIELD_ROOMS_NUMBER.addEventListener('change', fieldRoomsHandler);
  FIELD_PRICE.addEventListener('input', checkFieldPriceValidityHandler);
  FIELD_HOUSE_TYPE.addEventListener('change', checkFieldPriceValidityHandler);
  TITLE_INPUT.addEventListener('input', fieldTitleHandler);
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
  if (on) {
    MAP_FORM_FIELDSET.removeAttribute('disabled');
    MAP_FILTER_FORM.classList.remove('map__filters--disabled');
    MAP_FILTER_FORM_SELECTS.forEach((el) => el.removeAttribute('disabled'));
  } else {
    MAP_FORM_FIELDSET.setAttribute('disabled', true);
    MAP_FILTER_FORM.classList.add('map__filters--disabled');
    MAP_FILTER_FORM_SELECTS.forEach((el) => el.setAttribute('disabled', true));
  }
};

const toggleAdFormsActivation = (on) => {
  toggleAdMainFormActiveState(on);
  toggleAdMapFormActiveState(on);
};

export { addFormListeners, toggleAdFormsActivation, setFormAddress };
