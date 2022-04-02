import { generateRandomAds } from './data.js';
import { addFormListeners } from './form.js';
import { addPins, mapInit } from './map.js';
import { adFormActivationToggle } from './forms-activation.js';
import { generateAdElement } from './similar-ads.js';

const ads = generateRandomAds();
const pinsData = ads.map((ad) => {
  return {
    popupContent: generateAdElement(ad),
    location: ad.location,
  }
});

mapInit(adFormActivationToggle);
addFormListeners();
addPins(pinsData);
