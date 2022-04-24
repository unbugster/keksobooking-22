import { initDataErrorPopup, openDataErrorPopup, openSuccessPopup } from './popup.js';

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

const ads = getAdsData();

const sendUserFormData = (onSuccess, onError, data) => {
  fetch(
    SERVER_POST_URL,
    {
      method: 'POST',
      body: data,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
      openSuccessPopup();
    } else {
      onError();
    }
  })
    .catch(() => {
      onError();
    });
};

export { ads, sendUserFormData };
