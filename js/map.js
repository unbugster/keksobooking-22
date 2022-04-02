const map = L.map('map-canvas');
const address = document.querySelector('#address');

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mapInit = (adFormActivationToggle) => {
  map.on('load', () => {
    console.log('Карта инициализирована')
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
}

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

let latLng = { lat: 35.6895, lng: 139.69171 };
address.value = `${latLng.lat},${latLng.lng}`;

mainPinMarker.on('moveend', (evt) => {
  latLng = evt.target.getLatLng();
  let { lat, lng } = latLng;
  address.value = `${lat.toFixed(5)},${lng.toFixed(5)}`;
});

const addPins = (items) => {
  mainPinMarker.addTo(map);
  items.map((item) => {
    const { x: lat, y: lng } = item.location;
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
        item.popupContent,
        {
          keepInView: true,
        },
      );
  });
}

export { mapInit, addPins }
