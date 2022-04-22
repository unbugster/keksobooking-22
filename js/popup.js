import { isEscEvent } from './util.js';

const MAIN_BLOCK = document.querySelector('main');
const POPUP_DATA_ERROR_TEMPLATE = document.querySelector('#data-error').content;
const POPUP_DATA_ERROR = POPUP_DATA_ERROR_TEMPLATE.querySelector('.error');
const POPUP_DATA_ERROR_CLONE = POPUP_DATA_ERROR.cloneNode(true);
const SUCCESS_TEMPLATE = document.querySelector('#success').content;
const SUCCESS = SUCCESS_TEMPLATE.querySelector('.success');
const SUCCESS_CLONE = SUCCESS.cloneNode(true);

const onPopupsEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeDataErrorPopup();
    closeSuccessPopup();
  }
};

const closeDataErrorPopup = () => {
  POPUP_DATA_ERROR_CLONE.classList.add('visually-hidden');
  document.removeEventListener('keydown', onPopupsEscKeydown);
  POPUP_DATA_ERROR_CLONE.removeEventListener('click', closeDataErrorPopup);
};

const initDataErrorPopup = () => {
  POPUP_DATA_ERROR_CLONE.classList.add('visually-hidden');
  MAIN_BLOCK.appendChild(POPUP_DATA_ERROR_CLONE);
  document.addEventListener('keydown', onPopupsEscKeydown);
  POPUP_DATA_ERROR_CLONE.addEventListener('click', closeDataErrorPopup);
};

const openDataErrorPopup = () => {
  initDataErrorPopup();
  POPUP_DATA_ERROR_CLONE.classList.remove('visually-hidden');
};

const closeSuccessPopup = () => {
  SUCCESS_CLONE.classList.add('visually-hidden');
  document.removeEventListener('keydown', onPopupsEscKeydown);
  SUCCESS_CLONE.removeEventListener('click', closeSuccessPopup);
};

const initSuccessPopup = () => {
  SUCCESS_CLONE.classList.add('visually-hidden');
  MAIN_BLOCK.appendChild(SUCCESS_CLONE);
  document.addEventListener('keydown', onPopupsEscKeydown);
  SUCCESS_CLONE.addEventListener('click', closeSuccessPopup);
};

const openSuccessPopup = () => {
  initSuccessPopup();
  SUCCESS_CLONE.classList.remove('visually-hidden');
};

export { initDataErrorPopup, openDataErrorPopup, initSuccessPopup, openSuccessPopup };
