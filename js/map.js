import { form, mapFilters } from './form.js';

const INTERACTIVE_TAGS = [
  'select',
  'input',
  'button',
  'a',
]

const makesFormInactive = (el, childTags, addedInactiveClass) => {

  el.classList.add(addedInactiveClass);
  childTags.forEach((tag) => {
    const children = el.querySelectorAll(tag);
    children.forEach((elem) => {
      elem.disabled = true;
    });

  })
}
/*

таким образом первый блок в карте отвечает за инициализацию и подключение самой карты,
 отрисовку главного пина и транслирование его перемещений в поле формы
[ ] опиши функцию, которая на вход получит коллбек, в который будут передаваться текущие координаты главного пина
[ ] пусть модуль карты его вызывает каждый раз когда главный пин перемещается и передает в него текущие координаты
[ ] опиши этот коллбек в главном модуле

[ ] в модуле формы опиши функцию, которая на вход получает координаты,
формирует из них строку и записывает в поле формы

заметь, карта не знает ничего о поле формы и пр. он только знает,
что когда главный пин подвигался,
вызови вот этот коллбек и отдай в него координаты

а функция в модуле формы не знает откуда пришли коорднаты, она только знает что когда ее вызывают,
оан дожна сделать строку и записать в поле формы

tо же самое касается и пинов объявлений

чтобы их отрендерить тебе надо
[ ] в главном модуле описать функцию,
которая из всех данных объявлений извлечет тлько координаты, больше ничего на карте не нужно

и еще там же
[ ] сделай функцию, которая на вход получает число - индекс объявления,
из данных достает объект объявления и вызывает функцию рендера карточки с этими данными,
такая функция у тебя уже есть.
после чего просто
[ ] вовзращает отрендеренную карточку объявления

а в модуле карты
[ ] опиши функцию, которая на вход получает массив объектов с координатами пинов,
[ ] добавляет пины на карту и
[ ] каждому пину прикрепляет обработчик, в который передает индекс текущего пина, а получает уже готовую карточку

таким образом модуль карты у тебя ничего не знает о внешнем мире,
а все необходимое получает в аргументов этих двух функций

далее в главном модуле
[ ] вызови инициализацию карты а в инициализатор еще передай коллбек,
 который сработает по успешной загрузке карты

а этот коллбек уже вызывает отрисовку пинов объявлений

ну и из модуля карты надо выпилить весь код, который не связан с картой

развязать все модули
*/
makesFormInactive(mapFilters, INTERACTIVE_TAGS, 'ad-form--disabled');

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

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
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

const handleMapLoadSuccess = () => {
  /* eslint-disable no-console*/
  console.log('Карта инициализирована')
  makesFormActive(form, INTERACTIVE_TAGS, 'ad-form--disabled');
  makesFormActive(mapFilters, INTERACTIVE_TAGS, 'ad-form--disabled');
}



const initMap = (onLoadSuccess, onMainPinMove) => {
  map.on('load', onLoadSuccess)
    .setView({
      lat: 35.6895, //toDo оконстантить!
      lng: 139.69171,//toDo оконстантить!
    }, 10);


  const handleMainPinMove = (evt) => onMainPinMove(evt.target.getLatLng());
  onMainPinMove({
    lat: 35.6895, //toDo оконстантить!
    lng: 139.69171,//toDo оконстантить!
  });


  mainMarker.on('moveend', handleMainPinMove);
}
// okoнстантить
const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
})

const addPins = (points, onPinClick) => {
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
      onPinClick(index),
      {
        keepInView: true,
      },
    );
  });
}
export { addPins, initMap }
