import { generateRandomAds , ADS_COUNT} from './data.js';
import { generateAds } from './similar-ads.js';

const ads = generateRandomAds(ADS_COUNT);
generateAds(ads);
