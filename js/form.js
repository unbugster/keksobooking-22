const fieldType = document.querySelector('#type');
const fieldPrice = document.querySelector('#price');
const fieldTimeIn = document.querySelector('#timein');
const fieldTimeOut = document.querySelector('#timeout');
const fieldRoomsNumber = document.querySelector('#room_number');
const fieldCapacity = document.querySelector('#capacity');

const fieldRoomsChangeHandler = (evt) => {
  const value = evt.target.value;
  const validGuestValue = getValuesGuestByRooms(value);
  selectValidGuestsByRooms(validGuestValue);
}

const guestsOption = fieldCapacity.querySelectorAll('option');

const selectValidGuestsByRooms = (guests) => {
  guestsOption.forEach((el) => {
    if (guests.includes(Number(el.value))) {
      el.disabled = false;
    } else {
      el.disabled = true;
    }
  })
}

const selectedElement = [...guestsOption].find((opt) => opt.selected === true);

const checkCapacityValidity = () => {
  if (selectedElement.disabled) {
    fieldCapacity.setCustomValidity('Количество гостей не соответствует количеству комнат');
  } else {
    fieldCapacity.setCustomValidity('');
  }

  fieldCapacity.reportValidity();
}

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
}

const MIN_PRICE_FOR_HOUSE_TYPE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

let minPrice = 0;

const fieldHouseTypeChangeHandler = (evt) => {
  const value = evt.target.value;
  minPrice = MIN_PRICE_FOR_HOUSE_TYPE[value];
  fieldPrice.placeholder = minPrice;

  if (fieldPrice.value) {
    checkFieldPriceValidity();
  }
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
  fieldRoomsNumber.addEventListener('change', fieldRoomsChangeHandler);
  fieldRoomsNumber.addEventListener('change', checkCapacityValidity);
};

const MAX_PRICE_FOR_NIGHT = 1000000;

const checkFieldPriceValidity = () => {
  const value = fieldPrice.value;

  if (fieldPrice.validity.valueMissing) {
    fieldPrice.setCustomValidity('Обязательное поле');
  } else if (value > MAX_PRICE_FOR_NIGHT) {
    fieldPrice.setCustomValidity('Максимальная цена за ночь ' + MAX_PRICE_FOR_NIGHT);
  } else if (value < minPrice) {
    fieldPrice.setCustomValidity('Минимальная цена за ночь ' + minPrice);
  } else {
    fieldPrice.setCustomValidity('');
  }

  fieldPrice.reportValidity();
}

fieldPrice.addEventListener('input', checkFieldPriceValidity);

export { addFormListeners };
