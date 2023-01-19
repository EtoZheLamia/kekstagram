const IMAGE_PREVIEW = document.querySelector('.img-upload__preview img ');
const VALUE_SCALE_CONTROL = document.querySelector('.scale__control--value');
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const changeScale = (value) => {
  VALUE_SCALE_CONTROL.value = `${value}%`;
  IMAGE_PREVIEW.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(VALUE_SCALE_CONTROL.value,10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  changeScale(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(VALUE_SCALE_CONTROL.value,10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  changeScale(newValue);
};

const IMAGE_LEVEL_EFFECT = document.querySelector('.img-upload__effect-level');
const EFFECT_LEVEL_SLIDER = IMAGE_LEVEL_EFFECT.querySelector('.effect-level__slider');
const EFFECT_LEVEL_VALUE = IMAGE_LEVEL_EFFECT.querySelector('.effect-level__value');
const EFFECTS_LIST = document.querySelector('.effects__list');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];

noUiSlider.create(EFFECT_LEVEL_SLIDER, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

let currentEffect = DEFAULT_EFFECT;
const isDefault = () => currentEffect.name === EFFECTS[0].name;

function updateSlider() {
  EFFECT_LEVEL_SLIDER.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.max,
    step: currentEffect.step
  });
  if (isDefault()) {
    IMAGE_LEVEL_EFFECT.classList.add('hidden');
  }
}

function onChangeEffects(evt) {
  if (evt.target.closest('.effects__radio')) {
    IMAGE_LEVEL_EFFECT.classList.remove('hidden');
    EFFECTS.forEach((element) => {
      if (element.name === evt.target.value) {
        currentEffect = element;
      }
    });
    updateSlider();
  }
}

function onSliderUpdate() {
  IMAGE_PREVIEW.className = '';
  IMAGE_PREVIEW.style = '';
  EFFECT_LEVEL_VALUE.value = EFFECT_LEVEL_SLIDER.noUiSlider.get();
  IMAGE_PREVIEW.style.filter = `${currentEffect.style}(${EFFECT_LEVEL_VALUE.value}${currentEffect.unit})`;
  IMAGE_PREVIEW.classList.add(`effects__preview--${currentEffect.name}`);
}

EFFECTS_LIST.addEventListener('change', onChangeEffects);
EFFECT_LEVEL_SLIDER.noUiSlider.on('update', onSliderUpdate);

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

export {onSmallerButtonClick, onBiggerButtonClick, onChangeEffects, resetEffects};
