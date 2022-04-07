const FIELD_TYPE = document.querySelector('#type');
const FIELD_PRICE = document.querySelector('#price');
const FIELD_TIME_IN = document.querySelector('#timein');
const FIELD_TIME_OUT = document.querySelector('#timeout');

const AD_FORM = document.querySelector('.ad-form');
const AD_FORM_FIELDSETS = AD_FORM.querySelectorAll('fieldset');
const MAP_FILTER_FORM = document.querySelector('.map__filters');
const MAP_FILTER_FORM_SELECTS = MAP_FILTER_FORM.querySelectorAll('select');
const MAP_FORM_FIELDSET = MAP_FILTER_FORM.querySelector('fieldset');

const ADDRESS = document.querySelector('#address');

const setMainMarkerAddress = (latLng) => {
  const { lat, lng } = latLng;
  ADDRESS.value = `${lat.toFixed(5)},${lng.toFixed(5)}`;
};

const MIN_PRICE_FOR_HOUSE_TYPE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const fieldHouseTypeChangeHandler = (evt) => {
  const value = evt.target.value;
  FIELD_PRICE.value = MIN_PRICE_FOR_HOUSE_TYPE[value];
  FIELD_PRICE.placeholder = MIN_PRICE_FOR_HOUSE_TYPE[value];
};

const fieldTimeInChangeHandler = (evt) => {
  const value = evt.target.value;
  FIELD_TIME_OUT.value = value;
};

const fieldTimeOutChangeHandler = (evt) => {
  const value = evt.target.value;
  FIELD_TIME_IN.value = value;
};

const addFormListeners = () => {
  FIELD_TYPE.addEventListener('change', fieldHouseTypeChangeHandler);
  FIELD_TIME_IN.addEventListener('change', fieldTimeInChangeHandler);
  FIELD_TIME_OUT.addEventListener('change', fieldTimeOutChangeHandler);
};

const toggleAdMainFormActiveState = (on) => {
  if (on) {
    AD_FORM.classList.remove('ad-form--disabled');
    AD_FORM_FIELDSETS.forEach((el) => el.removeAttribute('disabled'));
  } else {
    AD_FORM.classList.add('ad-form--disabled');
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

export { addFormListeners, toggleAdFormsActivation, setMainMarkerAddress };

