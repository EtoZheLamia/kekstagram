import {isEscapeKey} from './util.js';
import {onSmallerButtonClick, onBiggerButtonClick, onChangeEffects} from './editing-image.js';

const FORM = document.querySelector('.img-upload__form');
const FILE_FIELD = FORM.querySelector('#upload-file');
const UPLOAD_CANCEL = FORM.querySelector('#upload-cancel');
const TEXT_DESCRIPTION = FORM.querySelector('.text__description');
const TEXT_HASHTAGS = FORM.querySelector('.text__hashtags');
const SMALLER_SCALE_CONTROL = document.querySelector('.scale__control--smaller');
const BIGGER_SCALE_CONTROL = document.querySelector('.scale__control--bigger');
const EFFECTS_LIST = document.querySelector('.effects__list');
const IMAGE_LEVEL_EFFECT = document.querySelector('.img-upload__effect-level');

// Открытие формы редактирования изображения
const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
};

const onFieldEscKeydown = (evt) => {
  evt.stopPropagation();
};

function showModal() {
  FORM.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  TEXT_DESCRIPTION.addEventListener('keydown', onFieldEscKeydown);
  TEXT_HASHTAGS.addEventListener('keydown', onFieldEscKeydown);
  SMALLER_SCALE_CONTROL.addEventListener('click', onSmallerButtonClick);
  BIGGER_SCALE_CONTROL.addEventListener('click', onBiggerButtonClick);
  EFFECTS_LIST.addEventListener('change', onChangeEffects);
  IMAGE_LEVEL_EFFECT.classList.add('hidden');
}

FILE_FIELD.addEventListener('change', () => {
  showModal();
});

function hideModal() {
  FORM.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  TEXT_DESCRIPTION.removeEventListener('keydown', onFieldEscKeydown);
  TEXT_HASHTAGS.removeEventListener('keydown', onFieldEscKeydown);
  SMALLER_SCALE_CONTROL.removeEventListener('click', onSmallerButtonClick);
  BIGGER_SCALE_CONTROL.removeEventListener('click', onBiggerButtonClick);
  EFFECTS_LIST.removeEventListener('change', onChangeEffects);
  FORM.reset();
}

UPLOAD_CANCEL.addEventListener('click', () => {
  hideModal();
});

// Валидация комментария
const pristine = new Pristine(FORM, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text__error-text',
});

FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// Валидация хэштега

const MAX_HASHTAG_COUNT = 5;
const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;

const hasValidSymbols = (tag) => re.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim());
  return hasUniqueTags(tags) && hasValidCount(tags) && tags.every(hasValidSymbols);
};

pristine.addValidator(
  TEXT_HASHTAGS,
  validateTags,
  'Неправильно заполнены хэштеги'
);
