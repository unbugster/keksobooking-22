const map = L.map('map-canvas');

const DEFAULT_COORD = {
  lat: 35.68951,
  lng: 139.69171,
}
const MainIconAtribute = {
  size: [52, 52],
  anchor: [26, 52],
  url: 'img/main-pin.svg',
}
const IconAtribute = {
  size: [40, 40],
  anchor: [20, 20],
  url: 'img/pin.svg',
}

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: MainIconAtribute.url,
  iconSize: MainIconAtribute.size,
  iconAnchor: MainIconAtribute.anchor,
})

const mainMarker = L.marker(
  DEFAULT_COORD,
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

/**
 * Инициализация карты
 * @param {cb} onLoadSuccess Обработчик загрузки карты
 * @param {cb} onMainPinMove Обработчик движения главного пина
 */
const initMap = (onLoadSuccess, onMainPinMove) => {
  map.on('load', onLoadSuccess)
    .setView(DEFAULT_COORD, 10);

  /**
 * Обертка обработчика движения главного пина - достает координаты из объекта evt
 * @param {event} evt
 */
  const handleMainPinMove = (evt) => {
    onMainPinMove(evt.target.getLatLng());
  }

  //Проброс координат главного пина до начала движения
  onMainPinMove(DEFAULT_COORD);

  mainMarker.on('moveend', handleMainPinMove);
}
// okoнстантить
const icon = L.icon({
  iconUrl: IconAtribute.url,
  iconSize: IconAtribute.size,
  iconAnchor: IconAtribute.anchor,
})

/**
 * Добавляет пины на карту
 * @param {[{lat, lng}, ...]} points массив объектов координат пинов.
 * @param {*} renderAd по клику вызывает обработчик.
 */

const addPins = (points, renderAd) => {
  points.forEach(({ lat, lng }, index) => {

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      });

    marker.addTo(map).bindPopup(
      renderAd(index),
      {
        keepInView: true,
      },
    );
  });
}

export { addPins, initMap }
