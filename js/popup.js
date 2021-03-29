import { isEscEvent } from './util.js';

const POPUP_SUCCESS_TEMPLATE = document.querySelector('#success').content;
const SUCCESS_MESSAGE_ELEMENT = POPUP_SUCCESS_TEMPLATE.querySelector('.success');
const MAIN_BLOCK = document.querySelector('main');
const POPUP_ERROR_TEMPLATE = document.querySelector('#error').content;
const ERROR_MESSAGE_ELEMENT = POPUP_ERROR_TEMPLATE.querySelector('.error');
const popupSuccessClone = SUCCESS_MESSAGE_ELEMENT.cloneNode(true);
const popupErrorClone = ERROR_MESSAGE_ELEMENT.cloneNode(true);
const POPUP_DATA_ERROR_TEMPLATE = document.querySelector('#error-data').content;
const POPUP_DATA_ERROR = POPUP_DATA_ERROR_TEMPLATE.querySelector('.error')
const POPUP_DATA_ERROR_CLONE = POPUP_DATA_ERROR.cloneNode(true);

const onPopupsEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessagePopup();
    closeErrorMessagePopup();
    closeDataErrorPopup();
  }
};

const openSuccessMessagePopup = () => {
  popupSuccessClone.classList.remove('visually-hidden')
};

const openErrorMessagePopup = () => {
  popupErrorClone.classList.remove('visually-hidden')
};

const closeSuccessMessagePopup = () => {
  popupSuccessClone.classList.add('visually-hidden');
};

const closeErrorMessagePopup = () => {
  popupErrorClone.classList.add('visually-hidden');
};

const openDataErrorPopup = () => {
  POPUP_DATA_ERROR_CLONE.classList.remove('visually-hidden')
};

const closeDataErrorPopup = () => {
  POPUP_DATA_ERROR_CLONE.classList.add('visually-hidden');
};

const initDataErrorPopup = () => {
  POPUP_DATA_ERROR_CLONE.classList.add('visually-hidden')
  MAIN_BLOCK.appendChild(POPUP_DATA_ERROR_CLONE);
  document.addEventListener('keydown', onPopupsEscKeydown)
  POPUP_DATA_ERROR_CLONE.addEventListener('click', closeDataErrorPopup)
}

const initSuccessPopup = () => {
  popupSuccessClone.classList.add('visually-hidden')
  MAIN_BLOCK.appendChild(popupSuccessClone);
  document.addEventListener('keydown', onPopupsEscKeydown)
  popupSuccessClone.addEventListener('click', closeSuccessMessagePopup)
}

const initErrorPopup = () => {
  popupErrorClone.classList.add('visually-hidden')
  MAIN_BLOCK.appendChild(popupErrorClone);
  document.addEventListener('keydown', onPopupsEscKeydown)
  popupErrorClone.addEventListener('click', closeErrorMessagePopup)
}

export { initSuccessPopup, openSuccessMessagePopup, openErrorMessagePopup, initErrorPopup, openDataErrorPopup, initDataErrorPopup }
