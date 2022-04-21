const MAIN_BLOCK = document.querySelector('main');
const POPUP_DATA_ERROR_TEMPLATE = document.querySelector('#data-error').content;
const POPUP_DATA_ERROR = POPUP_DATA_ERROR_TEMPLATE.querySelector('.error');
const POPUP_DATA_ERROR_CLONE = POPUP_DATA_ERROR.cloneNode(true);

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const onPopupsEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeDataErrorPopup();
    closeSuccessPopup();
  }
};

const openDataErrorPopup = () => {
  POPUP_DATA_ERROR_CLONE.classList.remove('visually-hidden');
};

const closeDataErrorPopup = () => {
  POPUP_DATA_ERROR_CLONE.classList.add('visually-hidden');
};

const initDataErrorPopup = () => {
  POPUP_DATA_ERROR_CLONE.classList.add('visually-hidden');
  MAIN_BLOCK.appendChild(POPUP_DATA_ERROR_CLONE);
  document.addEventListener('keydown', onPopupsEscKeydown);
  POPUP_DATA_ERROR_CLONE.addEventListener('click', closeDataErrorPopup);
};

const SUCCESS_TEMPLATE = document.querySelector('#success').content;
const SUCCESS = SUCCESS_TEMPLATE.querySelector('.success');
const SUCCESS_CLONE = SUCCESS.cloneNode(true);

const openSuccessPopup = () => {
  SUCCESS_CLONE.classList.remove('visually-hidden');
};

const closeSuccessPopup = () => {
  SUCCESS_CLONE.classList.add('visually-hidden');
};

const initSuccessPopup = () => {
  SUCCESS_CLONE.classList.add('visually-hidden');
  MAIN_BLOCK.appendChild(SUCCESS_CLONE);
  document.addEventListener('keydown', onPopupsEscKeydown);
  document.addEventListener('click', closeSuccessPopup);
};

export { initDataErrorPopup, openDataErrorPopup, initSuccessPopup, openSuccessPopup };
