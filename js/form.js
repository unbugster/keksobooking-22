const fieldType = document.querySelector('#type');
const fieldPrice = document.querySelector('#price');
const fieldTimeIn = document.querySelector('#timein');
const fieldTimeOut = document.querySelector('#timeout');

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilterForm = document.querySelector('.map__filters');
const selects = mapFilterForm.querySelectorAll('select');
const mapFormFieldset = mapFilterForm.querySelector('fieldset');

const MIN_PRICE_FOR_HOUSE_TYPE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const fieldHouseTypeChangeHandler = (evt) => {
  const value = evt.target.value;
  fieldPrice.value = MIN_PRICE_FOR_HOUSE_TYPE[value];
  fieldPrice.placeholder = MIN_PRICE_FOR_HOUSE_TYPE[value];
};

const fieldTimeInChangeHandler = (evt) => {
  const value = evt.target.value;
  fieldTimeOut.value = value;
};

const fieldTimeOutChangeHandler = (evt) => {
  const value = evt.target.value;
  fieldTimeIn.value = value;
};

const addFormListeners = () => {
  fieldType.addEventListener('change', fieldHouseTypeChangeHandler);
  fieldTimeIn.addEventListener('change', fieldTimeInChangeHandler);
  fieldTimeOut.addEventListener('change', fieldTimeOutChangeHandler);
};


const adMainFormActivationToggle = (on) => {
  if (on) {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach((el) => el.removeAttribute('disabled'));
  } else {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach((el) => el.setAttribute('disabled', true));
  }
};

const adMapFormActivationToggle = (on) => {
  if (on) {
    mapFormFieldset.removeAttribute('disabled');
    mapFilterForm.classList.remove('map__filters--disabled');
    selects.forEach((el) => el.removeAttribute('disabled'));
  } else {
    mapFormFieldset.setAttribute('disabled', true);
    mapFilterForm.classList.add('map__filters--disabled');
    selects.forEach((el) => el.setAttribute('disabled', true));
  }
};

const adFormsActivationToggle = (on) => {
  adMainFormActivationToggle(on);
  adMapFormActivationToggle(on);
};

export { addFormListeners, adFormsActivationToggle };

