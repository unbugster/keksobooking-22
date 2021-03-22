import { form, mapFilters } from './form.js';
import { ads, getCardElement, } from './similar-ads.js';

const interactivTags = ['select', 'input', 'button', 'a']

const makesFormInactive = (el, childTags, addedInactiveClass) => {

  el.classList.add(addedInactiveClass);
  childTags.forEach((tag) => {
    const children = el.querySelectorAll(tag);
    children.forEach((elem) => {
      elem.disabled = true;
    });

  })
}

makesFormInactive(mapFilters, interactivTags, 'ad-form--disabled');

const makesFormActive = (el, childTags, inactiveClass) => {

  el.classList.remove(inactiveClass);
  childTags.forEach((tag) => {
    const children = el.querySelectorAll(tag);
    children.forEach((elem) => {

      elem.disabled = false;
    });

  })
}

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована')
    makesFormActive(form, interactivTags, 'ad-form--disabled');
    makesFormActive(mapFilters, interactivTags, 'ad-form--disabled');
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

const mainIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
})

const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);
mainMarker.addTo(map);

const fieldAddress = form.querySelector('#address');

mainMarker.on('moveend', (evt) => {
  const degree = 5;
  const x = evt.target.getLatLng().lat;
  const y = evt.target.getLatLng().lng;
  fieldAddress.value = `${x.toFixed(degree)}, ${y.toFixed(degree)}`;
});

const points = ads.map((ad) => ({ title: ad.offer.title, lat: ad.location.x, lng: ad.location.y, }));

ads.forEach((opt) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })
  const { x, y } = opt.location;

  const marker = L.marker(
    {
      lat: x,
      lng: y,
    },
    {
      icon,
    });

  marker.addTo(map).bindPopup(
    getCardElement(opt),
    {
      keepInView: true,
    },
  );
});
