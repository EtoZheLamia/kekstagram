import {isEscapeKey} from './util.js';
import {onSmallerButtonClick, onBiggerButtonClick, onChangeEffects} from './filters.js';

const FORM = document.querySelector('.img-upload__form');
const FILE_FIELD = FORM.querySelector('#upload-file');
const UPLOAD_CANCEL = FORM.querySelector('#upload-cancel');
const TEXT_DESCRIPTION = FORM.querySelector('.text__description');
const SMALLER_SCALE_CONTROL = document.querySelector('.scale__control--smaller');
const BIGGER_SCALE_CONTROL = document.querySelector('.scale__control--bigger');
const EFFECTS_LIST = document.querySelector('.effects__list');
const IMAGE_LEVEL_EFFECT = document.querySelector('.img-upload__effect-level');
const TEXT_HASHTAGS = FORM.querySelector('.text__hashtags');
const IMAGE_PREVIEW = FORM.querySelector('.img-upload__preview img');


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

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

FILE_FIELD.addEventListener('change', () => {
  showModal();
  const file = FILE_FIELD.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    IMAGE_PREVIEW.src = URL.createObjectURL(file);
  }
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


export {hideModal};
