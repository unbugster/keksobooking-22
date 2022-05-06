const HOUSING_TYPE = document.querySelector('#housing-type');
const HOUSING_PRICE = document.querySelector('#housing-price');
const HOUSING_ROOMS = document.querySelector('#housing-rooms');
const HOUSING_GUESTS = document.querySelector('#housing-guests');
const HOUSING_FEATURES = document.querySelector('#housing-features');

const SIMILAR_ADS = 10;

let filters = {
  'housing-type': 'any',
  'housing-price': 'any',
  'housing-rooms': 'any',
  'housing-guests': 'any',
  'housing-features': new Set(),
};

const setHousingFeaturesChange = (cb) => {
  HOUSING_FEATURES.addEventListener('change', (evt) => {
    const feature = evt.target.value;
    let featureList = filters['housing-features'];
    featureList.has(feature) ? featureList.delete(feature) : featureList.add(feature);

    cb();
  });
};

const setHousingTypeChange = (cb) => {
  HOUSING_TYPE.addEventListener('change', (evt) => {
    filters['housing-type'] = evt.target.value;
    cb();
  });
};

const setHousingPriceChange = (cb) => {
  HOUSING_PRICE.addEventListener('change', (evt) => {
    filters['housing-price'] = evt.target.value;
    cb();
  });
};

const setHousingRoomsChange = (cb) => {
  HOUSING_ROOMS.addEventListener('change', (evt) => {
    filters['housing-rooms'] = evt.target.value;
    cb();
  });
};

const setHousingGuestsChange = (cb) => {
  HOUSING_GUESTS.addEventListener('change', (evt) => {
    filters['housing-guests'] = evt.target.value;
    cb();
  });
};

const doFilter = (pinsData) => {
  let filteredData = pinsData
    .filter((pin) => {
      //filters type
      const filterValue = filters['housing-type'];

      return (
        filterValue == 'any' ||
        filterValue == pin.offer.type);
    })
    .filter((pin) => {
      //filters price
      const filterValue = filters['housing-price'];
      const price = pin.offer.price;

      return (
        filterValue == 'any' ||
        (filterValue == 'low' && price < 10000) ||
        (filterValue == 'high' && price > 50000) ||
        (filterValue == 'middle' && price >= 10000 && price <= 50000)
      );
    })
    .filter((pin) => {
      //filters rooms
      const filterValue = filters['housing-rooms'];
      const rooms = pin.offer.rooms;
      return (
        (filterValue == 'any') ||
        (filterValue == '1' && rooms == 1) ||
        (filterValue == '2' && rooms == 2) ||
        (filterValue == '3' && rooms == 3)
      );
    })
    .filter((pin) => {
      //filters guests
      const filterValue = filters['housing-guests'];
      const guests = pin.offer.guests;

      return (
        (filterValue == 'any') ||
        (filterValue == '1' && guests == 1) ||
        (filterValue == '2' && guests == 2) ||
        (filterValue == '0' && guests == 0)
      );
    })
    .filter((pin) => {
      //filters features
      const filterValue = [...filters['housing-features']];
      const features = pin.offer.features;

      return (
        (!filterValue.length) ||
        (filterValue.every(item => features.includes(item)))
      );
    });

  filteredData = filteredData.slice(0, SIMILAR_ADS);
  return filteredData;
};

const renderFilteredPins = (pinsData, cb) => {
  const filteredData = doFilter(pinsData);
  cb(filteredData);
};

export {
  renderFilteredPins, setHousingTypeChange, setHousingPriceChange,
  setHousingRoomsChange, setHousingGuestsChange, setHousingFeaturesChange
};
