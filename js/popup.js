import { isEscEvent } from './util.js';

const MAIN_BLOCK = document.querySelector('main');
const POPUP_DATA_ERROR_TEMPLATE = document.querySelector('#data-error').content;
const POPUP_DATA_ERROR = POPUP_DATA_ERROR_TEMPLATE.querySelector('.error');
const POPUP_DATA_ERROR_CLONE = POPUP_DATA_ERROR.cloneNode(true);
const SUCCESS_TEMPLATE = document.querySelector('#success').content;
const SUCCESS = SUCCESS_TEMPLATE.querySelector('.success');
const SUCCESS_CLONE = SUCCESS.cloneNode(true);

MAIN_BLOCK.appendChild(SUCCESS_CLONE);
MAIN_BLOCK.appendChild(POPUP_DATA_ERROR_CLONE);

const createPopupEscKeydownHandler = (cb) => (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    cb();
  }
};

const onSuccessPopupEscKeyDown = () => createPopupEscKeydownHandler(closeSuccessPopup);
const onDataErrorPopupEscKeyDown = () => createPopupEscKeydownHandler(closeDataErrorPopup);

const closeDataErrorPopup = () => {
  POPUP_DATA_ERROR_CLONE.classList.add('visually-hidden');
  document.removeEventListener('keydown', onDataErrorPopupEscKeyDown);
  POPUP_DATA_ERROR_CLONE.removeEventListener('click', closeDataErrorPopup);
};

const openDataErrorPopup = (message) => {
  document.addEventListener('keydown', onDataErrorPopupEscKeyDown);
  POPUP_DATA_ERROR_CLONE.addEventListener('click', closeDataErrorPopup);
  POPUP_DATA_ERROR_CLONE.classList.remove('visually-hidden');
  POPUP_DATA_ERROR_CLONE.querySelector('.error__message').textContent = message;
};

const closeSuccessPopup = () => {
  SUCCESS_CLONE.classList.add('visually-hidden');
  document.removeEventListener('keydown', onSuccessPopupEscKeyDown);
  SUCCESS_CLONE.removeEventListener('click', closeSuccessPopup);
};

const openSuccessPopup = () => {
  document.addEventListener('keydown', onSuccessPopupEscKeyDown);
  SUCCESS_CLONE.addEventListener('click', closeSuccessPopup);
  SUCCESS_CLONE.classList.remove('visually-hidden');
};

const showAlert = (message) => {
  openDataErrorPopup(message);
};

export { openDataErrorPopup, openSuccessPopup, showAlert };
