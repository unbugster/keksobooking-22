import { generateRandomAds, mapCanvas } from './data.js';
import { addFormListeners } from './form.js';
import { addPins, mapInit } from './map.js';
import { adFormActivationToggle } from './forms-activation.js';
import { generateAd } from './similar-ads.js';

const ads = generateRandomAds();
addPins(ads, generateAd);
mapInit(adFormActivationToggle);
addFormListeners();

