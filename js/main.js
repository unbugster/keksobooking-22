import { generateRandomAds, mapCanvas } from './data.js';
import { generateAds } from './similar-ads.js';
import { formListeners } from './form.js';
import { isFormActive } from './inactive-form.js';
import { addPins } from './map.js';

const ads = generateRandomAds();
console.log('ads', ads);
addPins(ads)
const tenRandomAdsFragment = generateAds(ads);
console.log('tenRandomAdsFragment', tenRandomAdsFragment);
formListeners();
isFormActive(true);
