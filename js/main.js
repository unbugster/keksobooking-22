import { addFormListeners, toggleAdFormsActivation, setFormAddress, setUserFormSubmit } from './form.js';
import { initMap, getMainPinMarkerPosition, renderPins } from './map.js';
import { generateAdElement } from './similar-ads.js';
import { ads } from './data.js';
import { openSuccessPopup } from './popup.js';

initMap(toggleAdFormsActivation);
renderPins(ads, generateAdElement);
setUserFormSubmit(openSuccessPopup);
addFormListeners();
getMainPinMarkerPosition(setFormAddress);
