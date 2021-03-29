
import { createAds, OFFERS_COUNT } from './data.js';
import { initFormListeners, makesFormsActive, makesFormsInactive, updateAddress } from './form.js';
import { addPins, initMap, resetMainMarkerPosition } from './map.js';
import { getCardElement } from './similar-ads.js';
import { initSuccessPopup, openSuccessMessagePopup, openErrorMessagePopup, initErrorPopup } from './popup.js';
const ads = createAds(OFFERS_COUNT);
const points = ads.map(({ location }) => ({ lat: location.x, lng: location.y }))
const renderAd = (index) => getCardElement(ads[index]);

/**
 * Обработчик события загрузки карты(сработает только после успешной инициализации карты) =>
 *  в нем мы выполняем логику исходя из ТЗ (проставляем пины и рендерим их описание + активация формы.)
 */
initSuccessPopup();
initErrorPopup();
makesFormsInactive();

const resetMarker = () => {
  const coords = resetMainMarkerPosition();
  updateAddress(coords);
}

const onFormSubmitSuccess = () => {
  openSuccessMessagePopup();
  resetMarker();
}
const onFormSubmitError = () => {
  openErrorMessagePopup();
}

const handleMapLoad = () => {
  addPins(points, renderAd);
  initFormListeners(onFormSubmitSuccess, onFormSubmitError, resetMarker);
  makesFormsActive();
};

initMap(handleMapLoad, updateAddress);
