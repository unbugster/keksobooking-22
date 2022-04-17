import { addFormListeners, toggleAdFormsActivation, setFormAddress } from './form.js';
import { addPins, initMap, addMainPinMarker } from './map.js';
import { generateAdElement } from './similar-ads.js';
import { getAdsData } from './server-data.js';

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

initMap(toggleAdFormsActivation);
addFormListeners();
addMainPinMarker(setFormAddress);
