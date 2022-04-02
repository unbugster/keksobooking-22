import { generateRandomAds, mapCanvas } from './data.js';
import { addFormListeners } from './form.js';
import { addPins, mapInit } from './map.js';
import { adFormActivationToggle } from './forms-activation.js';
import { generateAdElement } from './similar-ads.js';

const ads = generateRandomAds();


mapInit(adFormActivationToggle);
addFormListeners();

const pinsData = ads.map((ad) => {
  return {
    popupContent: generateAdElement(ad),
    location: ad.location,
  }
});

addPins(pinsData);
