import { generateRandomAds, mapCanvas } from './data.js';
import { generateAds } from './similar-ads.js';
import { formListeners } from './form.js';

const ads = generateRandomAds();
const tenRandomAds = generateAds(ads);
mapCanvas.appendChild(tenRandomAds.children[0]);
formListeners();

