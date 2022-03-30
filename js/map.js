import { isFormActive } from './inactive-form.js';
import { generateAd } from './similar-ads.js';

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

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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

const addPins = (ads) => {
  ads.forEach((ad) => {
    const { x: lat, y: lng } = ad.location;
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
        generateAd(ad),
        {
          keepInView: true,
        },
      );
  });
}

/*

/* С помощью API карт реализуйте показ балуна с подробной информацией об объявлении.

5.4.При нажатии на метку похожего объявления, показывается балун(предоставляется API карт)
 с подробной информацией об объявлении(далее — карточка).Разметка карточки должна создаваться
 на основе шаблонного элемента.popup, расположенного в элементе template с идентификатором #card.
 Данные в карточку вставляются по аналогии с данными, вставленными в шаблонную карточку в качестве примера.
 Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.Например,
  если в объявлении не указано никаких удобств, нужно скрыть блок.popup__features.При отсутствии полей не должно возникать ошибок.

 5.7.Открытую карточку с подробной информацией можно закрыть нажатием на крестик в углу балуна.

 5.6.В каждый момент времени может быть показан только один балун,
  то есть нажатие на метку другого похожего объявления должно скрывать текущий балун,
    если он показан и показывать балун, соответствующий другому объявлению.

 5.5.Нажатие на специальную метку выбора адреса не приводит к показу балуна. */

export { addPins }
