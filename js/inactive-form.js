
const makeAdFormInactive = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((el) => el.setAttribute('disabled', 'disabled'));
}

// .map__filters--disabled shift + Alt + A - закомментить несколько строк

export { makeAdFormInactive }
