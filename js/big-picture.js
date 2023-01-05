import {isEscapeKey} from './util.js';

const BIG_PICTURE = document.querySelector('.big-picture');


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

function showBigPicture() {
  BIG_PICTURE.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function hideBigPicture()  {
  BIG_PICTURE.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

export {showBigPicture, hideBigPicture, onPopupEscKeydown};
