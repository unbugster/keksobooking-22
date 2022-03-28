import { isFormActive } from './inactive-form.js';

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована')
    isFormActive(true);
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

const address = document.querySelector('#address');
let latLng = { lat: 35.6895, lng: 139.69171 };
address.value = `${latLng.lat},${latLng.lng}`;

mainPinMarker.on('moveend', (evt) => {
  latLng = evt.target.getLatLng();
  let { lat, lng } = latLng;
  address.value = `${lat.toFixed(5)},${lng.toFixed(5)}`;
});




