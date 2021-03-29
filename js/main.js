import { getAdsData } from './data.js';
import { initFormListeners, makesFormsActive, makesFormsInactive, updateAddress } from './form.js';
import { addPins, initMap, resetMainMarkerPosition } from './map.js';
import { getCardElement } from './similar-ads.js';
import { initSuccessPopup, openSuccessMessagePopup, openErrorMessagePopup, initErrorPopup } from './popup.js';


getAdsData()
  .then((ads) => {
    const points = ads.map(({ location: { lat, lng } }) => ({ lat, lng }))
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
  })



