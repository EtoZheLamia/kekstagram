import {isEscapeKey} from './util.js';

const FORM = document.querySelector('.img-upload__form');
const FILE_FIELD = FORM.querySelector('#upload-file');
const UPLOAD_CANCEL = FORM.querySelector('#upload-cancel');
const TEXT_DESCRIPTION = FORM.querySelector('.text__description');
const TEXT_HASHTAGS = FORM.querySelector('.text__hashtags');

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
