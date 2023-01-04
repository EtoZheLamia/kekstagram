import {createPictures} from './data.js';

const PICTURES_CONTAINER = document.querySelector('.pictures');
const PICTURES = createPictures(25);

PICTURES.forEach((element) => {
  const USERS_PICTURE = `
  <a href="#" class="picture">
    <img class="picture__img" src="${element.url}" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
      <span class="picture__comments">${element.comments.length}</span>
      <span class="picture__likes">${element.likes}</span>
    </p>
  </a>`;
  PICTURES_CONTAINER.insertAdjacentHTML('beforeend', USERS_PICTURE);
});

export {PICTURES};
