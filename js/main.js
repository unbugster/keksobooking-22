import { addFormListeners, toggleAdFormsActivation, setFormAddress, setUserFormSubmit } from './form.js';
import { addPins, initMap, addMainPinMarker } from './map.js';
import { generateAdElement } from './similar-ads.js';
import { getAdsData } from './data.js';

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
setUserFormSubmit();
addFormListeners();
addMainPinMarker(setFormAddress);
