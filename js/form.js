const fieldType = document.querySelector('#type');
const fieldPrice = document.querySelector('#price');
const fieldTimeIn = document.querySelector('#timein');
const fieldTimeOut = document.querySelector('#timeout');

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

export { addFormListeners };

