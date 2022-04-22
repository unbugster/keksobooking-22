import { addFormListeners, toggleAdFormsActivation, setFormAddress } from './form.js';
import { addPins, initMap, getMainPinMarkerPosition } from './map.js';
import { generateAdElement } from './similar-ads.js';
import { getAdsData, sendUserFormData } from './data.js';
import { openSuccessPopup } from './popup.js';

initMap(toggleAdFormsActivation);

const ads = getAdsData();
ads.then((ads) => {
  const pinsData = ads.map((ad) => {
    return {
      popupContent: generateAdElement(ad),
      location: ad.location,
    };
  });
  return pinsData;
}).then((pinsData) => {
  addPins(pinsData);
});
sendUserFormData(openSuccessPopup);
addFormListeners();
getMainPinMarkerPosition(setFormAddress);
