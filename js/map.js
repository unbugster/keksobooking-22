const MAP = L.map('map-canvas');// eslint-disable-line
const DEFAULT_LAT_LNG = { lat: 35.6895, lng: 139.69171 };

const initMap = (adFormActivationToggle) => {
  MAP.on('load', () => {
    console.log('Карта инициализирована');
    adFormActivationToggle(true);
  })
    .setView(DEFAULT_LAT_LNG, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(MAP);
};

const addMainPinMarker = (onMainMarkerChange) => {

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    DEFAULT_LAT_LNG,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  onMainMarkerChange(DEFAULT_LAT_LNG);
  mainPinMarker.addTo(MAP);

  mainPinMarker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    onMainMarkerChange(latLng);
  });
};

const addPins = (items) => {
  const pinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  items.map((item) => {
    const { location, popupContent } = item;
    const { x: lat, y: lng } = location;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(MAP)
      .bindPopup(
        popupContent,
        {
          keepInView: true,
        },
      );
  });
};

export { initMap, addPins, addMainPinMarker };
