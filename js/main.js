import { generateRandomAds, mapCanvas } from './data.js';
// import { generateAds } from './similar-ads.js';
import { addFormListeners } from './form.js';
import { isFormActive } from './inactive-form.js';
import { addPins } from './map.js';

const ads = generateRandomAds();
addPins(ads)
addFormListeners();
isFormActive(true);
