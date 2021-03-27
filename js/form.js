const fieldType = document.querySelector('#type');
const fieldPrice = document.querySelector('#price');
const fieldTimein = document.querySelector('#timein');
const fieldTimeout = document.querySelector('#timeout');
const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const fieldAddress = form.querySelector('#address');
const DEGREE = 5;
const INACTIVE_CLASS = 'ad-form--disabled';


const INTERACTIVE_TAGS = [
  'select',
  'input',
  'button',
  'a',
]

const HOUSE_TYPE_MIN_PRICE = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
};

const fieldHouseTypeChangeHandler = (evt) => {
  const value = evt.target.value;

  fieldPrice.value = HOUSE_TYPE_MIN_PRICE[value];
  fieldPrice.placeholder = HOUSE_TYPE_MIN_PRICE[value];
}

const fieldTimeInChangeHandler = (evt) => {
  const value = evt.target.value;

  fieldTimeout.value = value;
}

const fieldTimeOutChangeHandler = (evt) => {
  const value = evt.target.value;

  fieldTimein.value = value;
}

const initFormListeners = () => {
  fieldType.addEventListener('change', fieldHouseTypeChangeHandler);
  fieldTimein.addEventListener('change', fieldTimeInChangeHandler);
  fieldTimeout.addEventListener('change', fieldTimeOutChangeHandler);
}

/**
 * Функция транслирует координаты lat lng в поле адреса
 * @param {{ lat, lng }} param0
 */
const updateAddress = ({ lat, lng }) => {
  fieldAddress.value = `${lat.toFixed(DEGREE)}, ${lng.toFixed(DEGREE)}`;
};

const makesFormsInactive = () => {
  [form, mapFilters].forEach((el) => {
    el.classList.add(INACTIVE_CLASS);
    INTERACTIVE_TAGS.forEach((tag) => {
      const children = el.querySelectorAll(tag);

      children.forEach((elem) => {
        elem.disabled = true;
      });
    })
  })
}

const makesFormsActive = () => {
  [form, mapFilters].forEach((el) => {
    el.classList.remove(INACTIVE_CLASS);
    INTERACTIVE_TAGS.forEach((tag) => {
      const children = el.querySelectorAll(tag);

      children.forEach((elem) => {
        elem.disabled = false;
      });
    })
  })
};

export { initFormListeners, makesFormsActive as makesFormActive, makesFormsInactive as makesFormInactive, form, mapFilters, updateAddress };
