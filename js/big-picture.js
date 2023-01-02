const BIG_PICTURE = document.querySelector('.big-picture');

const showBigPicture = () => {
  BIG_PICTURE.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hideBigPicture = () => {
  BIG_PICTURE.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

export {showBigPicture, hideBigPicture};
