import {renderAds} from './similar-ads.js';
import {createAds, OFFERS_COUNT} from './data.js';

const ads = createAds(OFFERS_COUNT);
renderAds(1, ads)
