/* global _:readonly */
import { addFormListeners, toggleAdFormsActivation, setFormAddress, setUserFormSubmit } from './form.js';
import { initMap, getMainPinMarkerPosition, renderPins } from './map.js';
import { getAdsData } from './data.js';
import { openSuccessPopup, openDataErrorPopup, showAlert } from './popup.js';
import {
  filterPins, setHousingTypeChange, setHousingPriceChange,
  setHousingRoomsChange, setHousingGuestsChange, setHousingFeaturesChange
} from './filter.js';

const RENDER_DELAY = 500;

initMap(toggleAdFormsActivation);

getAdsData().then((pinsData) => {
  setHousingTypeChange(_.debounce(() => renderPins(filterPins(pinsData)), RENDER_DELAY));
  setHousingPriceChange(_.debounce(() => renderPins(filterPins(pinsData)), RENDER_DELAY));
  setHousingRoomsChange(_.debounce(() => renderPins(filterPins(pinsData)), RENDER_DELAY));
  setHousingGuestsChange(_.debounce(() => renderPins(filterPins(pinsData)), RENDER_DELAY));
  setHousingFeaturesChange(_.debounce(() => renderPins(filterPins(pinsData)), RENDER_DELAY));

  renderPins(filterPins(pinsData));
}).catch(() => {
  openDataErrorPopup();
});

setUserFormSubmit(openSuccessPopup, showAlert);
addFormListeners();
getMainPinMarkerPosition(setFormAddress);
