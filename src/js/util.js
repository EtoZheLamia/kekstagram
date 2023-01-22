function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//проверка длины строки
function checkStringLength (string, length) {
  return string.length <= length;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlertLoad = () => {
  const windowError = document.querySelector('.error__load-data');
  windowError.classList.remove('hidden');
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomPositiveInteger, getRandomArrayElement, checkStringLength, isEscapeKey, showAlertLoad, debounce};
