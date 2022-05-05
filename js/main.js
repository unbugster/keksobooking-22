import { addFormListeners, toggleAdFormsActivation, setFormAddress, setUserFormSubmit } from './form.js';
import { initMap, getMainPinMarkerPosition, renderPins } from './map.js';
import { getAdsData } from './data.js';
import { openSuccessPopup, openDataErrorPopup, showAlert } from './popup.js';
import {
  renderFilteredPins, setHousingTypeChange, setHousingPriceChange,
  setHousingRoomsChange, setHousingGuestsChange, setHousingFeaturesChange
} from './filter.js';

initMap(toggleAdFormsActivation);

getAdsData().then((pinsData) => {
  setHousingTypeChange(() => renderFilteredPins(pinsData, renderPins));
  setHousingPriceChange(() => renderFilteredPins(pinsData, renderPins));
  setHousingRoomsChange(() => renderFilteredPins(pinsData, renderPins));
  setHousingGuestsChange(() => renderFilteredPins(pinsData, renderPins));
  setHousingFeaturesChange(() => renderFilteredPins(pinsData, renderPins));

  renderFilteredPins(pinsData, renderPins);
}).catch(() => {
  openDataErrorPopup();
});

setUserFormSubmit(openSuccessPopup, showAlert);
addFormListeners();
getMainPinMarkerPosition(setFormAddress);
