const FORM = document.querySelector('.img-upload__form');
const TEXT_HASHTAGS = FORM.querySelector('.text__hashtags');

const pristine = new Pristine(FORM, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text__error-text',
});

const setUserFormSubmit = (cb) => {
  FORM.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid){
      blockSubmitButton();
      cb(new FormData(FORM));
      unblockSubmitButton();}
    else {
      incorrectField();
    }
  }
  );};

// const setUserFormSubmit = () => {
//   FORM.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     const isValid = pristine.validate();
//     if (isValid){
//       blockSubmitButton();
//       sendData(
//         () => {
//           showSuccessAlert();
//           unblockSubmitButton();
//         },
//         () => {
//           showFailAlert();
//           unblockSubmitButton();
//         },
//         new FormData(evt.target)
//       );} else {
//       incorrectField();
//     }
//   }
//   );};

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

function incorrectField() {
  const incorrectTemplate = `<div class="incorrect-field">
  <div class="incorrect-field__inner">
    <h2 class="incorrect-field__title">Неправильно заполнены хэштеги</h2>
    <button type="button" class="incorrect-field__button error__button">Хорошо</button>
  </div>
</div>`;
  FORM.insertAdjacentHTML('beforeend', incorrectTemplate);
  const ERROR_BUTTON = FORM.querySelector('.incorrect-field__button');
  ERROR_BUTTON.addEventListener('click', () => {
    FORM.querySelector('.incorrect-field').remove();
  });
}

const BUTTON_SUBMIT = FORM.querySelector('.img-upload__submit');
function blockSubmitButton() {
  BUTTON_SUBMIT.disabled = true;
  BUTTON_SUBMIT.textContent = 'Публикую...';
}

function unblockSubmitButton() {
  BUTTON_SUBMIT.disabled = false;
  BUTTON_SUBMIT.textContent = 'Опубликовать';
}

export {setUserFormSubmit};
