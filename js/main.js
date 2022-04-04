import { generateRandomAds } from './data.js';
import { addFormListeners, adFormsActivationToggle, setMainPinMarkerAddress } from './form.js';
import { addPins, mapInit, addMainPinMarker, DEFAULT_LAT_LNG } from './map.js';
import { generateAdElement } from './similar-ads.js';

const ads = generateRandomAds();
const pinsData = ads.map((ad) => {
  return {
    popupContent: generateAdElement(ad),
    location: ad.location,
  };
});

mapInit(adFormsActivationToggle);
setMainPinMarkerAddress(DEFAULT_LAT_LNG);
addFormListeners();
addPins(pinsData);
addMainPinMarker(setMainPinMarkerAddress);
