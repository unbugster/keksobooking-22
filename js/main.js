import { generateRandomAds, mapCanvas } from './data.js';
import { addFormListeners } from './form.js';
import { addPins } from './map.js';

const ads = generateRandomAds();
addPins(ads)
addFormListeners();

