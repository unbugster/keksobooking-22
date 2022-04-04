import { generateRandomAds } from './data.js';
import { addFormListeners, adFormsActivationToggle } from './form.js';
import { addPins, mapInit, addMainPinMarker } from './map.js';
import { generateAdElement } from './similar-ads.js';

const ads = generateRandomAds();
const pinsData = ads.map((ad) => {
  return {
    popupContent: generateAdElement(ad),
    location: ad.location,
  };
});

mapInit(adFormsActivationToggle);
addFormListeners();
addPins(pinsData);
addMainPinMarker();
