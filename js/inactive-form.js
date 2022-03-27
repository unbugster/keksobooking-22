const isFormActive = (boolean) => {
  const adForm = document.querySelector('.ad-form');
  const fieldsets = adForm.querySelectorAll('fieldset');
  const mapFilterForm = document.querySelector('.map__filters');
  const selects = mapFilterForm.querySelectorAll('select');

  if (boolean) {
    adForm.classList.remove('ad-form--disabled');
    fieldsets.forEach((el) => el.removeAttribute('disabled'));
    mapFilterForm.classList.remove('map__filters--disabled');
    selects.forEach((el) => el.removeAttribute('disabled'));
    console.log('good', 'good');
  }

  else {
    adForm.classList.add('ad-form--disabled');
    fieldsets.forEach((el) => el.setAttribute('disabled', true));
    mapFilterForm.classList.add('map__filters--disabled');
    selects.forEach((el) => el.setAttribute('disabled', true));
    console.log('bad', 'bad');
  }
}

export { isFormActive }
