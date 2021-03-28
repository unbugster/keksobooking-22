import { isEscEvent } from './util.js';

const POPUP_SUCCESS_TEMPLATE = document.querySelector('#success').content;
const SUCCESS_MESSAGE_ELEMENT = POPUP_SUCCESS_TEMPLATE.querySelector('.success');
const MAIN_BLOCK = document.querySelector('main');

const popupClone = SUCCESS_MESSAGE_ELEMENT.cloneNode(true);

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessagePopup();
  }
};

const openMessagePopup = () => {
  popupClone.classList.remove('visually-hidden')
};

const closeMessagePopup = () => {
  popupClone.classList.add('visually-hidden');
};

const initPopup = () => {
  popupClone.classList.add('visually-hidden')
  MAIN_BLOCK.appendChild(popupClone);
  document.addEventListener('keydown', onPopupEscKeydown)
  popupClone.addEventListener('click', closeMessagePopup)
}

export { initPopup, openMessagePopup }
