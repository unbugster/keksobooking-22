// Returns random integer from the passed range inclusive
const getRandomBetween = (min, max) => {
  if (isNaN(min) || isNaN(max)) {
    throw new Error('Invalid argument type entered.');
  }
  if (min < 0 || max < 0) {
    throw new Error('A negative value has been entered.');
  }
  if (min === max) {
    return min;
  }
  const factor = min < max ? 1 : 0;

  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.floor(min) + factor)) +
    Math.floor(min)
  );
};

try {
  getRandomBetween(2, 10);
} catch (err) {
  alert('Something went wrong, contact your administrator');
  /* eslint-disable no-console */
  console.error(err.name + ':' + err.message);
}

// Returns a random floating point number from the passed range inclusive.
const getRandomFloatBetween = (min, max, decimalPlaces = 0) => {
  if (isNaN(decimalPlaces) || decimalPlaces < 0) {
    throw new Error('Invalid argument entered.');
  }
  const multiplier = Math.pow(10, decimalPlaces);

  return getRandomBetween(min * multiplier, max * multiplier) / multiplier;
};

try {
  getRandomFloatBetween(0, 5.12, 3);
} catch (err) {
  alert('Something went wrong, contact your administrator');
  /* eslint-disable no-console */
  console.error(err.name + ':' + err.message);
}
