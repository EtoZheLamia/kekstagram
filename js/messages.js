import {hideModal} from './user-modal.js';

function showSuccessAlert() {
  hideModal();
  const SUCCESS_TEMPLATE = document.querySelector('#success')
    .content
    .querySelector('.success');
  const succes = SUCCESS_TEMPLATE.cloneNode(true);
  document.body.append(succes);
  const SUCCES_BUTTON =  document.querySelector('.success__button');
  SUCCES_BUTTON.addEventListener('click', () => {
    succes.remove();
  });
  succes.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')) {
      succes.remove();
    }
  });
}


function showFailAlert() {
  hideModal();
  const FAIL_TEMPLATE = document.querySelector('#error')
    .content
    .querySelector('.error');
  const error = FAIL_TEMPLATE.cloneNode(true);
  document.body.append(error);
  const ERROR_BUTTON =  document.querySelector('.error__button');
  ERROR_BUTTON.addEventListener('click', () => {
    error.remove();
  });
  error.addEventListener('click', (evt) => {
    if (!evt.target.matches('.error__inner')) {
      error.remove();
    }
  });
}

export {showSuccessAlert, showFailAlert};
