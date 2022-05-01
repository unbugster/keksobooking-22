import { addFormListeners, toggleAdFormsActivation, setFormAddress, setUserFormSubmit } from './form.js';
import { initMap, getMainPinMarkerPosition, renderPins } from './map.js';
import { generateAdElement } from './similar-ads.js';
import { getAdsData } from './data.js';
import { openSuccessPopup, openDataErrorPopup, showAlert } from './popup.js';

const SIMILAR_ADS = 10;
initMap(toggleAdFormsActivation);

getAdsData().then((pinsData) => {
  const renderedPins = pinsData.slice(0, SIMILAR_ADS);
  renderPins(renderedPins, generateAdElement);
}).catch(() => {
  openDataErrorPopup();
});

setUserFormSubmit(openSuccessPopup, showAlert);
addFormListeners();
getMainPinMarkerPosition(setFormAddress);
