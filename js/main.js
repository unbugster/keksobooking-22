import { generateRandomAds, mapCanvas } from './data.js';
import { generateAds } from './similar-ads.js';
<<<<<<< HEAD
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
=======
import { addFormListeners } from './form.js';

const ads = generateRandomAds();
const tenRandomAds = generateAds(ads);
mapCanvas.appendChild(tenRandomAds.children[0]);
addFormListeners();
>>>>>>> main
