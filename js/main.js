import { getAdsData } from './data.js';
import { initFormListeners, makesFormsActive, makesFormsInactive, updateAddress } from './form.js';
import { addPins, initMap, resetMainMarkerPosition } from './map.js';
import { getCardElement } from './similar-ads.js';
import { initSuccessPopup, openSuccessMessagePopup, openErrorMessagePopup, initErrorPopup, initDataErrorPopup, openDataErrorPopup } from './popup.js';

initSuccessPopup();
initErrorPopup();
makesFormsInactive();
initDataErrorPopup();
const MAX_PINS = 10;

getAdsData()
  .then((ads) => {
    const points = ads.map(({ location: { lat, lng } }) => ({ lat, lng }))
    const renderAd = (index) => getCardElement(ads[index]);

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

    const addFilteredPins = (filterValue) => {
      const filterByType = (ad) => {
        if (filterValue.type === 'any') {
          return true;
        }
        if (ad.offer.type === filterValue.type) {
          return true;
        }
      }

      const filterByPrice = (ad) => {
        if (filterValue.price === 'any') {
          return true;
        }
        if (ad.offer.price >= 10000 && ad.offer.price <= 50000 && filterValue.price === 'middle') {
          return true;
        }
        if (ad.offer.price < 10000 && filterValue.price === 'low') {
          return true;
        }
        if (ad.offer.price >= 50000 && filterValue.price === 'high') {
          return true;
        }
      }

      const filterByRooms = (ad) => {
        if (filterValue.rooms === 'any') {
          return true;
        } if (ad.offer.rooms === 1 && filterValue.rooms === '1') {
          return true;
        }
        if (ad.offer.rooms === 2 && filterValue.rooms === '2') {
          return true;
        }
        if (ad.offer.rooms === 3 && filterValue.rooms === '3') {
          return true;
        }
      }

      const filterByGuests = (ad) => {
        if (filterValue.guests === 'any') {
          return true;
        } if (ad.offer.guests === 2 && filterValue.guests === '2') {
          return true;
        }
        if (ad.offer.guests === 1 && filterValue.guests === '1') {
          return true;
        }
        if (ad.offer.guests === 0 && filterValue.guests === '0') {
          return true;
        }
      }
      const filterByFeatures = (ad) => {
        return ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
          .every((feature) => { return !filterValue[feature] || ad.offer.features.includes(feature) })
      }

      const filterAds = ads
        .filter(filterByType)
        .filter(filterByPrice)
        .filter(filterByRooms)
        .filter(filterByGuests)
        .filter(filterByFeatures)
      const filterPoints = filterAds.map(({ location: { lat, lng } }) => ({ lat, lng }))
      addPins(filterPoints.slice(0, MAX_PINS), renderAd);
    }

    const handleMapLoad = () => {
      addPins(points.slice(0, MAX_PINS), renderAd);
      initFormListeners(onFormSubmitSuccess, onFormSubmitError, resetMarker, addFilteredPins);
      makesFormsActive();
    };

    initMap(handleMapLoad, updateAddress);
  }).catch(() => {
    openDataErrorPopup();
  })
