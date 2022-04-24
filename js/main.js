import { addFormListeners, toggleAdFormsActivation, setFormAddress, setUserFormSubmit } from './form.js';
import { initMap, getMainPinMarkerPosition, renderPins } from './map.js';
import { generateAdElement } from './similar-ads.js';
import { getAdsData } from './data.js';
import { openSuccessPopup, initDataErrorPopup, openDataErrorPopup, showAlert } from './popup.js';

initMap(toggleAdFormsActivation);

getAdsData().then((pinsData) => {
  renderPins(pinsData, generateAdElement);
}).catch(() => {
  initDataErrorPopup();
  openDataErrorPopup();
});

setUserFormSubmit(openSuccessPopup, showAlert);
addFormListeners();
getMainPinMarkerPosition(setFormAddress);
