import { getRandomAdsCount } from './data.js';
import { generateAds } from './similar-ads.js';

const ads = getRandomAdsCount();
generateAds(ads);
