const FIELD_TYPE = document.querySelector('#type');
const FIELD_PRICE = document.querySelector('#price');
const FIELD_TIME_IN = document.querySelector('#timein');
const FIELD_TIME_OUT = document.querySelector('#timeout');
const FORM = document.querySelector('.ad-form');
const MAP_FILTERS = document.querySelector('.map__filters');
const FIELD_ADDRESS = FORM.querySelector('#address');
const USER_TITLE_INPUT = document.querySelector('#title');
const FIELD_CAPACITY = document.querySelector('#capacity');
const FIELD_ROOMS_NUMBER = document.querySelector('#room_number');
const OPTIONS = FIELD_CAPACITY.querySelectorAll('option');
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

  FIELD_PRICE.value = HOUSE_TYPE_MIN_PRICE[value];
  FIELD_PRICE.placeholder = HOUSE_TYPE_MIN_PRICE[value];
}

const fieldTimeInChangeHandler = (evt) => {
  const value = evt.target.value;

  FIELD_TIME_OUT.value = value;
}

const fieldTimeOutChangeHandler = (evt) => {
  const value = evt.target.value;

  FIELD_TIME_IN.value = value;
}

/**
 * Функция транслирует координаты lat lng в поле адреса
 * @param {{ lat, lng }} param0
 */
const updateAddress = ({ lat, lng }) => {
  FIELD_ADDRESS.value = `${lat.toFixed(DEGREE)}, ${lng.toFixed(DEGREE)}`;
};

const makesFormsInactive = () => {
  [FORM, MAP_FILTERS].forEach((el) => {
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
  [FORM, MAP_FILTERS].forEach((el) => {
    el.classList.remove(INACTIVE_CLASS);
    INTERACTIVE_TAGS.forEach((tag) => {
      const children = el.querySelectorAll(tag);

      children.forEach((elem) => {
        elem.disabled = false;
      });
    })
  })
};

USER_TITLE_INPUT.addEventListener('input', () => {
  const MIN_LENGTH = 30;
  const MAX_LENGTH = 100;
  const valueLength = USER_TITLE_INPUT.value.length;

  if (valueLength < MIN_LENGTH) {
    USER_TITLE_INPUT.setCustomValidity('Ещё ' + (MIN_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_LENGTH) {
    USER_TITLE_INPUT.setCustomValidity('Удалите лишние ' + (valueLength - MAX_LENGTH) + ' симв.');
  } else {
    USER_TITLE_INPUT.setCustomValidity('');
  }

  USER_TITLE_INPUT.reportValidity();
});

FIELD_PRICE.addEventListener('input', () => {
  const MAX_PRICE = 1000000;
  const value = FIELD_PRICE.value;

  if (value > MAX_PRICE) {
    FIELD_PRICE.setCustomValidity('Максимальная цена 1000000');
  } else {
    FIELD_PRICE.setCustomValidity('');
  }

  FIELD_PRICE.reportValidity();
});

const getOptionsToShow = (rooms) => {
  if (rooms === '1') {
    return ['1'];
  }
  if (rooms === '2') {
    return ['1', '2'];
  }
  if (rooms === '3') {
    return ['1', '2', '3'];
  }
  if (rooms === '100') {
    return ['0']
  }
}

const fieldRoomsChangeCountHandler = (evt) => {
  const value = evt.target.value;
  const optionsToShow = getOptionsToShow(value);

  OPTIONS.forEach((el) => {
    if (optionsToShow.includes(el.value)) {
      el.disabled = false;
    } else {
      el.disabled = true;
    }
  })

  const selectedElement = [...OPTIONS].find((opt) => opt.selected === true);
  if (selectedElement.disabled) {
    const firstUndisabledElement = [...OPTIONS].find((opt) => opt.disabled === false);
    firstUndisabledElement.selected = true;
  }
}

const SERVER_SEND_URL = 'https://22.javascript.pages.academy/keksobooking';

const createSubmitHandler = (onSuccess) => {
  return (evt) => {
    const formData = new FormData(evt.target);

    evt.preventDefault();
    fetch(SERVER_SEND_URL,
      {
        method: 'POST',
        body: formData,
      },
    ).then(() => {
      resetForms();
      onSuccess();
    })
  }
}

const initFormListeners = (onSubmitSuccess) => {
  FIELD_TYPE.addEventListener('change', fieldHouseTypeChangeHandler);
  FIELD_TIME_IN.addEventListener('change', fieldTimeInChangeHandler);
  FIELD_TIME_OUT.addEventListener('change', fieldTimeOutChangeHandler);
  FIELD_ROOMS_NUMBER.addEventListener('change', fieldRoomsChangeCountHandler);
  FORM.addEventListener('submit', createSubmitHandler(onSubmitSuccess));

}

const setElementValue = (el, value) => {
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }
  const field = el.type === 'checkbox' ? 'checked' : 'value';
  el[field] = value;
}

const mapFormSelectors = [
  '#housing-type',
  '#housing-price',
  '#housing-rooms',
  '#housing-guests',
];

const mapFormCheckboxes = [
  '#filter-wifi',
  '#filter-dishwasher',
  '#filter-parking',
  '#filter-washer',
  '#filter-elevator',
  '#filter-conditioner',
];

const formSelectors = [
  '#feature-wifi',
  '#feature-dishwasher',
  '#feature-parking',
  '#feature-washer',
  '#feature-elevator',
  '#feature-conditioner',
];

const resetForms = () => {
  mapFormSelectors.forEach((selector) => setElementValue(selector, 'any'));
  mapFormCheckboxes.forEach((selector) => setElementValue(selector, false));

  setElementValue(FIELD_TYPE, 'flat');
  setElementValue(FIELD_PRICE, '');
  setElementValue(FIELD_TIME_IN, '12:00');
  setElementValue(FIELD_TIME_OUT, '12:00');

  formSelectors.forEach(selector => setElementValue(selector, false))
}

export { initFormListeners, makesFormsActive, makesFormsInactive, updateAddress };
