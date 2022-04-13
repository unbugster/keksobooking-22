import { generateRandomAds } from './data.js';
import { addFormListeners, toggleAdFormsActivation, setFormAddress } from './form.js';
import { addPins, initMap, addMainPinMarker } from './map.js';
import { generateAdElement } from './similar-ads.js';

const ads = generateRandomAds();
const pinsData = ads.map((ad) => {
  return {
    popupContent: generateAdElement(ad),
    location: ad.location,
  };
});

initMap(toggleAdFormsActivation);
addFormListeners();
addPins(pinsData);
addMainPinMarker(setFormAddress);
