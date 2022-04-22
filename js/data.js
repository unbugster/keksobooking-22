import { initDataErrorPopup, openDataErrorPopup } from './popup.js';
import { AD_FORM } from './form.js';

const SERVER_GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SERVER_POST_URL = 'https://22.javascript.pages.academy/keksobooking';

const checkResponseStatus = (response) => {
  if (response.ok) {
    return response;
  }

  initDataErrorPopup();
  openDataErrorPopup();
  const { statusText, status } = response;
  throw new Error(`ERROR: ${status} — ${statusText}`);
};

const getAdsData = () => fetch(SERVER_GET_URL)
  .then(checkResponseStatus)
  .then((response) => response.json());

const sendUserFormData = (onSuccess) => {
  AD_FORM.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch(
      SERVER_POST_URL,
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        console.log('Не удалось отправить форму. Попробуйте ещё раз');// eslint-disable-line
      }
    })
      .catch(() => {
        console.log('Не удалось отправить форму. Попробуйте ещё раз');// eslint-disable-line
      });
  });
};

export { getAdsData, sendUserFormData };
