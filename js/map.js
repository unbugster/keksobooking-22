const map = L.map('map-canvas');
const address = document.querySelector('#address');

const DEFAULT_LAT_LNG = { lat: 35.6895, lng: 139.69171 };

const onMainPinMarkerChange = (latLng) => {
  let { lat, lng } = latLng;
  address.value = `${lat.toFixed(5)},${lng.toFixed(5)}`;
};

onMainPinMarkerChange(DEFAULT_LAT_LNG);

const mapInit = (adFormActivationToggle) => {
  map.on('load', () => {
    console.log('Карта инициализирована');
    adFormActivationToggle(true);
  })
    .setView({
      lat: 35.6895,
      lng: 139.69171,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const addMainPinMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.69171,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    onMainPinMarkerChange(latLng);
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
      .addTo(map)
      .bindPopup(
        popupContent,
        {
          keepInView: true,
        },
      );
  });
};

export { mapInit, addPins, addMainPinMarker };
