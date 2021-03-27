
import { createAds, OFFERS_COUNT } from './data.js';
import { initFormListeners, updateAddress } from './form.js';
import { addPins, initMap } from './map.js';
import { getCardElement } from './similar-ads.js';

const ads = createAds(OFFERS_COUNT);
const points = ads.map(({ location }) => ({ lat: location.x, lng: location.y }))
const renderAd = (index) => getCardElement(ads[index]);

const handleMapLoad = () => {
  addPins(points, renderAd);
};
//initFormListeners();
initMap(handleMapLoad, updateAddress);
