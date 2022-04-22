import { initDataErrorPopup, openDataErrorPopup } from './popup.js';

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

export { getAdsData, SERVER_POST_URL };
