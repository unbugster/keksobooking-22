const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilterForm = document.querySelector('.map__filters');
const selects = mapFilterForm.querySelectorAll('select');
const mapFormFieldset = mapFilterForm.querySelector('fieldset');

const adFormActivationToggle = (on) => {
  if (on) {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach((el) => el.removeAttribute('disabled'));
    mapFormFieldset.removeAttribute('disabled');
    mapFilterForm.classList.remove('map__filters--disabled');
    selects.forEach((el) => el.removeAttribute('disabled'));
  }

  else {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach((el) => el.setAttribute('disabled', true));
    mapFormFieldset.setAttribute('disabled', true);
    mapFilterForm.classList.add('map__filters--disabled');
    selects.forEach((el) => el.setAttribute('disabled', true));
  }
}

export { adFormActivationToggle }
